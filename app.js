const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

// ---------------------
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})

////////////////////////////////////

const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'))

app.get('/test-users', (req, res) => {
  return res.json(users)
})

app.get('/posts', (req, res) => {
  let allPosts = []

  for (let user of users) {
    user.posts?.forEach(post => allPosts.push(post))
  }

  return res.json(allPosts)
})

app.get('/test-users/:userId', (req, res) => {
  const id = req.params.userId
  const user = users.find(user => user.id == id)

  return res.status(200).json(user)
})
