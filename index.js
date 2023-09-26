const express = require('express')
require('dotenv').config()
const connectToMongo = require('./db')
const userRouter = require('./routes/userRouter')
const { urlencoded } = require('body-parser')
const auth = require('./middlewares/auth')
const cors = require('cors')
const path = require('path')
const notesRouter = require('./routes/notesRouter')
const server = express()
const port = process.env.PORT


connectToMongo( process.env.MONGO_URL)
server.use(express.json())
server.use(cors())
server.use(express.static('dist'))

// server.use(urlencoded({extended:true}))

server.use('api/user', userRouter)
server.use('api/notes',auth, notesRouter)

// server.get('/*', (req,res)=>{
//     const filePath = path.resolve(__dirname,'./build/index.html')
//     console.log({filePath});
//     res.sendFile(filePath)
// })
server.get('/api', (req,res)=>{
    res.send('<h1>api<h1>')
})

server.listen(port, () => {
    console.log(`notesaver app listning at port : ${port}`);
})
