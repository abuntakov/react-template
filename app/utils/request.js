import axios from 'axios'
import logger from './logger'

async function request(props) {
  logger.debug(props)

  const { data } = await axios(props)

  if (data.errorCode !== 0) {
    throw data
  }

  return data.result
}

export default request
