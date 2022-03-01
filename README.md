# Kross Finance Coding challenge

Hi, thanks for applying for the Backend node.js developer position at Kross Finance Korea.
This coding challenge is aiming to evaluate a candidate's problem-solving skills in real-world experiences.
The specific tasks are listed in **the Github issue tracker** and you could submit and merge a PR as you might work with the GitHub issue tracker. The tasks include a bug fix and feature request.

#### Before you start

- This `README` file has a basic description of the project. Please read it carefully.
- Look through the tasks and give a quick time estimation for completing the challenge.
- Submit the PR and merge by yourself for each task. Make sure to specify how much time you spent on the task.
- use `yarn` over `npm`

## Installation

1. Make sure you have [**node**](https://nodejs.org/), [**yarn**](https://yarnpkg.com/), [**docker**](https://www.docker.com/products/docker-desktop) installed.
2. install dependencies

```
$ yarn install
```

3. running docker container

```
$ docker-compose up -d
```

4. running DB migration to check database is available

```
$ yarn typeorm migration:run #local
```

5. running test to check everything is fine

```
$ yarn test
```

## Running test

```
$ yarn test
```

or

```
$ yarn test __test__/entities # run single directory
```

## Running locally

```
$ yarn start
```

## DB Migration

1. create new migration

```
yarn typeorm migration:create -n YourMigrationName
```

or you can just modify [entity](https://github.com/crispyan-dev/crispyan-backend/tree/master/src/entities) and generate migration from the modification

```
yarn typeorm migration:generate -n YourMigrationName
```

2. run migration

```
yarn typeorm migration:run
```

3. rollback migration

```
yarn typeorm migration:revert
```

for more information on `typeorm` cli command.

just run

```
yarn typeorm
```

## Project Structure

- `dist/`: wepback bundle file
- `docker/`: docker related file. Currently, it has db init script.
- `src/`: source codes
  - `src/entities`: Entity definations
  - `src/lib`: Shared library files
  - `src/migrations`: DB migration files
  - `src/routes`: [express](https://www.expressjs.com/) routes
  - `src/Api.ts`: API server entry point
- `__test__/`: test scripts
- `READ.md`: this file
- `docker-compose.yml`: docker config for development and test database
- `ormconfig.js`: database connection config
- `package.json`: node dependencies and command scripts
- `tsconfig.json`: typescript compile options
- `eslint.json`: [eslint](https://eslint.org/) config
- `webpack.config.js`: webpack config
- `.env.local`: environment variables to load for `local` NODE_ENV
- `.env.test`: environment variables to load for `test` NODE_ENV
- `babel.config.js`: load babel presets for code transpilation
- `jest.config.js`: test configuration (paths of files to test)
- `nodemon.json`: nodemon setting(run nodemon using ts-node and watch the changes)
