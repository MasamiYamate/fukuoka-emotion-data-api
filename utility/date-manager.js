exports.strDateToDateObj = function (strYMD, strHM) { 
    let replaceYMD = strYMD.replace(/[^0-9]/g, "");
    let replaceHM = strHM.replace(/[^0-9]/g, "");

    let ymd = replaceYMD.match(/^(\d{4})(\d{1,2})(\d{1,2})$/);
    let hm = replaceHM.match(/^(\d{1,2})(\d{1,2})$/);
    let hms = replaceHM.match(/^(\d{1,2})(\d{1,2})(\d{1,2})$/);

    let y = null, m = null, d = null, hour = null, min = null , sec = '00';
    if (ymd && ymd.length == 4) {
        y = ('00' + Number(ymd[1])).slice(-4);
        m = ('00' + Number(ymd[2])).slice(-2);
        d = ('00' + Number(ymd[3])).slice(-2);
    }
    if (hm && hm.length == 3) {
        hour = ('00' + Number(hm[1])).slice(-2);
        min = ('00' + Number(hm[2])).slice(-2);
    }
    if (!hm && hms && hms.length == 4) {
        hour = ('00' + Number(hms[1])).slice(-2);
        min = ('00' + Number(hms[2])).slice(-2);
        sec = ('00' + Number(hms[3])).slice(-2);
    }
    if (y && m && d && hour && min) {
        let searchDate = new Date(y + "/" + m + "/" + d + " " + hour + ":" + min + ":" + sec + " GMT+0900");
        return searchDate;
    } else {
        return null;
    }
}

exports.getTimeDiff = function (judgDate, refDate) {
    let msDiff = judgDate.getTime() - refDate.getTime();
    return msDiff;
}

exports.getToDayDate = function () { 
    //日付の指定がない場合は、Requestされたときの日付を採用します
    let todayDate = new Date();
    let y = todayDate.getFullYear();
    let m = ('00' + Number(todayDate.getMonth() + 1)).slice(-2);
    let d = ('00' + Number(todayDate.getDate())).slice(-2);
    return y + "/" + m + "/" + d
}

exports.getNowTime = function () { 
    let todayDate = new Date();
    let h = ('00' + Number(todayDate.getHours())).slice(-2);
    let M = ('00' + Number(todayDate.getMinutes())).slice(-2);
    return h + ":" + M
}