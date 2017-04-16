import fs from 'fs-extra';
import { homedir } from 'os';
import { resolve } from 'path';
import moment from 'moment';
import errorCodes from './errorCodes';

function createError(error, log) {
  let createdError;
  if (typeof error === 'undefined') {
    error = errorCodes.UNKNOWN_ERROR;
  }
  if (typeof error === 'string') {
    error = Object.assign({ message: error }, errorCodes.CUSTOM_ERROR);
  }
  if (!(error instanceof Error)) {
    createdError = new Error(error.message);
    createdError.code = error.code;
    createdError.log = typeof log === 'undefined' ? ('log' in error ? error.log : true) : log;
  } else {
    createdError = error;
    createdError.log = typeof log === 'undefined' ? ('log' in error ? error.log : true) : log;
  }
  return error;
}

function promiseError(error, log) {
  throw createError(error, log);
}

function jsonError(res, error, log) {
  error = createError(error, log);
  if (error.log) {
    serverLog(error);
  }
  res.json(error);
}

function serverLog(error) {
  var errorText = `${new Date()}\t${error.message}\n${error.stack}`;
  console.log(errorText);
  fs.appendFile(getErrorLogFilePath(), errorText);
}

function getErrorLogFilePath() {
  const date = moment().format('YYYY/M/D');
  const filename = `server${date}.log`;
  return resolve(homedir(), 'logs', filename);
}

serverLog({
  message: 'Server started',
  stack: ''
});

export default {
  createError,
  promiseError,
  jsonError,
  serverLog
};
