const express = require('express')
const connectDB = require('./config/db')
const apiUserRoute = require('./routes/users')
const apiProfileRoute = require('./routes/profile')
const apiPostsRoute = require('./routes/posts')
const apiAuthRoute = require('./routes/auth')

const app = express()
// connect database
connectDB()

// init middleware

app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'))

//Define Routes

app.use(apiUserRoute)
app.use(apiProfileRoute)
app.use(apiPostsRoute)
app.use(apiAuthRoute)

const PORT = process.env.PORT || 5000 

app.listen(PORT, () => console.log(`Server is up on ${PORT}`))