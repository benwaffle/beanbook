const { User } = require('../schema')
const uuid = require("uuid/v4");

module.exports = {
  getAllUsers() {
    User.find(function (err, users) {
      if (err) throw err;
      return users;
    });
  },
  getUserById(id) {
    User.find({ _id: id }, 
      function (err, user) {
        if (err) throw err;
        return user;
      }
    );
  },
  addUser(firstName, lastName, passwordHash) {
    if (!firstName) throw "First name cannot be blank";
    if (!lastName) throw "Last name cannot be blank";
    if (!passwordHash) throw "Password hash cannot be blank";
    
    let newUser = new User({
      firstName: firstName,
      lastName: lastName,
      _id: uuid(),
      password: passwordHash,
      timestamp: new Date().toISOString()
    });

    newUser.save(function (err, user) {
      if (err) throw err;
      return user;
    });
  },
  removeUser(id) {
    User.remove({ _id: id }, function (err) {
      if (err) throw err;
    });
  },
  updateUser(id, firstName, lastName, passwordHash) {
    let updatedUser = {
      firstName: firstName,
      lastName: lastName,
      password: passwordHash
    };
    User.findOneAndUpdate({ _id: id }, updatedUser, 
      function (err, user) {
        if (err) throw err;
        return user;
      }
    );
  }
};
