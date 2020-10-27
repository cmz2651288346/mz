const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserCommentsSchema = new Schema({
    username:{
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
    },
    read:{
        type:String,
        required:true
    }
})

module.exports = UserComments = mongoose.model('userComments',UserCommentsSchema)