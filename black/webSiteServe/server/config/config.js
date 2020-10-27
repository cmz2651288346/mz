const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = '4joZSxoKIyJfhP__zn-TeLZ_lavQFSceBnVZ51CL'
const secretKey = 'pINy3r_-th_Pz2sexxqMup2LMra7B6z87g7ezbKz'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'cmzimg',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
    uploadToken
}