const codelist = require('../parameter/error-codelist')

module.exports = {
    generalErrResponse: generalErrResponse,
    commonErrResponse: commonErrResponse
}

//共通の不明のエラーを返却します。
function generalErrResponse (req , res) {
    res.json({
        'status':codelist.generalerr
    });
};
module.exports.generalErrResponse = generalErrResponse;

//特定のエラーを返却します
function commonErrResponse (req , res , errcode) {
    res.json({
        'status':errcode
    });
}
module.exports.commonErrResponse = commonErrResponse;