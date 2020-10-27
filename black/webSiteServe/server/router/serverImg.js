const express= require('express')
const router = express.Router()
let OSS = require('ali-oss');
// const passport = require('passport');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart()
let client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI4G2irdhZHUWEgeUJhGa6',
  accessKeySecret: 'un7xRN7025dUID5j1FuW9nNcS9FSHB',
  bucket: 'cmz-img',
});

router.post('/markdownFile',(req,res)=>{
    res.send({
        body:req.body
    })
    // console.log(req.body)
    // console.log(req.query)
    // console.log(filename)

	// // 截取图片名
    // var filename = params.replace(/^.+\\([^\\]+)$/,"$1");
            // //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        // client.put(name, params).then(res=>{
        //     console.log(res)
        //     // const url = result.url;
        //     // const name = result.name;
        //     // const localUrl = url.replace(/^http/,"https")
        //     res.send({
        //         img:localUrl,
        //         name:name,
        //         status:200
        //     })
        // }).catch (err=>{
        //     res.send({
        //         msg:err,
        //         status:400
        //     })
        // })
})

router.post('/putFile',multipartMiddleware,(req,res)=>{
    console.log(req.body)
	// var params = req.body.local
	// // 截取图片名
  //   var filename = params.replace(/^.+\\([^\\]+)$/,"$1");
  //   async function put () {
  //       try {
  //       //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
  //       let result = await client.put(filename, params);
  //       console.log(result);
  //       const url = result.url;
  //       const name = result.name;
  //       const localUrl = url.replace(/^http/,"https")
  //           res.send({
  //               data:localUrl,
  //               name:name,
  //               status:200
  //           })
  //       } catch (e) {
  //           res.send({
  //               status:400
  //           })
  //       }
  //   }
  //   put();
})


router.delete('/delImg',(req,res)=>{
    var params = req.body.query;
    async function del(){
        try {
          let result = await client.delete('object-name');
          console.log(result);
        } catch (e) {
          console.log(e);
        }
      }
      
      del();
})

module.exports = router;