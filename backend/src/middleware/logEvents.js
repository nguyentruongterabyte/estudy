import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

import fs from 'fs';
import path from 'path';
const fsPromises = require('fs').promises;

const logEvents = async (message, logName) => {
  let dateTime = `${format(new Date(), 'HH:mm:ss\tddMMyyyy')}`;
  let logItem = `${dateTime}\t${uuid()}\t${message}`;
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }

    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\n`, 'requestLog.txt');
  next();
};

module.exports = { logEvents, logger };
