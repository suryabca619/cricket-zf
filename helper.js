const { AppConstant } = require('./app-constant')

const validateTeam = (team = {}, teams = {}) => {
  if (!team.name || !team.maxPlayers) {
    console.log(`team => ${team}`)
    throw new Error('Invaild input')
  }

  if (teams[team.name.toLowerCase()]) {
    console.log(`teams => ${JSON.stringify(teams)}`)
    throw new Error(`Team name ${team.name} already created`)
  }

  return {
    name: team.name,
    maxPlayers: team.maxPlayers
  }
}

const validatePlayer = (player = {}, teams = {}, players = []) => {
  const playerTeam = teams[player.teamName]

  const existingPlayerCount = players.filter(p => p.teamName === playerTeam.name.toLowerCase()).length

  if (existingPlayerCount >= playerTeam.maxPlayers) {
    throw new Error(`Max Player count reached in ${player.teamName} team`)
  }
  if (!player.name) {
    console.log(`player => ${player}`)
    throw new Error('Invaild input')
  }

  return {
    name: player.name,
    teamName: playerTeam.name.toLowerCase(),
    isAllRounder: !!player.isAllRounder,
    isRightHanderBatsmen: !!player.isRightHanderBatsmen,
    isRightHanderBowler: !!player.isRightHanderBowler,
    bowlingStyle: AppConstant.bowlingStyle.includes(player.bowlingStyle) ? player.bowlingStyle : null
  }
}

module.exports = {
  validateTeam,
  validatePlayer
}
