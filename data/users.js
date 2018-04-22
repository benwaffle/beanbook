const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("uuid/v4");

let exportedMethods = {
  getAllUsers() {
    return users().then(userCollection => {
      return userCollection.find({}).toArray();
    });
  },
  getUserById(id) {
    return users().then(userCollection => {
      return userCollection.findOne({ _id: id }).then(user => {
        if (!user) throw "User not found";
        return user;
      });
    });
  },
  addUser(firstName, lastName, passwordHash) {
    if (!firstName) throw "First name cannot be blank";
    if (!lastName) throw "Last name cannot be blank";
    if (!passwordHash) throw "Password hash cannot be blank";
    return users().then(userCollection => {
      let newUser = {
        firstName: firstName,
        lastName: lastName,
        _id: uuid(),
        password: passwordHash,
        timestamp: new Date().toISOString()
      };

      return userCollection
        .insertOne(newUser)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getUserById(newId);
        });
    });
  },
  removeUser(id) {
    return users().then(userCollection => {
      return userCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw "Could not delete user with id of " + id;
        }
      });
    });
  },
  updateUser(id, firstName, lastName, passwordHash) {
    return users().then(userCollection => {
      return this.getUserById(id).then(currentUser => {
        let updatedUser = {
          firstName: firstName,
          lastName: lastName,
          password: passwordHash
        };

        return userCollection.updateOne({ _id: id}, updatedUser).then(() => {
          return this.getUserById(id);
        });
      });
    });
  }
};

module.exports = exportedMethods;
