const express = require('express')
require('./db/mongoose')
const { ObjectID } = require('mongodb')
const comodityRouter = require('./routers/comodityRoute')
const reportRouter = require('./routers/reportRoute')

// Using express to Create the REST API
const app = express()
const port = 3000 // Local server

app.use(express.json())
app.use(comodityRouter)
app.use(reportRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+ port)
})
