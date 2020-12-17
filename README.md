OwnMusic
[![<OwnMusic>](https://circleci.com/gh/lamnguyencse17/OwnMusic.svg?style=svg)](https://app.circleci.com/pipelines/github/lamnguyencse17/OwnMusic)

Quickstart:

- Install VSCode at: https://code.visualstudio.com/
- Install docker at: https://docs.docker.com/get-docker/
- Install VSCode extension: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
- Open Project
- Choose Reopen in Container
- Run installation: npm i
- Run global installation: npm i -g webpack webpack-cli webpack-dev-server @babel/cli @babel/core @babel/node eslint nodemon tailwindcss
- Run frontend: npm run fe
- Run backend: npm run be
- Run tailwindcss: npm run css:watch

Frontend URL: http://localhost:8080
Backend URL: http://localhost:3000

Auth API: http://localhost:3000/api/auth/(register||login||register/artist||login/artist)
User API: http://localhost:3000/api/user/(artist)
Artust API: http://localhost:3000/api/artist/(suggestions||:artistId)
Music API: http://localhost:3000/api/music/(sugesstions||:musicID)

Alternatives:

- Install MongoDB
- Replicate environment variables in /.devcontainer/Dockerfile
- Run using above scripts

Add artist full info:
{
name,
description,
coverURL,
password,
email
}
