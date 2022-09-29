require("dotenv").config()
import { createClient } from "redis"

export const connectToRedis = () => {
  const REDIS_HOST: string = process.env.REDIS_HOST || "127.0.0.1"
  const REDIS_PORT: number = Number(process.env.REDIS_PORT) || 6379

  console.log(process.env.REDIS_HOST, REDIS_HOST, REDIS_PORT)

  const client = createClient({
    socket: {
      host: REDIS_HOST,
      port: REDIS_PORT
    }
    // password: '<password>'
  })

  return client
}

export const getValueFromKey = async (key: string): Promise<number> => {
  const client = connectToRedis()

  await client.connect()

  const numRepo: number = (await client.get(key).catch((err) => console.log(err))) as unknown as number

  // console.log({ numRepo, key })

  await client.disconnect()

  return numRepo as number
}

export const setKeyValue = async (key: string, value: number) => {
  const client = connectToRedis()

  await client.connect()

  await client.set(key, value)

  await client.disconnect()
}
