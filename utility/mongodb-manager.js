const Mongodb = require('../node_modules/mongodb');

const MONGO_URL = "mongodb://127.0.0.1:27017";

//エラーコードリスト
const SUCCESS = 0;
const DB_CONNECTION_ERROR = -10;
const COLLECTION_CONNECTION_ERROR = -11;
const GET_DB_DATA_ERROR = -20;

module.exports = { 
    getData: getData,
    insertOne: insertOne,
    insertMany: insertMany,
    deleteData: deleteData,
    deleteCollection: deleteCollection,
    removeCollection: removeCollection
}

async function getData (dbName , collectionName , findParm , sortParm , lmt) {
    let client = Mongodb.MongoClient;
    const response = function () {
        return new Promise(function (resolve , reject) {
            let requestUrl = MONGO_URL + '/' + dbName;
            //DBへのコネクションを行う
            client.connect(requestUrl, { useNewUrlParser: true }, (err , client) => {
                if (err) {
                    //コネクションエラーの場合
                    console.error(err);
                    let response = {
                        'status':DB_CONNECTION_ERROR
                    };
                    reject(response);
                    client.client();
                }else{
                    //Collectionへのコネクションを行う
                    let db = client.db(dbName);
                    db.collection(collectionName , (err , collection) => {
                        if (err) {
                            //コネクションエラーの場合
                            console.error(err);
                            let response = {
                                'status':COLLECTION_CONNECTION_ERROR
                            };
                            reject(response);
                            client.close();
                        }else{
                            let findAct = collection.find();
                            if (findParm) {
                                findAct = collection.find(findParm);
                            }
                            if (sortParm) {
                                findAct = findAct.sort(sortParm);
                            }
                            if (lmt) {
                                findAct = findAct.limit(lmt)
                            }
                            findAct.toArray((err , docs) => {
                                if (err) {
                                    //コネクションエラーの場合
                                    console.error(err);
                                    let response = {
                                        'status':GET_DB_DATA_ERROR
                                    };
                                    reject(response);
                                    client.close();
                                }else{
                                    let response = {
                                        'status':SUCCESS,
                                        'data':docs
                                    };
                                    resolve(response);
                                    client.close();
                                }
                            })
                        }
                    })
                }
            });
        })
    }
    let result = await response();
    return result;
}

async function insertOne (dbName , collectionName , insertData) {
    let client = Mongodb.MongoClient;
    const response = function () {
        return new Promise(function (resolve , reject) {
            let requestUrl = MONGO_URL + '/' + dbName;
            client.connect(requestUrl, { useNewUrlParser: true }, (err , client) => {
                if (err) {
                    //コネクションエラーの場合
                    let response = {
                        'status':COLLECTION_CONNECTION_ERROR,
                        'data':err
                    };
                    reject(response);
                    client.close();
                }else{
                    let db = client.db(dbName);
                    db.collection(collectionName).insertOne(insertData , function (err , res) {
                        if (err) {
                            let response = {
                                'status':COLLECTION_CONNECTION_ERROR,
                                'data':err
                            };
                            reject(response);
                            client.close();
                        }else{
                            let response = {
                                'status':SUCCESS
                            };
                            resolve(response);
                            client.close();
                        }
                    })
                }
            })
        })
    }
    let result = await response();
    return result;
}

async function insertMany (dbName , collectionName , insertData) {
    let client = Mongodb.MongoClient;
    const response = function () {
        return new Promise(function (resolve , reject) {
            let requestUrl = MONGO_URL + '/' + dbName;
            client.connect(requestUrl, { useNewUrlParser: true }, (err , client) => {
                if (err) {
                    //コネクションエラーの場合
                    let response = {
                        'status':COLLECTION_CONNECTION_ERROR,
                        'data':err
                    };
                    reject(response);
                    client.close();
                }else{
                    let db = client.db(dbName);
                    db.collection(collectionName).insertMany(insertData , function (err , res) {
                        if (err) {
                            let response = {
                                'status':COLLECTION_CONNECTION_ERROR,
                                'data':err
                            };
                            reject(response);
                            client.close();
                        }else{
                            let response = {
                                'status':SUCCESS
                            };
                            resolve(response);
                            client.close();
                        }
                    })
                }
            })
        })
    }
    let result = await response();
    return result;
}

async function deleteData (dbName , collectionName , deleteKey) {
    let client = Mongodb.MongoClient;
    const response = function () {
        return new Promise(function (resolve , reject) {
            let requestUrl = MONGO_URL + '/' + dbName;
            client.connect(requestUrl, { useNewUrlParser: true }, (err , client) => {
                if (err) {
                    //コネクションエラーの場合
                    let response = {
                        'status':COLLECTION_CONNECTION_ERROR,
                        'data':err
                    };
                    reject(response);
                    client.close();
                }else{
                    let db = client.db(dbName);
                    db.collection(collectionName).deleteOne(deleteKey , function(err , res) {
                        if (err) {
                            let response = {
                                'status':COLLECTION_CONNECTION_ERROR,
                                'data':err
                            };
                            reject(response);
                            client.close();
                        }else{
                            let response = {
                                'status':SUCCESS
                            };
                            resolve(response);
                            client.close();
                        }
                    })
                }
            })
        })
    }
    let result = await response();
    return result;
}

async function deleteCollection (dbName , collectionName) {
    let client = Mongodb.MongoClient;
    const response = function () {
        return new Promise(function (resolve , reject) {
            let requestUrl = MONGO_URL + '/' + dbName;
            client.connect(requestUrl, { useNewUrlParser: true }, (err , client) => {
                if (err) {
                    //コネクションエラーの場合
                    let response = {
                        'status':COLLECTION_CONNECTION_ERROR,
                        'data':err
                    };
                    reject(response);
                    client.close();
                }else{
                    let db = client.db(dbName);
                    db.dropCollection(collectionName , function (err , res) {
                        if (err) {
                            let response = {
                                'status':COLLECTION_CONNECTION_ERROR,
                                'data':err
                            };
                            reject(response);
                            client.close();
                        }else{
                            let response = {
                                'status':SUCCESS
                            };
                            resolve(response);
                            client.close();
                        }
                    })
                }
            })
        })
    }
    let result = await response();
    return result;
}

async function removeCollection (dbName , collectionName) {
    let client = Mongodb.MongoClient;
    const response = function () {
        return new Promise(function (resolve , reject) {
            let requestUrl = MONGO_URL + '/' + dbName;
            client.connect(requestUrl, { useNewUrlParser: true }, (err , client) => {
                if (err) {
                    //コネクションエラーの場合
                    let response = {
                        'status':COLLECTION_CONNECTION_ERROR,
                        'data':err
                    };
                    reject(response);
                    client.close();
                }else{
                    let db = client.db(dbName);
                    db.collection(collectionName).remove({} , function (err , res) {
                        if (err) {
                            let response = {
                                'status':COLLECTION_CONNECTION_ERROR,
                                'data':err
                            };
                            reject(response);
                            client.close();
                        }else{
                            let response = {
                                'status':SUCCESS
                            };
                            resolve(response);
                            client.close();
                        }
                    })
                }
            })
        })
    }
    let result = await response();
    return result;
}