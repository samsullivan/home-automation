var express = require('express')
var router = express.Router()

router.use('/sonos', require('./sonos'))

router.use(function (req, res, next) {
  res.status(404).send('Not Found')
})

router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Unknown Error')
})

module.exports = router
