var express = require('express')
var app = express()

app.use(require('./controllers'))

app.listen(80, function () {
  console.log('Listening on port 80.')
})
