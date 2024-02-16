"use client" ;

import { Calendar } from "@/components/ui/calendar";
import { DateTimeInterval } from "@/types/DateTimeInterval";
import { useState, useEffect } from "react";
import { Modal } from "@/components/Booking/Modal";



interface CalendarAvailabilitiesProps {
    availableSlots: DateTimeInterval[];
}

export default function CalendarAvailabilities({availableSlots}: CalendarAvailabilitiesProps) {
    if (availableSlots.length === 0) {
        return (
            <div className={"flex justify-center container mx-auto"}>
                No available slots
            </div>
        );
    }

    const [selectedDaySlots, setSelectedDaySlots] = useState<DateTimeInterval[]>([]);

    useEffect(() => {
        if (availableSlots.length > 0) {
            const firstAvailableDay = new Date(availableSlots[0].start).toDateString();
            const firstDaySlots = availableSlots.filter(slot => new Date(slot.start).toDateString() === firstAvailableDay);
            setSelectedDaySlots(firstDaySlots);
        }
    }, [availableSlots]);

    const handleDayClick = (date: Date) => {
        const slotsForDayClicked = availableSlots.filter(slot => {
            const slotDate = new Date(slot.start);
            return slotDate.toDateString() === date.toDateString();
        });

        setSelectedDaySlots(slotsForDayClicked);
    }

    const disabledDays = (date: Date) => {
        return !availableSlots.some(slot => {
            const slotDate = new Date(slot.start);
            return slotDate.toDateString() === date.toDateString();
        });
    }


    return (
        <div className="flex flex-col items-center justify-center container">
            <div className="flex justify-center">
                <Calendar 
                    showOutsideDays={false}
                    disabled={disabledDays}
                    fromMonth={new Date(availableSlots[0].start)}
                    toMonth={new Date(availableSlots[availableSlots.length - 1].start)}
                    onDayClick={handleDayClick}
                    selected={selectedDaySlots.map(slot => new Date(slot.start))}
                    initialFocus
                    />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedDaySlots.map((slot, index) => (
                    <Modal key={index} selectedDate={slot.start} />
                ))}
            </div>
        </div>
    )
}