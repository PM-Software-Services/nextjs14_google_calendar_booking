import Stripe from 'stripe' ;

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import createCalendarBooking from '@/actions/createCalendarBooking';
import { revalidatePath } from 'next/cache';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,
    {
      apiVersion: '2023-10-16'
    }
  )
  
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  export async function POST(req: Request, res: Response) {
    if (!webhookSecret) {
        return NextResponse.json({error: "webhook secret not set"}, {status: 400})
    }


    try {
        const body = await req.text();
        const sig = headers().get('stripe-signature') as string;
        const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

        if (event.type === 'checkout.session.completed') {
            const eventDataObject = event.data.object ;

            const customerDetails = await stripe.checkout.sessions.retrieve(eventDataObject.id, {
                expand: ['customer'],
            });

            const sessionDetails = {
                name: customerDetails.customer_details?.name,
                email: customerDetails.customer_details?.email,
                phone: customerDetails.customer_details?.phone,
                amount: eventDataObject.amount_total ? eventDataObject.amount_total / 100 : 0,
                startTime: customerDetails.metadata?.startTime,
                endTime: customerDetails.metadata?.endTime,
            }

            if (!customerDetails.payment_intent) {
                console.log("payment intent not found") ;
                return NextResponse.json({error: "payment intent not found", ok: false}, {status: 400})
            }
            // TODO: Wait for payment to succeed or fail.
            const bookingResult = await createCalendarBooking(sessionDetails)
            if (!bookingResult.ok) {
                // Booking failed - cancel payment
                await stripe.paymentIntents.cancel(customerDetails.payment_intent?.toString());
                
                console.log("payment intent cancelled")
                revalidatePath('/booking')
                return NextResponse.json({error: bookingResult}, {status: 500})
            } else {
                // booking succeeded - capture payment
                await stripe.paymentIntents.capture(customerDetails.payment_intent?.toString());

                console.log("payment captured")
                revalidatePath('/booking')
                return NextResponse.json({result: event, ok: true})

            }
            

            revalidatePath('/booking')
            console.log("checkoutsession completed") ;
            return NextResponse.json({result: event, ok: true})

        }

        if (event.type === 'payment_intent.succeeded') {
            return NextResponse.json({result: event, ok: true})
        }

        if (event.type === 'customer.created') {
            console.log("customer created")
            return NextResponse.json({result: event, ok: true})
        }

        if (event.type === 'payment_intent.created') {
            console.log("payment intent created")
            return NextResponse.json({result: event, ok: true})
        }

        if (event.type === 'charge.succeeded') {
            console.log("charge succeeded")
            return NextResponse.json({result: event, ok: true})
        }

        if (event.type === 'charge.refunded') {
            console.log("charge refunded")
            revalidatePath('/booking')
            return NextResponse.json({result: event, ok: true})
        }

        if (event.type === 'payment_intent.amount_capturable_updated') {
            console.log("payment intent amount capturable updated")
            return NextResponse.json({result: event, ok: true})
        }

        return NextResponse.json({error: "event type not found", ok: false}, {status: 400})

    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "error occured", ok: false}, {status: 500})
    }


  }