let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let actionSchema = new Schema({
  _id:  String,
  user: String,
  timestamp:   Date,
  actionType: String,
  bean: String,
  comment: String
});

let beanSchema = new Schema({
  _id:  String,
  creatorId: String,
  timestamp:   Date,
  title: String,
  type: String,
  description: String,
  imageUrl: String,
  comments: [{ posterId: String, comment: String, rating: Number }]
});

let userSchema = new Schema({
  _id:  String,
  password: String,
  firstName:   String,
  lastName: String,
  timestamp: Date
});

let Bean = mongoose.model('Bean', beanSchema);
let User = mongoose.model('User', userSchema);
let Action = mongoose.model('Action', actionSchema);
