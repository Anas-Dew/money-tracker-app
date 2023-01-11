const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
connectToMongo();

const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

// Available Routes 
app.use('/api/', require('./routes/auth.js'))
app.use('/api/transactions', require('./routes/transactions.js'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, '0.0.0.0',() => {
  console.log(`Money Tracker's Server listening on port ${port}`)
})