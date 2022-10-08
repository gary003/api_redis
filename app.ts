require("dotenv").config()

import express, { Response, Request, Express } from "express"
import { getNumReposFromUsername } from "./servicesData/githubAPI"
import { setKeyValue } from "./servicesData/redis"

import { cacheMiddleware } from "./middlewares/cache/"

const apiPort: number = Number(process.env.API_PORT) || 8888

const app: Express = express()

app.use("/repos/:username", cacheMiddleware)

app.get("/repos/:username", async (req: Request, res: Response) => {
  const { username } = req.params

  const reposCount = await getNumReposFromUsername(username).catch((err) => err)

  // console.log(reposCount, { username })

  if (reposCount.isAxiosError) {
    const error: Error = new Error("Impossible to found the user")
    return res.status(404).send(error)
  }

  if (!reposCount) {
    const error: Error = new Error("Impossible to get a valid response from api")
    console.log("!!!!" + error)
    return res.status(500).send(error)
  }

  await setKeyValue(username, reposCount).catch(console.log)

  return res.status(200).send(`<h2>Github: ${username} has ${reposCount} repositories.</h2>`)
})

app.listen(apiPort, () => {
  console.log(`listening on port ${apiPort}`)
})
