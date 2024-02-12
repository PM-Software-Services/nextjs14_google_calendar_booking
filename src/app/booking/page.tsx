'use server' ;

import findAvailableSlots from "@/actions/findAvailableslots";
import getBusyTimes from "@/actions/getBusyTimes";
import CalendarAvailabilities from "@/components/Booking/CalendarAvailabilities";
import Template from "@/components/template";
import { AVAILABILITY, MEETING_DURATION, MONTHS_BOOK_IN_ADVANCE_LIMIT } from "@/config";
import { DateTimeInterval } from "@/types/DateTimeInterval";
import { addMonths, addMinutes } from "date-fns";

export default async function Page() {
  const startDay = addMinutes(new Date(), MEETING_DURATION)
  const endDay = addMonths(startDay, MONTHS_BOOK_IN_ADVANCE_LIMIT)

  const interval: DateTimeInterval = {start: startDay, end: endDay}

  const busyIntervals = await getBusyTimes(interval)
  
  
  const availableSlots = findAvailableSlots(startDay, endDay, busyIntervals, AVAILABILITY, 30)

  return (
    <div className="flex flex-col items-center justify-center container">
        <Template />
        <div>
          <CalendarAvailabilities availableSlots={availableSlots} />
        </div>
      </div>
  )
}