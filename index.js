const Koa = require('koa')
const app = new Koa()
//引入connect
const { connect,initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const routes = require('./routes/index')
const jwtKoa = require('koa-jwt')
const secret = 'koa-api'

app.use(cors())

app.use(bodyParser())


// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
            ctx.body = {
                code:ctx.status,
                msg:'您没有权限'
            }
        }else{
            throw err;
        }
    })
})

app.use(jwtKoa({secret: secret}).unless({
        path: [
            /^\/login/,
            /^\/register/,
            // /^\/userCenter/
        ] //数组中的路径不需要通过jwt验证
}))

// //装载所有子路由
// let router = new Router();
// router.use('/user',user.routes())
// //加载路由中间件
// app.use(router.routes())
// app.use(router.allowedMethods())
// 初始化路由中间件
app.use(routes.routes()).use(routes.allowedMethods())

//立即执行函数 打开数据库等操作
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