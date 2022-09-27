import express, { Response, Request, Express } from "express"
import get, { AxiosResponse } from "axios"
import { createClient } from "redis"

const API_PORT: number = 8080
// const REDIS_PORT = 6379

const client = createClient()

const app: Express = express()

// Cache middleware
const cacheMiddleware = async (req: Request, res: Response, next: any) => {
  await client.connect()

  const { username } = req.params

  const numRepo: number = (await client.get(username).catch((err) => console.log(err))) as unknown as number

  // console.log({ numRepo, username })

  await client.disconnect()

  if (!numRepo) return next()

  return res.status(200).send(`<h2>Redis: ${username} has ${numRepo} repositories.</h2>`)
}

app.get("/repos/:username", cacheMiddleware, async (req: Request, res: Response) => {
  console.log("fetching data ...")

  await client.connect()

  const { username } = req.params

  const response: void | AxiosResponse<any, any> = await get(`https://api.github.com/users/${username}`).catch((err) => console.log(err))

  if (!response) {
    const error: Error = new Error("Impossible to get a valid response from api")
    console.log(error)
    return res.status(500).send(error)
  }

  console.log(response.data, { username })

  const reposCount: number = response.data.public_repos as unknown as number

  await client.set(username, reposCount)

  await client.disconnect()

  return res.status(200).send(`<h2>Github: ${username} has ${reposCount} repositories.</h2>`)
})

app.listen(API_PORT, () => {
  console.log(`listening on port ${API_PORT}`)
})
