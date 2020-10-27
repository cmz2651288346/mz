let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let SuggestSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    suggestMessage:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Suggest = mongoose.model('Suggest',SuggestSchema)