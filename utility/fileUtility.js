const fs = require('fs');

module.exports = {
    createDir: createDir,
    deleteFile: deleteFile,
    copyFile: copyFile,
    dirList: dirList,
    fileList: fileList,
    filePathExists: filePathExists,
    deleteDir: deleteDir
}

/*
 ファイル操作のメソッド群
 */
//指定したファイルを削除します
function deleteFile(filePath) {
    try {
        fs.unlinkSync(filePath);
    } catch (err) {
        console.log(err)
    }
}

function createDir(dirPath) { 
    if (!fs.existsSync(dirPath)) { 
        fs.mkdirSync(dirPath);
    }
}

//指定したディレクトリを削除します
function deleteDir(dirPath) { 
    //ファイルリストを取得します
    let files = fileList(dirPath);
    for (let i in files) { 
        let fileName = files[i];
        let filePath = dirPath + '/' + fileName;
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
            deleteDir(filePath);
        } else { 
            deleteFile(filePath);
        }
    }
    try {
        fs.rmdirSync(dirPath);
    } catch (err) { 
        console.log(err);
    }
}

//指定したファイルをコピーします
function copyFile(src, dest) {
    try {
        fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);
    } catch (err) {
        console.log(err);
    }
}
//与えられたディレクトリのパス直下にあるファイルリストを取得します
function dirList(dirPath) {
    let list = fileList(dirPath);
    let response = [];
    for (let i in list) {
        let fileName = list[i];
        let filePath = dirPath + '/' + fileName;
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
            response.push(fileName);
        }
    }
    return response;
}
//与えられたディレクトリのパス直下にあるファイルリストを取得します
function fileList(path) {
    let list = fs.readdirSync(path);
    return list;
}
//与えられたパスの有無を返却します
function filePathExists(path) {
    if (fs.existsSync(path)) {
        return true;
    } else {
        return false;
    }
}