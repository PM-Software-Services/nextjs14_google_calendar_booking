import { stripe } from "@/lib/stripe";

import { NextResponse } from "next/server";
import { checkBusyTimes } from "@/actions/checkBusyTimes";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { startTime, endTime } = body;

        const timeNotAvailable = await checkBusyTimes(startTime);

        if (timeNotAvailable) {
            throw new Error("That time is no longer available");
        }
        
        const session = await stripe.checkout.sessions.create({
            custom_fields: [
                {
                    key: 'name',
                    label: {
                        type: 'custom',
                        custom: 'Full Name'
                    },
                    type: 'text'
                },
            ],
            ui_mode: 'embedded',
            phone_number_collection: {
                enabled: true
            },
            payment_intent_data: {
                capture_method: 'manual'
            },
            submit_type: 'book',
            mode: 'payment',
            redirect_on_completion: 'never',
            metadata: {
                'startTime': startTime,
                'endTime': endTime
            },
            line_items: [{
                price: "price_1OeU3hG2lwpmRo4LMfByacZ6",
                quantity: 1
            }]
        })

        return NextResponse.json({
            clientSecret: session.client_secret
        })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}