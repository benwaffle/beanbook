const mongoCollections = require("../config/mongoCollections");
const actions = mongoCollections.actions;

let exportedMethods = {
  getAllActions() {
    return actions().then(actionCollection => {
      return actionCollection.find({}).toArray();
    });
  },
  getActionById(id) {
    return actions().then(actionCollection => {
      return actionCollection.findOne({ _id: id }).then(action => {
        if (!action) throw "Action not found";
        return action;
      });
    });
  },
  addAction(userId, actionType, beanId, commentId) {
    if (!userId) throw "There must be a creator for this action";
    if (!actionType) throw "Action type cannot be blank";
    if (!beanId) throw "Bean cannot be blank";
    return actions().then(actionCollection => {
      let newAction = {
        user: userId,
        actionType: actionType,
        _id: uuid(),
        bean: beanId,
        comment: commentId,
        timestamp: new Date().toISOString()
      };

      return actionCollection
        .insertOne(newAction)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getActionById(newId);
        });
    });
  },
  removeAction(id) {
    return actions().then(actionCollection => {
      return actionCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw "Could not delete action with id of " + id;
        }
      });
    });
  },
  updateAction(id, userId, actionType, beanId, commentId) {
    return actions().then(actionCollection => {
      return this.getActionById(id).then(currentaction => {
        let updatedAction = {
          user: userId,
          actionType: actionType,
          bean: beanId,
          comment: commentId
        };

        return actionCollection.updateOne({ _id: id}, updatedAction).then(() => {
          return this.getActionById(id);
        });
      });
    });
  }
};

module.exports = exportedMethods;
