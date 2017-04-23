import constants from './constants';
import configs from '../config/config';
import eHandler from './error';

/**
 * Sets process.env.IS_PRODUCTION to true if process.env.NODE_ENV starts with prod
 * Sets process.env.ENV_SHORT to 'prod', 'test', or 'dev'
 */
function setEnvVars() {
  if (typeof process.env.NODE_ENV === 'undefined') {
    process.env.NODE_ENV = 'development';
  }
  const nodeEnv = process.env.NODE_ENV.toLowerCase();
  process.env.IS_PRODUCTION = nodeEnv.startsWith('prod');

  switch (nodeEnv.substr(0, 3)) {
    case 'pro':
      process.env.ENV_SHORT = constants.ENV_SHORT_ENUM.PROD;
      break;
    case 'tes':
      process.env.ENV_SHORT = constants.ENV_SHORT_ENUM.TEST;
      break;
    default:
      process.env.ENV_SHORT = constants.ENV_SHORT_ENUM.DEV;
  }

  const config = configs[process.env.ENV_SHORT];
  process.env.MONGO_DB_URI = `mongodb://${config.user}:${config.pass}@localhost/${config.db}?authSource=admin`;
}

function hasPrivilegeLevel(minPrivilegeLevel, req, res, next) {

}

function _isLoggedIn(req) {
  return !!req.user;
}

function isLoggedIn(req, res, next) {
  if (_isLoggedIn(req)) {
    next();
  } else {
    eHandler.jsonError(res, 'User is not logged in.');
  }
};

export default {
  setEnvVars,
  _isLoggedIn,
  isLoggedIn,
  hasPrivilegeLevel
};
