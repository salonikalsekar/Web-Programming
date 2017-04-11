const dbConnection = require("./mongoConnections");


let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {
            _col = dbConnection().then(db => {
                return db.collection(collection);
            });
        }

        return _col;
    }
}

/* Now, you can list your collections here: */
module.exports = {
  education: getCollectionFn("education"),
  hobbies: getCollectionFn("hobbies"),
   classes: getCollectionFn("classes")
};
