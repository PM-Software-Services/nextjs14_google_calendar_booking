import getAccessToken from "@/lib/getAccessToken";
import { TIMEZONE, LOCALE } from "@/config";
import { checkBusyTimes } from "@/actions/checkBusyTimes";

let isBooking = false ;
const google_calendar_event_url = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
export default async function createCalendarBooking(result: any) {
    if (result.startTime === undefined || result.endTime === undefined || result.name === undefined || result.email === undefined || result.phone === undefined || result.amount === undefined) {
        return {ok: false, error: "Missing required fields"}
    }

    while (isBooking) {
        await new Promise(resolve => setTimeout(resolve, 300)); //wait 100ms before checking again
    }

    isBooking = true;

    try {
        const isBusy = await checkBusyTimes(result.startTime);
        if (isBusy) {
            return {ok: false, error: "Double Booking Detected"}
        }
    
        const start = new Date(result.startTime).toLocaleTimeString(LOCALE, {hour: '2-digit', minute: '2-digit', timeZone: TIMEZONE})
        const end = new Date(result.endTime).toLocaleTimeString(LOCALE, {hour: '2-digit', minute: '2-digit', timeZone: TIMEZONE})
        const requestBody = {
            start: {
                dateTime: result.startTime,
                timeZone: TIMEZONE
            },
            end: {
                dateTime: result.endTime,
                timeZone: TIMEZONE
            },
            description: `Name: ${result.name}\nEmail: ${result.email}\nPhone: ${result.phone}\nAmount: ${result.amount}\nAppointment Details: ${start} - ${end}`,
            summary: `${result.name}`,
        }
    
        return fetch(google_calendar_event_url.toString(), {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${await getAccessToken()}`,
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
    } finally {
        isBooking = false;
    }
}