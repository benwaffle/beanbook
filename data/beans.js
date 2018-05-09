const { Bean } = require('../schema')
const uuid = require("uuid/v4");

module.exports = {
  getAllBeans() {
    Bean.find(function (err, beans) {
      if (err) throw err;
      return beans;
    });
  },
  getBeanById(id) {
    Bean.find({ _id: id }, 
      function (err, bean) {
        if (err) throw err;
        return bean;
      }
    );
  },
  addBean(userId, title, type, description) {
    if (!userId) throw "There must be a creator for this bean";
    if (!title) throw "Title cannot be blank";
    if (!type) throw "Type cannot be blank";
    if (!description) throw "Description cannot be blank";
    
    let newBean = new Bean({
      creatorId: userId,
      title: title,
      _id: uuid(),
      type: type,
      description: description,
      comments: [],
      timestamp: new Date().toISOString()
    });

    newBean.save(function (err, bean) {
      if (err) throw err;
      return bean;
    });
  },
  removeBean(id) {
    Bean.remove({ _id: id }, function (err) {
      if (err) throw err;
    });
  },
  updateBean(id, userId, title, type, description) {
    let updatedBean = {
      creatorId: userId,
      title: title,
      type: type,
      description: description,
    };
    Bean.findOneAndUpdate({ _id: id }, updatedBean, 
      function (err, bean) {
        if (err) throw err;
        return bean;
      }
    );
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
