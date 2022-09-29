require("dotenv").config()

import express, { Response, Request, Express } from "express"
import get, { AxiosResponse } from "axios"
import { getValueFromKey, setKeyValue } from "./servicesData/redis"

const API_PORT: number = 8080

const app: Express = express()

// Cache middleware
const cacheMiddleware = async (req: Request, res: Response, next: any) => {
  const { username } = req.params

  const numRepos = await getValueFromKey(username).catch(console.log)

  if (!numRepos) return next()

  return res.status(200).send(`<h2>Redis: ${username} has ${numRepos} repositories.</h2>`)
}

app.get("/repos/:username", cacheMiddleware, async (req: Request, res: Response) => {
  console.log("fetching data ...")

  const { username } = req.params

  const response: void | AxiosResponse<any, any> = await get(`https://api.github.com/users/${username}`).catch((err) => console.log(err))

  if (!response) {
    const error: Error = new Error("Impossible to get a valid response from api")
    console.log(error)
    return res.status(500).send(error)
  }

  // console.log(response.data, { username })

  const reposCount: number = response.data.public_repos as unknown as number

  await setKeyValue(username, reposCount).catch(console.log)

  return res.status(200).send(`<h2>Github: ${username} has ${reposCount} repositories.</h2>`)
})

app.listen(API_PORT, () => {
  console.log(`listening on port ${API_PORT}`)
})
