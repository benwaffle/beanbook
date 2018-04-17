const dbConnection = require("./mongoConnection");

const getCollection = collection => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  users: getCollectionFn("users"),
  beans: getCollectionFn("beans"),
  actions: getCollectionFn("actions")
}
