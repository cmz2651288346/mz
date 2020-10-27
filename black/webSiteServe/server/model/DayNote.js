const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DateNoterSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    markdownArticle:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    read:{
        type:String,
    }
})

module.exports = DateBook = mongoose.model('dateBook',DateNoterSchema);