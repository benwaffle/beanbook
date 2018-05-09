const { User } = require('../schema')
const uuid = require("uuid/v4");

module.exports = {
  getAllUsers() {
    return User.find().exec();
  },
  getUserById(_id) {
    return User.findOne({ _id }).exec();
  },
  addUser(_id, passwordHash) {
    if (!passwordHash) throw "Password hash cannot be blank";
    
    const newUser = new User({
      _id,
      passwordHash,
      timestamp: new Date().toISOString()
    });

    return newUser.save().exec();
  },
  removeUser(_id) {
    return User.remove({ _id }).exec()
  },
  updateUser(_id, passwordHash) {
    const updatedUser = {
      passwordHash
    };
    return User.findOneAndUpdate({ _id }, updatedUser).exec()
  }
};
