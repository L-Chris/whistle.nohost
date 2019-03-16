const os = require('os');
const path = require('path');
const fse = require('fs-extra');

const DATE_RE = /^\d{8}$/;
const leftPad = num => (num > 9 ? num : `0${num}`);
const getDate = (date) => {
  if (date && DATE_RE.test(date)) {
    return date;
  }
  const now = new Date();
  return `${now.getFullYear()}${leftPad(now.getMonth() + 1)}${leftPad(now.getDate())}`;
};

exports.getDate = getDate;

let nohostPath;
let curDate;

exports.getNohostPath = (date) => {
  if (date !== curDate) {
    curDate = date;
    nohostPath = process.env.NOHOST_PATH || path.join(os.homedir(), '.NohostAppData', curDate);
    nohostPath = path.join(nohostPath, 'sessions');
    /* eslint-disable no-sync */
    fse.ensureDirSync(nohostPath);
  }
  return nohostPath;
};
