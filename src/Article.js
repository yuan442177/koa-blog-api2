const Router = require('koa-router')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const secret = 'koa-api'
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密


module.exports = {
    /**
     * 写文章、内容
     */
    async writeArticle(ctx) {
        const Article = mongoose.model('Article')
        //把从前端接收的POST数据封装成一个新的user对象
        let newArticle = new Article(ctx.request.body)
        console.log(newArticle)
        //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
        await newArticle.save().then(() => {
            //成功返回code=200，并返回成功信息
            ctx.body = {
                code: 200,
                message: '添加文章成功'
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
     * 获取文章列表
     */
    async getArticlelist(ctx) {
        console.log('getArticlelist')
        console.log(ctx.request)
        let category = ctx.request.body.category
        let page = ctx.request.body.page
        const Article = mongoose.model('Article')
        if(category != null && category !=undefined){
            console.log('根据分类查询')
            await Article.find({category:category}).sort({ '_id': -1 }).skip(parseInt(page)*5).limit(5).exec().then(async(result)=>{//limit()：限制数量 skip():分页 page：前端传过来的页数
                console.log(result)
                if(result != null && result != '' && result != undefined){
                    ctx.body={ code:200, data:result }
                }else{
                    ctx.body={ code:200, message:'没有了' }
                }
            }).catch(error=>{
                ctx.body={ code:500, message:error }
            })
        }else{
            console.log('查所有')
            await Article.find({}).sort({ '_id': -1 }).skip(parseInt(page)*5).limit(5).exec().then(async(result)=>{//limit：限制数量
                ctx.body={ code:200, data:result }
            }).catch(error=>{
                ctx.body={ code:500, message:error }
            })
        }
        
    }
}