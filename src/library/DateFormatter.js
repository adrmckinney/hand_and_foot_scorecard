// @flow
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

class DateFormatter {
  standard(timestampMs) {
    if (!timestampMs) {
      return '00:00:00'
    }
    let day = new Date(+timestampMs)

    return format(utcToZonedTime(day, 'Europe/London'), 'MMM d, yyyy')
  }

  parseIso(isoString) {
    if (!isoString) {
      return '00:00:00'
    }
    let day = parseISO(isoString)

    return format(utcToZonedTime(day, 'Europe/London'), 'MMM d, yyyy')
  }

  humanReadableDateWithSeparator(date) {
    if (!date || date === 'Invalid Date') {
      return null
    }

    return format(date, 'MMM d, y')
  }
}

export default new DateFormatter()
