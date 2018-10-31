import _includes from 'lodash/fp/includes'
import _get from 'lodash/fp/get'
import _isObject from 'lodash/fp/isObject'

import {
  scroller,
} from 'react-scroll'

export const listToSelectOptions = (list, locale = {}) => (
  list.map(item => ({ value: item, label: locale[item] || item }))
)

export const getErrorMessageFromResponse = ({ response }) => (
  _get('data.error.message')(response)
)

export const parseNumber = ({ target }) => Number(target.value) || 0

export function inputNumberOnly(e) {
  // Allow: backspace, delete, tab, escape, enter and .
  if (_includes(e.keyCode)([46, 8, 9, 27, 13, 110, 190])
    // Allow: Ctrl/cmd+A
    || (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true))
    // Allow: Ctrl/cmd+C
    || (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true))
    // Allow: Ctrl/cmd+X
    || (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true))
    // Allow: home, end, left, right
    || (e.keyCode >= 35 && e.keyCode <= 39)
  ) {
    // let it happen, don't do anything
    return
  }

  // Ensure that it is a number and stop the keypress
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault()
  }
}


function flatten(arr) {
  return arr.reduce((flat, toFlatten) => (
    flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
  ), [])
}

function getErrorFieldNames(obj = {}, name = '') {
  const errorArr = []
  errorArr.push(Object.keys(obj).map((key) => {
    const next = obj[key]
    if (next) {
      if (typeof next === 'string') {
        return name + key
      }
      // Keep looking
      if (next.map) {
        errorArr.push(next.map((item, index) => getErrorFieldNames(item, `${name}${key}[${index}].`)).filter(Boolean))
      } else if (next._error) {
        return name + key
      } else if (_isObject(next)) {
        errorArr.push(getErrorFieldNames(next, `${name}${key}.`))
      }
    }
    return null
  }).filter(o => o))

  return flatten(errorArr)
}

export function scrollToFirstError(errors) {
  const errorFields = getErrorFieldNames(errors)

  // Using breakable for loop
  for (let i = 0; i < errorFields.length; i += 1) {
    const fieldName = `position-${errorFields[i]}`
    // Checking if the marker exists in DOM
    if (document.querySelectorAll(`[name="${fieldName}"]`).length) {
      scroller.scrollTo(fieldName, {
        offset: -200,
        smooth: true,
        duration: 800,
        delay: 100,
      })
      break
    }
  }
}

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line

export function validateEmail(email) {
  return emailRegexp.test(email)
}
