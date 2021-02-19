const express = require('express')
const app = express()
const port = 80


app.use(express.static('public'));

app.get('/test', (req, res) => {
  res.send('Hello World!!!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://www.miqueltoran.com:${port}`)
})