# 基于koa2+mongodb的后台接口
**正在完善中**
## 用户接口
router.post('/register', user.register)//用户注册
参数：userName（用户名），password（密码）

router.post('/login', user.login)//用户登录
参数：userName（用户名），password（密码）

router.del('/deleteUser', user.delete)//删除用户
参数：_id（用户id）

router.post('/userInfo', user.userInfo)//用户信息  
参数：token（用户加密token）

router.post('/upuserinfo', user.upuserinfo)//更新用户信息（暂时只能更新密码）
参数：_userId（用户id），_password（新密码）

## 文章内容接口
router.post('/upimgs')//富文本编辑器图片上传接口，最多同时上传5张，自动处理不用管

router.post('/writeArticle', article.writeArticle)//文章写入接口
参数：ctx.request.body上下文

router.post('/getArticlelist', article.getArticlelist)//获取文章列表
参数：category（文章分类），page（分页数）