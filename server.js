var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Home Automation')
})

app.use(function (req, res, next) {
  res.status(404).send('Not Found')
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Unknown Error')
})

app.listen(3000, function () {
  console.log('Listening on port 3000.')
})
