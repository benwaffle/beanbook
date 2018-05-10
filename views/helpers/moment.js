const moment = require('moment');

module.exports = (handlebars) => (date) => new handlebars.SafeString(moment(date).fromNow());