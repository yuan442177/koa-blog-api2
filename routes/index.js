const router = require('koa-router')()
let user = require('../src/User')

//router.use('/user', user.routes(), user.allowedMethods())
router.post('/register', user.register)//用户=注册
router.post('/login', user.login)//用户登录
router.del('/deleteUser', user.delete)//删除用户
router.post('/userInfo', user.userInfo)//用户信息
module.exports = router
