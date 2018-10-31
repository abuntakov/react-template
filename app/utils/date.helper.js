import moment from 'moment'

import { DateFormat } from '@app/constants'

export function prettyDate(date, format = DateFormat.DefaultDateTime) {
  return moment(date).format(format)
}
