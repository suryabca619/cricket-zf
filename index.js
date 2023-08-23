const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const { validateTeam, validatePlayer } = require('./helper')
const port = 3000

const teams = {}
const players = []


app.post('/teams', (req, res) => {
  try {
    const team = validateTeam(req.body, teams)
    teams[team.name.toLowerCase()] = team
    res.status(201).json(req.body)
  } catch (err) {
    console.log(err)
    res.send(err.message)
  }
})

app.get('/teams', (req, res) => {
  try {
    res.status(200).json(Object.values(teams))
  } catch (err) {
    console.log(err)
    res.send(err.message)
  }
})

app.post('/teams/:teamName/players', (req, res) => {
  try {
    const teamName = req.params.teamName
    if (!teams[teamName]) {
      res.status(400).json({ msg: `Team ${teamName} not exists` })
    }
    let player = req.body
    player.teamName = teamName.toLowerCase()
    player = validatePlayer(player, teams, players)
    players.push(player)
    res.status(201).json(player)
  } catch (err) {
    console.log(err)
    res.send(err.message)
  }
})

app.get('/teams/:teamName/players', (req, res) => {
  try {
    const teamName = req.params.teamName
    if (!teams[teamName]) {
      res.status(400).json({ msg: `Team ${teamName} not exists` })
    }
    const teamPlayers = players.filter(p => p.teamName === teamName.toLowerCase())
    res.status(200).json(teamPlayers)
  } catch (err) {
    console.log(err)
    res.send(err.message)
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
