let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/beanbook")

let db = mongoose.connection;

module.exports = async () => {
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    return db;
  });
};
