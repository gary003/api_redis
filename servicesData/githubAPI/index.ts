import get, { AxiosResponse } from "axios"

export const getNumReposFromUsername = async (username: string) => {
  const response = await get(`https://api.github.com/users/${username}`)

  console.log("fetching data from github...")

  const numRepos: number = response.data.public_repos as unknown as number

  return numRepos
}
