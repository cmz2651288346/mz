// const nodemailer = require('nodemailer')
// const express = require('express')
// const router = express.Router();
// let transporter = nodemailer.createTransport({
//   host: 'smtp.qq.com',
//   secureConnection: true, // use SSL
//   port: 465,
//   secure: true, // true port 465, false port 587
//   auth: {
//     user: '2651288346@qq.com',
//     pass: 'djkgxnssulyadjej'
//   }
// })

// const verifyClient = () => {
//   transporter.verify((err, success) => {
//     if (err) {
//       console.warn('客户款初始化失败')
//     } else {
//       console.log('客户端成功')
//     }
//   })
// }
// verifyClient()

// router.post('/postEmail',(req,res)=>{
//     let mailOptions = {
//       from: '<2651288346@qq.com>', // 发件人
//       to: req.body.address, // 收件人
//       subject: req.body.title, // 主题
//       text: req.body.content, // plain text body
//     }
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error);
//       }
//       console.log(`Message: ${info.messageId}`);
//       console.log(`sent: ${info.response}`);

//     });
// })



    

// module.exports = router