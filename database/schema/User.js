/**
 * 用户模型
 */
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

//创建用户Schema
const userSchema = new Schema({
    UserId:ObjectId,//用户id
    userName:{unique:true,type:String},//用户名
    password:String,//密码
    createAt:{type:Date,default:Date.now()},//创建时间
    lastLoginAt:{type:Date,default:Date.now()},//最后登录时间
    email:String,//电子邮箱
    level:Number,//级别
    isDelete:Boolean,//是否删除
},{
    collection:'user'
})

//密码加密
userSchema.pre('save',function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})

userSchema.methods = {
    //密码比对的方法
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}

//发布模型
mongoose.model('User',userSchema)