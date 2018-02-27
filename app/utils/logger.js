/* global DEVELOPMENT */
import loglevel from 'loglevel'

const logger = loglevel.getLogger('default')
logger.setLevel(DEVELOPMENT ? 'DEBUG' : 'WARN')

export default logger
