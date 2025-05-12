const mongoose = require("mongoose");
const {Schema} = mongoose;


const questionSchema = new Schema({
    question :{
        type : String,
        required : true,
    },
    options : {
        type : [String],
        required : true,
    },
    correctAns : {
        type : String,
        required : true
    },
    questiontype : {
        type : String,
        required : true,
    }
    
    
})

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
