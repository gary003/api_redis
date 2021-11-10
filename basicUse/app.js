const express = require("express")
const axios = require("axios")
const redis = require("redis")

const API_PORT = 8080
const REDIS_PORT = 6379

const client = redis.createClient(REDIS_PORT)
const app = express()

// Cache middleware
const cacheMiddleware = (req, res, next) => {
  const { username } = req.params

  return client.get(username, (err, data) => {
    if (!!err) next(err)

    if (!!data) {
      return res.status(200).send(`<h2>${username} has ${data} repositories.</h2>`)
    } else {
      next()
    }
  })
}

app.get("/repos/:username", cacheMiddleware, async (req, res) => {
  console.log("fetching data ...")

  const { username } = req.params

  const response = await axios.get(`https://api.github.com/users/${username}`).catch((err) => console.log(err))

  // console.log(response.data)

  if (!response || !response.data.login) {
    const error = new Error("Impossible to get a valid response from api")
    console.log(error)
    return res.status(500).send(error)
  }

  const reposCount = response.data.public_repos

  client.setex(username, 10, reposCount)

  return res.status(200).send(`<h2>${username} has ${reposCount} repositories.</h2>`)
})

app.listen(API_PORT, () => {
  console.log(`listening on port ${API_PORT}`)
})
