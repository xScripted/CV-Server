const express = require('express')
const app = express()
const port = 80


app.use(express.static(__dirname + '/CV'));

app.listen(port, () => {
  console.log(`Example app listening at http://www.miqueltoran.com:${port}`)
})