import axios from 'axios'
import logger from './logger'
import { buildError } from '../errors'

async function getData(props) {
  try {
    const { data } = await axios(props)
    return data
  } catch (err) {
    throw buildError(err)
  }
}

async function request(props) {
  logger.debug(props)
  const data = await getData(props)

  if (data.errorCode !== 0) {
    throw data
  }

  return data.result
}

export default request
