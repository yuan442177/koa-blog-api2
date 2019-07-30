/**
 * 文章内容模型
 */
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

//创建用户Schema
const ArticleSchema = new Schema({
    ArticleId:ObjectId,//文章id
    category: String,
    title:{unique:true,type:String},//标题
    content:String,//内容
    author:String,//作者
    createAt:{type:Date,default:Date.now()},//创建时间
    lastupdateAt:{type:Date,default:Date.now()},//最后更新修改时间
    Read:Number,//阅读数量
    isDelete:Boolean,//是否删除
},{
    collection:'Article'
})

//发布模型
mongoose.model('Article',ArticleSchema)