const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const qqMessage = new Schema({
    emil:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true      
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = QQmessage = mongoose.model('QQmessage',qqMessage)