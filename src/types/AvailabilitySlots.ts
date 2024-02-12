
/**
 * Used to represent a period of time in a day that
 * is available for a meeting (procided it's not booked).
 */
export type AvailabilitySlot = {
    /** Starting hour and minute (in the owner’s timezone) */
    start: { hour: number; minute?: number }
    /** Ending hour and minute (in the owner’s timezone) */
    end: { hour: number; minute?: number }
}
  
/**
 * A map of day of week (0-6) to availability slots.
 */
export type AvailabilitySlotsMap = {
/**  */
[key: number]: AvailabilitySlot[]
}
  