const { User } = require('../schema')
const uuid = require("uuid/v4");

module.exports = {
  getAllUsers() {
    return User.find().exec();
  },
  getUserById(_id) {
    return User.findOne({ _id }).exec();
  },
  addUser(_id, firstName, lastName, passwordHash) {
    if (!firstName) throw "First name cannot be blank";
    if (!lastName) throw "Last name cannot be blank";
    if (!passwordHash) throw "Password hash cannot be blank";
    
    const newUser = new User({
      firstName,
      lastName,
      _id,
      passwordHash,
      timestamp: new Date().toISOString()
    });

    return newUser.save().exec();
  },
  removeUser(_id) {
    return User.remove({ _id }).exec()
  },
  updateUser(_id, firstName, lastName, passwordHash) {
    const updatedUser = {
      firstName,
      lastName,
      passwordHash
    };
    return User.findOneAndUpdate({ _id }, updatedUser).exec()
  }
};
