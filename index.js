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
const convert = require('koa-convert');
const static = require('koa-static') 
const path = require('path') 
const fs = require('fs')
const formidable = require('formidable')

//跨域
app.use(cors())

// post body 解析
app.use(bodyParser())


// 配置静态资源加载中间件
app.use(static(__dirname , 'public'));


// 静态文件服务，针对 html js css fonts 文件
const staticCache = require('koa-static-cache')
function setStaticCache() {
    const exampleDir = path.join(__dirname, '..', '..', 'example')
    const releaseDir = path.join(__dirname, '..', '..', 'release')
    app.use(staticCache(exampleDir))
    app.use(staticCache(releaseDir))
}
setStaticCache()





// // 错误处理
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
            /^\/public/,
            /^\/up/,
            /^\/writeArticle/,
            /^\/getArticlelist/,
            /^\/upuserinfo/
            // /^\/userInfo/
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