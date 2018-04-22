const mongoCollections = require("../config/mongoCollections");
const beans = mongoCollections.beans;
const uuid = require("uuid/v4");

let exportedMethods = {
  getAllBeans() {
    return beans().then(beanCollection => {
      return beanCollection.find({}).toArray();
    });
  },
  getBeanById(id) {
    return beans().then(beanCollection => {
      return beanCollection.findOne({ _id: id }).then(bean => {
        if (!bean) throw "Bean not found";
        return bean;
      });
    });
  },
  addBean(userId, title, type, description) {
    if (!userId) throw "There must be a creator for this bean";
    if (!title) throw "Title cannot be blank";
    if (!type) throw "Type cannot be blank";
    if (!description) throw "Description cannot be blank";
    return beans().then(beanCollection => {
      let newBean = {
        creatorId: userId,
        title: title,
        _id: uuid(),
        type: type,
        description: description,
        comments: [],
        timestamp: new Date().toISOString()
      };

      return beanCollection
        .insertOne(newBean)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getBeanById(newId);
        });
    });
  },
  removeBean(id) {
    return beans().then(beanCollection => {
      return beanCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw "Could not delete bean with id of " + id;
        }
      });
    });
  },
  updateBean(id, userId, title, type, description) {
    return beans().then(beanCollection => {
      return this.getBeanById(id).then(currentBean => {
        let updatedBean = {
          creatorId: userId,
          title: title,
          type: type,
          description: description,
        };

        return beanCollection.updateOne({ _id: id}, updatedBean).then(() => {
          return this.getBeanById(id);
        });
      });
    });
  },
  getCommentById(id) {
    //TODO
  },
  addComment(beanId, userId, comment) {
    //TODO
  },
  removeComment(id) {
    //TODO
  },
  updateComment(id, beanId, userId, comment) {
    //TODO
  },
};

module.exports = exportedMethods;
