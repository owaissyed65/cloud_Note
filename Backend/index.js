const connectToMongo = require('./db')
connectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World ,How are You!')
})
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
// app.get('/login', (req, res) => {
//   res.send('Hello login')
// })
// app.get('/signup', (req, res) => {
//   res.send('Hello signup')
// })

app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`)
})
