const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./content/db').mongUrl;
const bodyParser = require('body-parser');//post

// 服务端接口区
// 后台接口模块
// 登陆模块路由
const user = require('./router/user');
// IT相关文章列表路由
const itArticle = require('./router/itArticle')
// 其他文章列表路由
const anthorArticle = require('./router/anthorArticle')
// it日常文章
const dayNote = require('./router/dayNote')
// 其他文章
const anthorNote = require('./router/anthorNote');
// 邮箱留言
// const emailMessage = require('./router/qqMessage')
// 用户留言
const userComments = require('./router/userComments')


// 客户端口接口数据区
// IT技术区
const webItArticle = require('./router/webRouter/webItArticle')
// 其他文章区
const webAnthorArticle = require('./router/webRouter/webAnthorArticle')
// it日常文章区
const webDayNote = require('./router/webRouter/webDayNote')
// 其他文章区
const webAnthorNote = require('./router/webRouter/webAnthorNote')
// 用户留言
const webUerComments = require('./router/webRouter/webUserComments')
// 获取用户ip
const webTakeUserIp = require('./router/webRouter/webTakeUserIp')
const passport = require('passport');
const cors = require('cors');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());

// 图片上传
const serverImg = require('./router/serverImg') 

//实现跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild , token');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

// It文章图片上传
// 引入七牛云配置
const qnconfig = require('./config/config')
const qnconfigDel = require('./config/configDel')
// 处理请求
app.get('/admin/router/api/ItTokenImg', (req, res, next) => {
  // console.log(qnconfig.uploadToken)
  res.status(200).send(qnconfig.uploadToken)
})
app.post('/admin/router/api/ItTokenImgDel', (req, res, next) => {
    qnconfigDel.delImg(req.query.keyname).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
})

  
// 生成jwt
require("./Configuration/passport")(passport);
mongoose.connect(db,{ useNewUrlParser:true })
                .then(contentdb=>{
                    console.log('数据库连接成功')
                }).catch(err=>{
                    console.log('数据库连接失败'+err);
                })
// 用户个人信息接口
app.use('/admin/router/api',anthorArticle);
app.use('/admin/router/api',itArticle);
app.use('/admin/router/api',user);
app.use('/admin/router/api',dayNote);
app.use('/admin/router/api',anthorNote);
// 留言区
app.use('/admin/router/api',userComments)

// 邮箱测试
// app.use('/admin/router/api',emailMessage)

// 图片上传
app.use('/admin/router/api/tokenImg',serverImg)

// 客户端接口
app.use('/webcmz/router/api',webItArticle);
app.use('/webcmz/router/api',webAnthorArticle);
app.use('/webcmz/router/api',webDayNote);
app.use('/webcmz/router/api',webAnthorNote);
app.use('/webcmz/router/api',webUerComments);
app.use('/webcmz/router/api',webTakeUserIp);
var server = app.listen(3000, '0.0.0.0',()=>{
    var host = server.address().address
    var port = server.address().port
    console.log('3000端口访问成功');
})