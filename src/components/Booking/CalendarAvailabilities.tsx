"use client" ;

import { Calendar } from "@/components/ui/calendar";
import { DateTimeInterval } from "@/types/DateTimeInterval";
import { useState } from "react";
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
        <div className="flex flex-col lg:flex-row items-center justify-center container">
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
            <div className="mt-4 lg:mt-0 lg:ml-4 space-y-4">
                {selectedDaySlots.map((slot, index) => (
                    <Modal key={index} selectedDate={slot.start} />
                ))}
            </div>
        </div>
    )
}