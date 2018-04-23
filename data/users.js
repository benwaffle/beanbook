const schema = require("../schema");
const uuid = require("uuid/v4");

let exportedMethods = {
  getAllUsers() {
    schema.User.find(function (err, users) {
      if (err) throw err;
      return users;
    });
  },
  getUserById(id) {
    schema.User.find({ _id: id }, 
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
    
    let newUser = new schema.User({
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
    schema.User.remove({ _id: id }, function (err) {
      if (err) throw err;
    });
  },
  updateUser(id, firstName, lastName, passwordHash) {
    let updatedUser = {
      firstName: firstName,
      lastName: lastName,
      password: passwordHash
    };
    schema.User.findOneAndUpdate({ _id: id }, updatedUser, 
      function (err, user) {
        if (err) throw err;
        return user;
      }
    );
  }
};

module.exports = exportedMethods;
