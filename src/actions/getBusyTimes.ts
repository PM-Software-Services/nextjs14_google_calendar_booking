'use server' ;

import getAccessToken from "@/lib/getAccessToken";
import { compareAsc } from "date-fns";
import { DateTimeInterval } from "@/types/DateTimeInterval";
import { TIMEZONE } from "@/config";



// scope https://www.googleapis.com/auth/calendar
const google_calendar_url = new URL("https://www.googleapis.com/calendar/v3/freeBusy");
export default async function getBusyTimes({ start, end }: DateTimeInterval) {
    if (!start || !end) {
        throw new Error("start and end are required");
    }

    const requestBody = {
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        timeZone: TIMEZONE,
        items: [{ id: 'primary' }]
    };

    const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
        cache: 'no-cache',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${await getAccessToken()}`,
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const busyData = (await res.json()) as Record<string, unknown>

    return Object.values(busyData.calendars ?? {})
        .flatMap((calendar) => calendar.busy ?? [])
        .sort(compareAsc)
        .map((busy) => ({
        start: new Date(busy.start ?? ""),
        end: new Date(busy.end ?? ""),
        }))
}