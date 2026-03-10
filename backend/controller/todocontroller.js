const todolist = require('../model/todoschema.js')

const gettodo = async (req ,res) => {

    try {
        const todos = await todolist.find({});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
    
}
const gettodoid = async (req ,res) => {
    const {id} =req.params;
    try {
        const todos = await todolist.findById(id);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
    
}
const posttodo = async (req ,res) => {

     try {
        const tododata = req.body
    
         const todos = await todolist.create(tododata)
    res.status(201).json(todos)
     } catch (error) {
        res.status(500).json({
            error: error.message
        })
     }
   
}
const puttodo = async (req ,res) => {
    const {id} = req.params
    const {todo, iscompleted} = req.body
    try {
        const todos = await todolist.findByIdAndUpdate(id, {todo, iscompleted}, {new:true})
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
    
}
const deletetodo = async (req ,res) => {
    const {id} = req.params         
    try {       
        const todos = await todolist.findByIdAndDelete(id)
        res.status(200).json(todos)
    } catch (error) {           
        res.status(500).json({
            error: error.message
        })
    }   
}

module.exports = {
    gettodo,
    gettodoid,
    posttodo,
    puttodo,
    deletetodo
}   