var express = require('express')
var router = express.Router()

router.use('/sonos', require('./sonos'))

router.use(function (req, res, next) {
  res.status(404).send({
    success: false,
    error: 'Page not found.'
  })
})

router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({
    success: false,
    error: 'Unknown error occurred.'
  })
})

module.exports = router
