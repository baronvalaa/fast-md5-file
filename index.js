const crypto = require('crypto');
const fs = require('fs');

const BUFFER_SIZE = 16384;
function md5FileSync (path) {
  const fd = fs.openSync(path, 'r');
  const hash = crypto.createHash('md5');
  const buffer = Buffer.alloc(BUFFER_SIZE);

  try {
    let bytesRead

    do {
      bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE);
      hash.update(buffer.slice(0, bytesRead));
    } while (bytesRead === BUFFER_SIZE)
  } finally {
    fs.closeSync(fd);
  }

  return hash.digest('hex');
}
module.exports = md5FileSync
