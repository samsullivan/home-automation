var SonosSystem = require('sonos-discovery')
var discovery = new SonosSystem()

exports.getSpeakerCount = function () {
  return discovery.zones.length
}
