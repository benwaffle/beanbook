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

    actions.addAction(creatorId, 'updated', _id, title, null);

    return Bean.findOneAndUpdate({ _id }, updatedBean).exec()
  },
  async addComment(beanId, beanName, posterId, comment, rating) {
    if (!beanId) throw "There must be a beanId";
    if (!posterId) throw "There must be a creator for this bean";
    if (!comment) throw "Comment must not be blank";
    if (!rating) throw "Please rate this bean";

    await Bean.findByIdAndUpdate(beanId, {
      $push: {
        comments: {
          posterId,
          comment,
          rating,
          timestamp: new Date().toISOString()
        }
      }
    }).exec();

    await actions.addAction(posterId, 'commented', beanId, beanName, comment);
  },
  searchBeans(searchTerm) {
    return Bean.find( { $text: { $search: searchTerm } } );
  }
};
