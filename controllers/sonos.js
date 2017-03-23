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

router.post('/action', function (req, res) {
  if (!req.body || !req.body.result) {
    res.status(400).json({
      success: false,
      error: 'Invalid JSON body.'
    })
    return
  }

  var params = req.body.result.parameters
  switch (req.body.result.action) {
    case 'change_volume':
      var number = parseInt(params.number)
      switch (params.verb) {
        case 'up':
          Sonos.incrementVolume(number)
          break
        case 'down':
          Sonos.incrementVolume(-number)
          break
        default:
          Sonos.setVolume(number)
      }
      break
    default:
      res.status(404).json({
        success: false,
        error: 'Unknown action.'
      })
      return
  }

  res.json({
    success: true,
    speech: req.body.result.fulfillment.messages[0].speech
  })
})

module.exports = router
