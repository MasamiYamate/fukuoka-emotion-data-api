const errorManager = require('../utility/error-manager');
const codeList = require('../parameter/error-codelist');
const mongo = require("../utility/mongodb-manager");
const DBPARM = require('../parameter/db-parameters');

module.exports = {
    find: find
}

async function find (req, res) {
    if (!req.body) {
        errorManager.generalErrResponse(req, res);
        return;
    }
    let beaconId = req.body.beaconid;
    let userId = req.body.userid;
    let result = {};
    
    // ダミーデータの送付を行う
    if (beaconData.beaconId == beaconId) {
        result = beaconData;
    }
    if (beaconData2.beaconId == beaconId) {
        result = beaconData2;
    }

    // userIdを元にカテゴリの表示非表示判定を行う
    if (userId) {
        // userIdのある場合はカテゴリの表示非表示判定を行う
        let findKey = {
            userid: userId
        }; 
        let userCategoryList = await mongo.getData(DBPARM.DB_NAME, DBPARM.USER_CATEGORY_DATA, findKey, null, null);
        console.log(userCategoryList);
        if (userCategoryList.status == codeList.success && 0 < userCategoryList.data.length ) {
            let categoryList = userCategoryList.data[0].categories
            let isMatchCategory = false;
            for (i in categoryList) {
                let category = categoryList[i];
                if (result.category == category) {
                    isMatchCategory = true;
                }
            }
            if (!isMatchCategory) {
                result = null;
            }
        }
    }

    let responseData = {
        status: codeList.success,
        data: result
    }
    res.json(responseData);
}

const beaconData = {
    beaconId: "xxxxxx",
    image: "https://2.bp.blogspot.com/-Qu4ED30_mME/WIHlg1I8mGI/AAAAAAABBPs/mNVaVYfJWTElK9_rEFYUoiNUADphuFbYgCLcB/s800/landmark_tower_fukuoka.png",
    comment: "福岡タワーは、福岡県福岡市早良区のシーサイドももち地区にあるランドマークタワー",
    category: "landmark"
}

const beaconData2 = {
    beaconId: "xxxxxx2",
    image: "https://2.bp.blogspot.com/-Qu4ED30_mME/WIHlg1I8mGI/AAAAAAABBPs/mNVaVYfJWTElK9_rEFYUoiNUADphuFbYgCLcB/s800/landmark_tower_fukuoka.png",
    comment: "テスト",
    category: "food"
}