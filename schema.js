const { mongoose } = require('./connection');
const { Schema } = mongoose;

const actionSchema = new Schema({
  user: String,
  timestamp: Date,
  actionType: String,
  beanId: String,
  beanName: String,
  comment: String
});

const beanSchema = new Schema({
  _id: String,
  creatorId: String,
  timestamp: Date,
  title: String,
  description: String,
  imageUrl: String,
  rating: Number,
  comments: [{ posterId: String, comment: String, rating: Number, timestamp: Date }]
});
beanSchema.index({title: 'text', description: 'text', creatorId: 'text',
                  'comments.posterId': 'text', 'comments.comment': 'text'});

const userSchema = new Schema({
  _id: String,
  passwordHash: String,
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
