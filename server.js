const express = require('express')
const dotenv = require('dotenv').config()
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const cors = require('cors')
//const bodyParser = require('body-parser')

connectDb()
const app = express()

const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json())

app.use('/api/users', require('./routes/usersRoutes'))

app.use(errorHandler)


app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})
