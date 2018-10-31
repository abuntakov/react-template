import l10n from '@locale/strings_ru'

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
