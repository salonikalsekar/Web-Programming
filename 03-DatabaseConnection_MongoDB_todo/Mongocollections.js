const dbConnection = require("./Mongoconnection");

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

module.exports = {
       todoItems : getCollectionFn("todoItems")
};
