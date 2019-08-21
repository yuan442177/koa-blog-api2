const Router = require('koa-router')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const secret = 'koa-api'
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密


module.exports = {
    /**
     * 新增栏目
     */
    async addCategory(ctx) {
        const Category = mongoose.model('category')
        //把从前端接收的POST数据封装成一个新的user对象
        let newCategory = new Category(ctx.request.body)
        console.log(newCategory)
        //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
        await newCategory.save().then(() => {
            //成功返回code=200，并返回成功信息
            ctx.body = {
                code: 200,
                message: '新建栏目成功'
            }
        }).catch(error => {
            //失败返回code=500，并返回错误信息
            ctx.body = {
                code: 500,
                message: error
            }
        })
    },
    /**
     * 获取栏目列表
     */
    async getCategorylist(ctx) {
        console.log('getColumnlist')
        console.log(ctx.request)
        let parentCategory = ctx.request.body.parentCategory//获取前端传来的上级栏目参数
        const Category = mongoose.model('category')
        if(parentCategory != null && parentCategory !=undefined){
            console.log('获取所有上级栏目为：'+parentCategory+'的栏目')
            await Category.find({parentCategory:parentCategory}).sort({ '_id': 1 }).exec().then(async(result)=>{
                console.log(result)
                if(result != null && result != '' && result != undefined){
                    ctx.body={ code:200, data:result }
                }else{
                    ctx.body={ code:200, message:'没有获取到，请检查上级栏目名是否错误' }
                }
            }).catch(error=>{
                ctx.body={ code:500, message:error }
            })
        }else{
            await Category.find({}).sort({ '_id': 1 }).exec().then(async(result)=>{
                console.log(result)
                if(result != null && result != '' && result != undefined){
                    ctx.body={ code:200, data:result }
                }else{
                    ctx.body={ code:200, message:'没有获取到栏目信息' }
                }
            }).catch(error=>{
                ctx.body={ code:500, message:error }
            })
            }
        }
     
}