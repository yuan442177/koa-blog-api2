const Koa = require('koa')
const app = new Koa()
//引入connect
const { connect,initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const Router = require('koa-router')
let user = require('./src/user.js')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const routes = require('./routes/index')

app.use(cors())

app.use(bodyParser());

// //装载所有子路由
// let router = new Router();
// router.use('/user',user.routes())
// //加载路由中间件
// app.use(router.routes())
// app.use(router.allowedMethods())
// 初始化路由中间件
app.use(routes.routes()).use(routes.allowedMethods())

//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
    // const User = mongoose.model('User')
    // let oneUser = new User({userName:'hoo2',password:'123456'})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })
    // let user = await User.findOne({}).exec()
    // console.log('-------------------------------')
    // console.log(user)
    // console.log('-------------------------------')

})()
// app.use(async(ctx)=>{
//     ctx.body = '<h1>hello Koa2</h1>'
// })

app.listen(3666,()=>{
    console.log('[Server] starting at port 3666')
})