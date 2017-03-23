var express = require('express')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(require('./controllers'))

app.listen(80, function () {
  console.log('Listening on port 80.')
})
