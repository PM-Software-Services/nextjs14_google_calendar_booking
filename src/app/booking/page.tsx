'use server' ;

import findAvailableSlots from "@/actions/findAvailableslots";
import getBusyTimes from "@/actions/getBusyTimes";
import CalendarAvailabilities from "@/components/Booking/CalendarAvailabilities";
import Template from "@/components/template";
import { AVAILABILITY, MEETING_DURATION, MONTHS_BOOK_IN_ADVANCE_LIMIT } from "@/config";
import { DateTimeInterval } from "@/types/DateTimeInterval";
import { addMonths, addMinutes } from "date-fns";

export default async function Page() {
  const MBIA: number = MONTHS_BOOK_IN_ADVANCE_LIMIT ? MONTHS_BOOK_IN_ADVANCE_LIMIT : 3;
  let startDay = addMinutes(new Date(), MEETING_DURATION)
  const originalStartDay = new Date(startDay)
  let endDay = addMonths(startDay, (
    MBIA > 3 ? 3 : MBIA
  ))
  let busyIntervals: DateTimeInterval[] = [] ;

  
  if (MBIA > 3) {
    const iterations = Math.ceil(MBIA / 3)
    for (let i = 0; i < iterations; i++) {
      const interval: DateTimeInterval = {start: startDay, end: endDay} ;
      const newBusyIntervals = await getBusyTimes(interval);
      busyIntervals = [...busyIntervals, ...newBusyIntervals];

      startDay = new Date(endDay) ;

      // adjusting endDay
      if (i < iterations - 1) {
        endDay = addMonths(startDay, 3)
      } else {
        endDay = addMonths(startDay, MBIA - ((i+1) * 3)) ;
      }
    }
  } else {
    busyIntervals = await getBusyTimes({start: startDay, end: endDay});
  }

  const availableSlots = findAvailableSlots(
    originalStartDay, 
    endDay, 
    busyIntervals, 
    AVAILABILITY, 
    MEETING_DURATION
  )

  return (
    <div className="flex flex-col items-center justify-center container">
        <Template />
        <div className="container">
          <CalendarAvailabilities availableSlots={availableSlots} />
        </div>
      </div>
  )
}