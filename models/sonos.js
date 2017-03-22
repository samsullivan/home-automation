var SonosSystem = require('sonos-discovery')
var discovery = new SonosSystem()

var getZoneCount = function () {
  return discovery.zones.length
}

var getAllPlayers = function () {
  var players = []
  discovery.zones.forEach(function (zone) {
    zone.members.forEach(function (player) {
      players.push(player)
    })
  })
  return players
}

exports.hasSpeakers = function () {
  return !!getZoneCount()
}

exports.setVolume = function (volume, player) {
  var players = player ? [player] : getAllPlayers()
  players.forEach(function (player) {
    player.setVolume(volume)
  })
}

exports.incrementVolume = function (increment, player) {
  var players = player ? [player] : getAllPlayers()
  players.forEach(function (player) {
    player.setVolume(player.state.volume + increment)
  })
}
