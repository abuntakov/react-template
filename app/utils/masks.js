import { conformToMask } from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export const thousandsSeparatorInt = createNumberMask({
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ' ',
  allowDecimal: false,
  prefix: '',
})

export const thousandsSeparatorFloat = createNumberMask({
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ' ',
  allowDecimal: true,
  prefix: '',
})

export const accountBank = [
  /\d/, /\d/, /\d/, /\d/, /\d/,
  /\d/, /\d/, /\d/, /\d/, /\d/,
  /\d/, /\d/, /\d/, /\d/, /\d/,
  /\d/, /\d/, /\d/, /\d/, /\d/,
]

export const bikBank = [
  /\d/, /\d/, /\d/,
  /\d/, /\d/, /\d/,
  /\d/, /\d/, /\d/,
]

export const dateDDMMYYY = [
  /\d/, /\d/, '.',
  /\d/, /\d/, '.',
  /\d/, /\d/, /\d/, /\d/,
]

export const unmaskAccountBank = (value) => {
  if (!value) {
    return value
  }

  return value.replace(/_/g, '')
}

const maskString = (str, mask) => conformToMask(
  String(str),
  mask(String(str)).filter(m => m !== '[]')
).conformedValue

export const maskStringByThousandsSeparatorFloat = (str) => {
  try {
    let sign = ''

    if (Number(str) < 0) {
      sign = '-'
    }

    const result = maskString(str, thousandsSeparatorFloat)

    return `${sign}${result}`
  } catch (e) {
    return str
  }
}

export const unmaskThousandsSeparator = (value) => {
  if (!value) {
    return value
  }

  return value.replace(/\s/g, '')
}
