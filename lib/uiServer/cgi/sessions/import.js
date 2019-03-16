const fs = require('fs');
const path = require('path');
const { getDate, getNohostPath } = require('./util');

module.exports = function () {
  let { name, date } = this.request.query;
  if (!name || typeof name !== 'string') {
    this.status = 404;
    return;
  }
  date = getDate(date);
  const nohostPath = getNohostPath(date);
  const filepath = path.join(nohostPath, encodeURIComponent(name));
  this.body = fs.createReadStream(filepath);
};
