const express = require('express')
const env = require('dotenv')
const app = express()
const cors = require('cors')
const todoroutes  = require('./route/todoroutes.js')
const { default: mongoose, mongo } = require('mongoose')
app.use(express.json())
env.config()

app.use(cors({
    origin:"  http://localhost:5173"
}))
app.use('/',todoroutes)

port = process.env.port
 

mongoose.connect(process.env.MONGOURI)
.then(()=>{
    console.log('connection is successful')
   app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})

})