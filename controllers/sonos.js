var express = require('express')
var router = express.Router()

var SonosSystem = require('sonos-discovery')
var discovery = new SonosSystem()

router.get('/', function (req, res) {
  res.send('Sonos: ' + discovery.zones.length + ' speakers found.')
})

module.exports = router
