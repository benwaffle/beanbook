const { Action } = require('../schema')
const uuid = require("uuid/v4");

let exportedMethods = {
  getAllActions() {
    Action.find(function (err, actions) {
      if (err) throw err;
      return actions;
    });
  },
  getActionById(id) {
    Action.find({ _id: id }, 
      function (err, action) {
        if (err) throw err;
        return action;
      }
    );
  },
  addAction(userId, actionType, beanId, commentId) {
    if (!userId) throw "There must be a creator for this action";
    if (!actionType) throw "Action type cannot be blank";
    if (!beanId) throw "Bean cannot be blank";

    let newAction = new Action({
      user: userId,
      actionType: actionType,
      _id: uuid(),
      bean: beanId,
      comment: commentId,
      timestamp: new Date().toISOString()
    });

    newAction.save(function (err, action) {
      if (err) throw err;
      return action;
    });
  },
  removeAction(id) {
    Action.remove({ _id: id }, function (err) {
      if (err) throw err;
    });
  },
  updateAction(id, userId, actionType, beanId, commentId) {
    let updatedAction = {
      user: userId,
      actionType: actionType,
      bean: beanId,
      comment: commentId
    };
    Action.findOneAndUpdate({ _id: id }, updatedAction, 
      function (err, action) {
        if (err) throw err;
        return action;
      }
    );
  }
};

module.exports = exportedMethods;
