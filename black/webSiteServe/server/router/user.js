const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jsCookie = require('js-cookie');
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
router.post('/registered',(req,res)=>{
    console.log(req.body)
    User.findOne({email:req.body.email})
                .then(reg=>{
                    if(reg){
                       return res.status(400).json('邮箱已被注册')
                    }else{
                        const UserMessage = new User({
                            username:req.body.username,
                            email:req.body.email,
                            password:req.body.password
                        });
                        bcrypt.genSalt(10, (err, salt)=>{
                            bcrypt.hash(UserMessage.password, salt, (err, hash)=>{
                                    UserMessage.password = hash;
                                    User(UserMessage).save()
                                        .then(user=>res.json("注册成功"))
                                        .catch(err=>res.json(err));
                            });
                        });
                    }
                })
})

router.post('/login',bodyParser.json(),(req,res)=>{
    const password = req.body.password;
    User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(400).json('该邮箱未被注册')
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch=>{
                        if(isMatch){
                            const rules = {
                                id:user.id,
                                username:user.username,
                                avatar:user.avatar
                            }
                            jwt.sign(rules, 'secret', { expiresIn: 60*60 },(err,token)=>{
                                if(err) throw err;
                                // 设置Cookie
                                jsCookie.set('email',user.email, { expires: 3 });
                                jsCookie.set('password',user.password, { expires: 3 });
                                res.json({
                                    success:'成功',
                                    token:'Bearer   '+token,
                                    username:user.username,
                                    status:'200',
                                    email:user.email
                                })   
                            })
                            }else{
                                res.json({
                                    status:'404',
                                    message:'密码输入错误'
                                });
                            }
                    })
        })
})

// 验证jwt
// router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
//     res.json({msg:"success"}); 
// })

module.exports = router