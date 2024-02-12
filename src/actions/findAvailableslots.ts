
import { AvailabilitySlotsMap } from "@/types/AvailabilitySlots";
import { DateTimeInterval } from "@/types/DateTimeInterval";

import { addMinutes, isWithinInterval, setHours, setMinutes, eachDayOfInterval, getDay, isFuture } from 'date-fns';




export default function findAvailableSlots(start: Date, end: Date, busyIntervals: DateTimeInterval[], desiredWorkTimes: AvailabilitySlotsMap, appointmentDuration: number, padding: number = 0): DateTimeInterval[] {
    const availableSlots: DateTimeInterval[] = [] ;

    eachDayOfInterval({ start, end }).forEach(day => {
        const workTimes = desiredWorkTimes[getDay(day)];
    
        if (workTimes) {
          workTimes.forEach(workTime => {
            let slotStart = setMinutes(setHours(day, workTime.start.hour), workTime.start.minute || 0);
            const dailyEnd = setMinutes(setHours(day, workTime.end.hour), workTime.end.minute || 0);
    
            while (slotStart < dailyEnd) {
              const slotEnd = addMinutes(slotStart, appointmentDuration);
    
              const slotIsFree = isFuture(slotStart) && !busyIntervals.some(busyInterval =>
                (isWithinInterval(slotStart, busyInterval) && slotStart.getTime() !== busyInterval.end.getTime()) ||
                (isWithinInterval(slotEnd, busyInterval) && slotEnd.getTime() !== busyInterval.start.getTime())
              );
    
              if (slotIsFree) {
                availableSlots.push({ start: new Date(slotStart), end: new Date(slotEnd) });
              }
    
              slotStart = addMinutes(slotStart, appointmentDuration + padding);
            }
          });
        }
    });


    return availableSlots

}