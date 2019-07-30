const router = require('koa-router')()
const formidable = require('formidable')
let user = require('../src/User')
const upUtil  = require('../src/util')
let article = require('../src/Article')

//router.use('/user', user.routes(), user.allowedMethods())
router.post('/register', user.register)//用户注册
router.post('/login', user.login)//用户登录
router.del('/deleteUser', user.delete)//删除用户
router.post('/userInfo', user.userInfo)//用户信息  
router.post('/upuserinfo', user.upuserinfo)//更新用户信息（暂时只能更新密码）
/**
 * 上传图片
 */
router.post('/upimgs', upUtil.upload.array('mypic',5),async (ctx, next) => {
    allFile = ctx.req.files
    var fileUrl = new Array()
    for(var j = 0,len = allFile.length; j < len; j++){
        console.log(allFile[j].filename)
        fileUrl.push('http://127.0.0.1:3666/public/editor/upload/'+allFile[j].filename)
    }
    ctx.body = {
        isok:true,
        data:fileUrl

      }
 
 })

 router.post('/upfujian', upUtil.upload.single('file'), function(req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype)
    console.log('原始文件名：%s', file.originalname)
    console.log('文件大小：%s', file.size)
    console.log('文件保存路径：%s', file.path)
    // 接收文件成功后返回数据给前端
    res.json({res_code: '0'})
})

router.post('/writeArticle', article.writeArticle)//文章写入接口  
router.post('/getArticlelist', article.getArticlelist)//获取文章列表

module.exports = router
