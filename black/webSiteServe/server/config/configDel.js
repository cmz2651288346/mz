const qiniu = require('qiniu');
const { resolveContent } = require('nodemailer/lib/shared');
const accessKey = '4joZSxoKIyJfhP__zn-TeLZ_lavQFSceBnVZ51CL'
const secretKey = 'pINy3r_-th_Pz2sexxqMup2LMra7B6z87g7ezbKz'

var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var config = new qiniu.conf.Config();
//config.useHttpsDomain = true;
config.zone = qiniu.zone.Zone_z2; // 华南
var bucketManager = new qiniu.rs.BucketManager(mac, config);
console.log(bucketManager)
var bucket = "cmzimg";
// var key = req.body.fileName; // 传递文件名

const delImg = ((key)=>{
    bucketManager.delete(bucket, key,((err, respBody, respInfo)=>{
      if(err){
        console.log(err)
      }else{
        console.log(respBody, respInfo)
      }
    })
    )
})
module.exports = {
    delImg
}