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

module.exports = router
