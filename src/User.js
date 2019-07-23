const Router = require ('koa-router')
const mongoose = require('mongoose')

module.exports={
    /**
     * 用户注册
     * @param {*} ctx 
     */
    async register(ctx){
        console.log('register')
        console.log(ctx.request.body)
        //取得Model
        const User = mongoose.model('User')
        //把从前端接收的POST数据封装成一个新的user对象
        let newUser = new User(ctx.request.body)
        //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
        await newUser.save().then(()=>{
            //成功返回code=200，并返回成功信息
            ctx.body={
                code:200,
                message:'注册成功'
            }
        }).catch(error=>{
             //失败返回code=500，并返回错误信息
            ctx.body={
                code:500,
                message:error
            }
        })
       
    },

    /**
     * 用户登录
     * @param {} ctx 
     */
    async login(ctx){
        console.log('用户登录')
        //得到前端传递过来的数据
        let loginUser = ctx.request.body
        console.log(loginUser)
        let userName = loginUser.userName
        let password = loginUser.password
        //引入User的model
        const User = mongoose.model('User')
        //查找用户名是否存在，如果存在开始比对密码
        await User.findOne({userName:userName}).exec().then(async(result)=>{
            console.log('result')
            console.log(result)
            if(result){
            //console.log(User)
                //当用户名存在时，开始比对密码
                let newUser = new User()  //因为是实例方法，所以要new出对象，才能调用
                await newUser.comparePassword(password,result.password)
                .then( (isMatch)=>{
                    //返回比对结果
                    ctx.body={ code:200, message:isMatch} 
                })
                .catch(error=>{
                    //出现异常，返回异常
                    console.log(error)
                    ctx.body={ code:500, message:error}
                })
            }else{
                ctx.body={ code:200, message:'用户名不存在'}
            }
            
        }).catch(error=>{
            console.log(error)
            ctx.body={ code:500, message:error  }
        })
    },
    /**
     * 用户删除
     */
    async delete(ctx){
        console.log('用户删除')
        //得到前端传递过来的数据
        let deleteInfo = ctx.request.body
        console.log(deleteInfo)
        let _id = deleteInfo._id
        const User = mongoose.model('User')
        await User.findOne({_id:_id}).exec().then(async(result)=>{
            console.log(result)
            if(result){
                //用mongoose的remove方法直接删除，然后判断是否成功，返回相应的结果
                await User.remove({_id:_id}).then(()=>{
                    //成功返回code=200，并返回成功信息
                    ctx.body={
                        code:200,
                        message:'删除成功'
                    }
                }).catch(error=>{
                     //失败返回code=500，并返回错误信息
                    ctx.body={
                        code:500,
                        message:error
                    }
                })
            }else{
                ctx.body={ code:200, message:'数据不存在'}
            }
        }).catch(error=>{
            console.log(error)
            ctx.body={ code:500, message:error  }
        })
    }
}
