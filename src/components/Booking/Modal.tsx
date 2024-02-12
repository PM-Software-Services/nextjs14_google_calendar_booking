"use client" ;

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LOCALE, TIMEZONE } from "@/config";
import StripeCheckoutForm from "@/components/Booking/StripeCheckoutForm";


export function Modal({selectedDate}: {selectedDate: Date}) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="m-2 hover:bg-purple-400 text-white text-md py-2 px-2 rounded">
                    {selectedDate.toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit', timeZone: TIMEZONE })}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader className="sm:max-w-[425px] pr-5">
                    <DialogTitle>Book Appointment: {selectedDate.toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit', timeZone: TIMEZONE })} </DialogTitle>
                    <DialogDescription>
                        Input details to book your appointment on: {selectedDate.toLocaleDateString()}.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full shadow-2xl shadow-cyan-500/50">
                    <StripeCheckoutForm selectedDate={selectedDate} />
                </div>
            </DialogContent>
        </Dialog>
    )
}