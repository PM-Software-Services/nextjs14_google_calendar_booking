import { AvailabilitySlotsMap } from '@/types/AvailabilitySlots'

const DEFAULT_WORKDAY = [
    {
      start: {
        hour: 8,
      },
      end: {
        hour: 16,
      },
    },
]
  
export const AVAILABILITY: AvailabilitySlotsMap = {
1: DEFAULT_WORKDAY,
3: DEFAULT_WORKDAY,
}

export const MEETING_DURATION = 30 ;

export const LEAD_TIME = 0
export const SLOT_PADDING = 0


// how many months to book in advance till NOTE: Limit seems to be 3 months
export const MONTHS_BOOK_IN_ADVANCE_LIMIT: number = 3;

export const TIMEZONE = "Australia/Sydney" ;
export const LOCALE = "en-AU" ;