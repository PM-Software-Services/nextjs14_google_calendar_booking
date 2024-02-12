import getBusyTimes from "@/actions/getBusyTimes";
import { MEETING_DURATION } from "@/config";
import { DateTimeInterval } from "@/types/DateTimeInterval";
import { addMinutes, endOfDay, isWithinInterval } from "date-fns";

export async function checkBusyTimes(time: string): Promise<boolean>{
    const potentialTime = new Date(time);

    const busyIntervals = await getBusyTimes({
        start: potentialTime,
        end: endOfDay(potentialTime)
    })

    const potentialBookingInterval: DateTimeInterval = {
        start: potentialTime,
        end: addMinutes(potentialTime, MEETING_DURATION)
    }

    return busyIntervals.some(busyInterval => 
        isWithinInterval(potentialBookingInterval.start, busyInterval) && isWithinInterval(potentialBookingInterval.end, busyInterval)
    );
    
}