const { job } = require('cron');
const toSendFile = require('./organization/toSendFile');
const { subtractDays, dateToObj, formatDate } = require('./utils/date');

// ---------------

job('00 01 00 * * *', (async () => {
  try {
    await toSendFile(dateToObj(subtractDays(1)));
  } catch (err) {
    console.error(formatDate('DD.MM.YY HH:mm:ss'), err);
  }
}), null, true);
