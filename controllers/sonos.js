var express = require('express')
var router = express.Router()
var Sonos = require('../models/sonos')

router.use(function (req, res, next) {
  if (!Sonos.hasSpeakers()) {
    res.status(500).send('No Sonos speakers detected.')
  }

  next()
})

router.get('/', function (req, res) {
  res.send(Sonos.getSpeakerCount() + ' Sonos speaker(s) detected.')
})

router.post('/volume/:volume', function (req, res) {
  Sonos.setVolume(req.params.volume)
  res.send('Success!')
})

router.post('/volume/up/:volume', function (req, res) {
  var incrementor = parseInt(req.params.volume)

  Sonos.incrementVolume(incrementor)
  res.send('Success!')
})

router.post('/volume/down/:volume', function (req, res) {
  var incrementor = -parseInt(req.params.volume)

  Sonos.incrementVolume(incrementor)
  res.send('Success!')
})

module.exports = router
