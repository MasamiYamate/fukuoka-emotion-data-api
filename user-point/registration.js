const mongo = require('../utility/mongodb-manager');
const codelist = require('../parameter/error-codelist');
const errorManager = require('../utility/error-manager');

module.exports = {
    
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



    } else {
        return errorManager.commonErrResponse(req, res, codelist.generalerr);
    }

}