const { Bean } = require('../schema')
const uuid = require("uuid/v4");
const actions = require('./actions');

module.exports = {
  getAllBeans() {
    return Bean.find().exec();
  },
  getBeanById(_id) {
    return Bean.findOne({ _id }).exec();
  },
  addBean(creatorId, title, description, imageUrl) {
    if (!creatorId) throw "There must be a creator for this bean";
    if (!title) throw "Title cannot be blank";
    if (!description) throw "Description cannot be blank";
    
    const newBean = new Bean({
      creatorId,
      title,
      _id: uuid(),
      imageUrl,
      description,
      comments: [],
      timestamp: new Date().toISOString()
    });

    actions.addAction(creatorId, 'added', newBean._id, title, null);

    return newBean.save();
  },
  removeBean(_id) {
    return Bean.remove({ _id }).exec()
  },
  updateBean(_id, creatorId, title, description) {
    const updatedBean = {
      title,
      description,
      timestamp: new Date().toISOString()
    };

    actions.addAction(creatorId, 'updated', _id, description, null);

    return Bean.findOneAndUpdate({ _id }, updatedBean).exec()
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
