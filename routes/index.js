const router = require('koa-router')()
let user = require('../src/User')

//router.use('/user', user.routes(), user.allowedMethods())
router.post('/register', user.register)
router.post('/login', user.login)
router.del('/delete', user.delete)
module.exports = router
