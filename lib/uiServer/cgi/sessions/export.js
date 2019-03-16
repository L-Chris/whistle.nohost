const fs = require('fs');
const path = require('path');
const { getDate, getNohostPath } = require('./util');

const MAX_LEN = 26;

const writeFile = (filepath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, data, {
      flag: 'wx',
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = function* () {
  const { name, sessions } = this.request.body;
  if (!name || !sessions
    || typeof name !== 'string'
    || typeof sessions !== 'string'
    || name.length > MAX_LEN) {
    this.body = { ec: 2 };
    return;
  }
  const date = getDate();
  const nohostPath = getNohostPath(date);
  const filepath = path.join(nohostPath, encodeURIComponent(name));
  try {
    yield writeFile(filepath, sessions);
    this.body = { ec: 0, date };
  } catch (e) {
    this.body = { ec: e.code === 'EEXIST' ? 1 : 2 };
  }
};
