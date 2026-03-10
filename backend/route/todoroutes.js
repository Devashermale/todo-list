const express = require('express')
const { gettodo, gettodoid, posttodo, puttodo, deletetodo } = require('../controller/todocontroller.js')   
const route = express.Router()

route.get('/', gettodo)
route.get('/todo/:id', gettodoid)
route.post('/todo', posttodo)
route.put('/todo/:id', puttodo)
route.delete('/todo/:id', deletetodo)    


module.exports = route