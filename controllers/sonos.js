var express = require('express')
var router = express.Router()

var SonosSystem = require('sonos-discovery')
var discovery = new SonosSystem()

router.use(function (req, res, next) {
  if (discovery.zones.length) next()
  res.status(500).send('No Sonos speakers detected.')
})

router.get('/', function (req, res) {
  res.send(discovery.zones.length + ' Sonos speaker(s) detected.')
})

module.exports = router
