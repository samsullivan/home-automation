var express = require('express')
var router = express.Router()
var Sonos = require('../models/sonos')

router.use(function (req, res, next) {
  if (!Sonos.hasSpeakers()) {
    res.status(500).json({
      success: false,
      error: 'No Sonos speakers found.'
    })
  }

  next()
})

router.post('/volume/:volume', function (req, res) {
  var volume = parseInt(req.params.volume)
  Sonos.setVolume(volume)

  res.json({success: true})
})

router.post('/volume/:action/:increment', function (req, res, next) {
  var increment = 0
  switch (req.params.action) {
    case 'up':
      increment = parseInt(req.params.increment)
      break
    case 'down':
      increment = -parseInt(req.params.increment)
      break
    default:
      next()
      return
  }
  Sonos.incrementVolume(increment)

  res.json({success: true})
})

module.exports = router
