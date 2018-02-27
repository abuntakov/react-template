import moment from 'moment'
import l10n from '@locale/strings_ru'

export const normalize = items => ({
  result: items.map(i => i.id),
  entities: items
})

export const DEFAULT_DATETIME_FORMAT = 'DD.MM.YYYY HH:mm'
export const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY'
export const DEFAULT_TIME_FORMAT = 'HH:mm'
export const RFC3339 = 'YYYY-MM-DDTHH:mm:ss[Z]'

export function prettyDate(date, format = DEFAULT_DATETIME_FORMAT) {
  return moment(date).format(format)
}

export function getLocaleEnding(data) {
  const [ONE, TWO, MANY] = ['one', 'two', 'many']
  let ending = MANY
  const count = data % 100

  if (count >= 11 && count <= 19) {
    return MANY
  }

  const i = count % 10
  switch (i) {
    case (1): ending = ONE; break
    case (2):
    case (3):
    case (4): ending = TWO; break
    default: ending = MANY
  }

  return ending
}

export const getLocaleWithEnding = (name, count) => (
  l10n[(`${name}_${getLocaleEnding(count)}`)]
)
