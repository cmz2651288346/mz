const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const takeIpSchema = new Schema({
    UserIp:{
        type:String
    }
})

module.exports = TakeIp = mongoose.model('TakeIp',takeIpSchema)