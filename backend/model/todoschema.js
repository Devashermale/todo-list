const mongoose = require('mongoose')

const todolist  = mongoose.Schema({
 

 todo :{
    type:String,
    required:true
 },
  iscompleted:{
    type : Boolean,
    required:true
  }

},
{
  timestamps: true

 }
)
const todo = mongoose.model ('todolist', todolist)
module.exports = todo