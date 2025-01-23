const connectToMongo=require('./db');
const express = require('express')
const cors=require('cors'); 
const noteRoutes = require('./routes/notes');

connectToMongo();
const app = express()
const port = 5000

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Sneha!')
})
//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`NoteSync backend listening on port ${port}`)
})
