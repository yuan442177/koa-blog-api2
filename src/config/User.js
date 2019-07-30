//用户工具文件
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) 
const secret = 'koa-api'

const level = '1'
const isDelete = false

let userBasics = function (userInfo) {
    userInfo.level = level
    userInfo.isDelete = isDelete
    return userInfo
}

let userInfo = function (token) {
    let payload
    if (token) {
            console.log(token)
            //引入User的model
            const User = mongoose.model('User')
            payload =  verify(token.split(' ')[1], secret)// // 解密，获取payload
            User.findOne({userName:payload._name}).exec().then(async(result)=>{
            console.log(result)
            return result
        }).catch(error=>{
            return error
        })
    }
     else {
        return 'token错误'
    }
}

module.exports = {
    userBasics,
    level,
    isDelete,
    userInfo
}