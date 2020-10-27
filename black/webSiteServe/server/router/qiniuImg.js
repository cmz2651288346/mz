const qiniu = require('qiniu')

let bucket = 'cmzimg-hh' //  七牛云存储空间名
let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket }) //  指定七牛云存储空间
let accessKey = '4joZSxoKIyJfhP__zn-TeLZ_lavQFSceBnVZ51CL' //  AK
let secretKey = 'pINy3r_-th_Pz2sexxqMup2LMra7B6z87g7ezbKz' //  SK
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey) //  鉴权对象
let uploadToken = putPolicy.uploadToken(mac) //  获取上传凭证

let qn = {}

/**
 * 客户端上传
 */
qn.uptoken = (bucket) => {
  putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
  let tk = {
    'token': uploadToken,
    'url': 'http://domain.com/'
  }
  return tk
}

/**
 * 服务端上传
 */
qn.upImg = () => {
  let config = new qiniu.conf.Config()
  config.zone = qiniu.zone.Zone_z2 //  空间对应机房
  let localFile = '/Users/zzz/Desktop/mac/unit/moon/local/imgs/111.jpeg' //  本地文件
  let formUploader = new qiniu.form_up.FormUploader(config) //  生成表单上传的类
  let putExtra = new qiniu.form_up.PutExtra() //  生成表单提交额外参数
  let key = Math.random() + 'test.jpeg' //  重命名文件
  
  /**
   * 上传本地文件
   * @param uploadToken 上传凭证
   * @param key 目标文件名
   * @param localFile 本地文件路径
   * @param putExtra 额外选项
   * @param callback
   */
  formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
    if (respErr) {
      console.log(respErr)
      throw respErr
    }
    if (respInfo.statusCode == 200) {
      console.log(respBody)
    } else {
      console.log(respInfo.statusCode)
      console.log(respBody)
    }
  })
}
module.exports = qn

作者：younit
链接：https://juejin.im/post/5d36bec0e51d45775e33f637
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。