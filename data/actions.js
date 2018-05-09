const { Action } = require('../schema')
const uuid = require("uuid/v4");

module.exports = {
  getAllActions() {
    return Action.find().exec();
  },
  getActionById(_id) {
    return Action.findOne({ _id }).exec();
  },
  addAction(user, actionType, bean, comment) {
    if (!user) throw "There must be a creator for this action";
    if (!actionType) throw "Action type cannot be blank";
    if (!bean) throw "Bean cannot be blank";

    const newAction = new Action({
      user,
      actionType,
      _id: uuid(),
      bean,
      comment,
      timestamp: new Date().toISOString()
    });

    return newAction.save().exec();
  },
  removeAction(_id) {
    return Action.remove({ _id }).exec()
  },
  updateAction(_id, user, actionType, bean, comment) {
    const updatedAction = {
      user,
      actionType,
      bean,
      comment
    };
    return Action.findOneAndUpdate({ _id }, updatedAction).exec()
  }
};
