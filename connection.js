const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/beanbook');

const conn = mongoose.connection;

module.exports = {
  mongoose,
  db: new Promise((resolve, reject) => {
    conn.on('error', err => {
      console.error('connection error: ', err);
      reject(err);
    });
    conn.once('open', () => resolve(conn));
    conn.on('close', () => reject('closed'));
  })
};
