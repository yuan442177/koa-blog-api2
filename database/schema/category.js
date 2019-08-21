/**
 * 栏目模型
 */
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

//创建用户Schema
const categorySchema = new Schema({
    columnId:ObjectId,//栏目id
    title:{unique:true,type:String},//标题
    createAt:{type:Date,default:Date.now()},//创建时间
    lastupdateAt:{type:Date,default:Date.now()},//最后更新修改时间
    isHide:{type:Boolean,default:false},
    parentCategory:{type:String,default:'none'}
},{
    collection:'category'
})

//发布模型
mongoose.model('category',categorySchema)