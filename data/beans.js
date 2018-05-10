const { Bean } = require('../schema')
const uuid = require("uuid/v4");

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

    return newBean.save();
  },
  removeBean(_id) {
    return Bean.remove({ _id }).exec()
  },
  updateBean(_id, title, description) {
    const updatedBean = {
      title,
      description,
      timestamp: new Date().toISOString()
    };
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
  searchBeans(searchTerm) {
    return Bean.find( { $text: { $search: searchTerm } } );
  }
};
