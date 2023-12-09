const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())

// if you want to use req.body use a middleware
app.use(express.json())

// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`MyNoteBook app backend listening on port ${port}`)
})