//1. loads .env file
require('dotenv').config()

//2. import express
const express = require('express')

//3. import cors
const cors = require('cors')

//import router
const router = require('./Router/routes')

//import db
const db =require('./DB/connection')

const appMiddleware=require('./Middlewares/appMiddleware')

//4. create an apppilication using express
const pfServer = express()

//5. use cors
pfServer.use(cors())
pfServer.use(express.json())//middleware
pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

//6.Define PORT
const PORT = 4000 || process.env.PORT 

//7. 
pfServer.listen ((PORT),(req,res)=>{
    console.log('listening on port'+PORT);
})

// http get resolvimg to http://localhost:4000
pfServer.get('/', (req,res)=>{
    res.send('project fair server started');
})

pfServer.post('/', (req,res)=>{
    res.send('post method')
})