const { Action } = require('../schema')
const uuid = require("uuid/v4");

module.exports = {
  getAllActionsForUser(user) {
    return Action.find({ user: user }).sort({'timestamp': 'desc'}).exec();
  },
  addAction(user, actionType, beanId, beanName, comment) {
    if (!user) throw "There must be a creator for this action";
    if (!actionType) throw "Action type cannot be blank";
    if (!beanId) throw "Bean cannot be blank";
    if (!beanName) throw "Bean cannot be blank";

    const newAction = new Action({
      user,
      actionType,
      beanId,
      beanName,
      comment,
      timestamp: new Date().toISOString()
    });

    return newAction.save();
  }
};
