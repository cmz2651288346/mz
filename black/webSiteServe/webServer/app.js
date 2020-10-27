const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./content/db').mongoUrl;
const passport = require('passport');
app.use(passport.initialize());
require('./generateJwt/passport')(passport);
mongoose.connect(db,{useNewUrlParser:false})
                    .then(res=>{
                        console.log('数据库连接成功')
                    }).catch(err=>{
                        console.log(err+'数据库连接失败')
                    })


app.listen(3000,()=>{
    console.log('300端口连接成功')
})