# Basic redis use on Docker 2022

## Prerequisites

If you are using github:

- git
- npm
- You'll need to have redis installed on your machine on localhost port 6379 (default for redis)
- Ask for the .env file before launching the app

If you are using docker:

- docker
- Ask for the docker-compose.yml file (docker-compose v2)

## Installation

### If you are using Github:

- Clone the project :
  `git clone https://github.com/gary003/api_redis.git`

- Go into the project directory:
  `cd api_redis`

- Install thee depedences:
  `npm install`

- Copy the .env file you asked
  `cp <pathToFile> .`

- Launch the app:
  `npm run start`

- The app should be running with a log message

### If you are using Docker:

- Create the project directory:
  `mkdir api_redis`

- Go into the project directory:
  `cd api_redis`

- Copy the .docker-compose.yml file you asked
  `cp <pathToFile> .`

- Launch the app:
  `docker-compose up`

- The containers should be running with a log message

## Start

- After installation check the url with a valid github username as a parameter
  `localhost:8080/repos/getify`

## Developer

Gary Johnson <gary.johnson.freelance@gmail.com>

## License

[MIT]
