const mongo = require('../utility/mongodb-manager');
const DBPARM = require('../parameter/db-parameters');
const codelist = require('../parameter/error-codelist');
const errorManager = require('../utility/error-manager');

module.exports = {
    setData: setData,
    getData: getData
}

async function setData(req, res) {
    let body = req.body;
    // bodyがない場合エラーとする
    if (!body) {
        errorManager.commonErrResponse(req, res, codelist.generalerr);
    }
    let userid = req.body.userid;
    let categories = req.body.categories || [];

    if (userid && categories) {
        // userIdを元に既存データを削除します
        let findKey = {
            userid: userid
        }

        await mongo.deleteData(DBPARM.DB_NAME, DBPARM.USER_CATEGORY_DATA, findKey);

        let setData = {
            userid: userid,
            categories: categories
        }
        await mongo.insertOne(DBPARM.DB_NAME, DBPARM.USER_CATEGORY_DATA, setData);
        let result = {
            status: codelist.success,
            data: setData
        }
        res.json(result)
    }else{
        errorManager.commonErrResponse(req, res, codelist.generalerr);
    }
}

async function getData(req, res) {
    let body = req.body;
    if (!body) {
        errorManager.commonErrResponse(req, res, codelist.generalerr);
    }
    let userid = req.body.userid;
    let findKey = {
        userid: userid
    }

    let result = await mongo.getData(DBPARM.DB_NAME, DBPARM.USER_CATEGORY_DATA, findKey, null, null);
    
    res.json(result);
}