/**
 * 工具类
 */
// 上传图片
const multer = require('koa-multer')
var storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, './public/editor/upload/')
    },
    filename: function (req, file, cd) {
        var fileformate = (file.originalname).split('.')
        cd(null, Date.now() + '.' + fileformate[fileformate.length - 1])
    },
})
var upload = multer({ storage: storage })
module.exports = {
    upload
}
