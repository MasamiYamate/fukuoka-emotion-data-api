const mongo = require('../utility/mongodb-manager');
const DBPARM = require('../parameter/db-parameters');
const codelist = require('../parameter/error-codelist');
const errorManager = require('../utility/error-manager');

module.exports = {
    setData: setData
}

// 必須キー
// userid
// lat
// lng
// imageData
// comment
// category

async function setData(req, res) {
    let body = req.body;
    // bodyがない場合エラーとする
    if (!body) {
        errorManager.commonErrResponse(req, res, codelist.generalerr);
    }
    if (!req.file) {
        errorManager.commonErrResponse(req, res, codelist.fileNotFound);
    }
    let userid = req.body.userid;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let fileName = req.file.fileName;
    let comment = req.body.comment;
    let category = req.body.category;

    if (userid && lat && lng && fileName && comment && category) {
        let setData = {
            userId: userid,
            lat: lat,
            lng: lng,
            fileName: fileName,
            comment: comment,
            category: category
        }
        await mongo.insertOne(DBPARM.DB_NAME, DBPARM.USERPOINTDATA, setData);
        
        let result = {
            status: codelist.success,
            data: setData
        }
        res.json(result)
    } else {
        return errorManager.commonErrResponse(req, res, codelist.generalerr);
    }

}