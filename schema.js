const { mongoose } = require('./connection');
const { Schema } = mongoose;

const actionSchema = new Schema({
  _id: String,
  user: String,
  timestamp: Date,
  actionType: String,
  bean: String,
  comment: String
});

const beanSchema = new Schema({
  _id: String,
  creatorId: String,
  timestamp: Date,
  title: String,
  type: String,
  description: String,
  imageUrl: String,
  comments: [{ posterId: String, comment: String, rating: Number }]
});

const userSchema = new Schema({
  _id: String,
  passwordHash: String,
  firstName: String,
  lastName: String,
  timestamp: Date
});

const Bean = mongoose.model('Bean', beanSchema);
const User = mongoose.model('User', userSchema);
const Action = mongoose.model('Action', actionSchema);

module.exports = {
  Action,
  Bean,
  User
};
