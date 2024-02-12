"use client" ;

import {useEffect, useState} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { addMinutes } from 'date-fns';
import { MEETING_DURATION } from '@/config';
import { useRouter } from 'next/navigation';
import { checkBusyTimes } from '@/actions/checkBusyTimes';
import { is } from 'date-fns/locale';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function StripeCheckoutForm({selectedDate}: {selectedDate: Date}) {
    const [clientSecret, setClientSecret] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter() ;

    const handleComplete = async () => {
        // final check to see if time slot booked
        const isBusy = await checkBusyTimes(selectedDate.toISOString());
        if (isBusy) {
            setError('This time slot is already booked. Please select another time slot.');
            setIsLoading(false);
            router.push('/error')
            return;
        }

        router.push('/success')
    }

    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const isBusy = await checkBusyTimes(selectedDate.toISOString());
                if (isBusy) {
                    setError('This time slot is already booked. Please select another time slot.');
                    setIsLoading(false);
                    return;
                }

                const endTime = addMinutes(selectedDate, MEETING_DURATION).toISOString();
                const body = JSON.stringify({
                    startTime: selectedDate.toISOString(),
                    endTime: endTime
                })
                const response = await fetch("/api/stripe/create-checkout-session", {
                    method: "POST",
                    body
                });
                const responseJson = await response.json();
                if (!responseJson || !responseJson.clientSecret) {
                    setError('Something went wrong. Please try again later.');
                    throw new Error('Invalid response')
                }
                if (responseJson.error) {
                    setError(responseJson.error);
                    throw new Error(responseJson.error)
                }

                if (responseJson.clientSecret) {
                    setClientSecret(responseJson.clientSecret)
                    setIsLoading(false) ;
                }
            } catch (error) {
                setError('Something went wrong. Please try again later.');
                console.error('Error:', error)
                throw new Error('Error getting client secret')
            }
        }
        getClientSecret()
    }, [])

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-900"></div>
                </div>
            ) : (
                error ? (
                    <div>{error}</div>
                ) : (
                    clientSecret && (
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={{
                            clientSecret,
                            onComplete: handleComplete
                        }}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                )
            ))}
        </>
    )
}