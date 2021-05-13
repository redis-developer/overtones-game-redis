# Overtones

[Please click here to test our app](https://www.overtones.io).

## What is Overtones - A short summary

Overtones is an ear training game designed for musician that tests how good your ears are. There are multiple levels, each one getting more difficult as you progress. 

You can climb up the leaderboard and compete with musicians all around the world.

## The idea

We've had the idea for Overtones for a while and have done a few different ideation phases thinking of building for example a pure education app like Duolingo. We've built very, very basic prototypes but have never gotten around to actually releasing something.

The Redis hackathon was a perfect opportunity to give ourselves one month to try and knock out a prototype to test with musicians to see how they like the gamified concept of testing out their knowledge.

## Project stack

- NextJS
- React
- NodeJS
- Redis
- MongoDB
- Vercel

## Redis

We are using redis to populate our leaderboard which indicates how good a user is compared to other users.

However, future plans for the app (if people like it) would be to expand it and generate customised curriculums for players to practise the things they're not good at. 
We did look at using RedisAI to train a model which could do exactly that for us, however, since neither of us have used Redis before we were short on time.

## Architecture

### How to run the project

Copy the `.env.example` file and create a `.env` file in the root directory. You will have to configure the variables according to your environment.

Run `yarn install` to install all necessary dependencies.

#### Docker / Manual

In one terminal, run:
```
docker-compose up
```

This will start a mongodb as well as a redis database.

Then run
```
yarn dev
```

in another terminal window to start the NextJS application.

### Game logic overview

<img width="1352" alt="Screenshot 2021-05-12 at 20 54 01" src="https://user-images.githubusercontent.com/13220692/118036211-34457200-b364-11eb-88dc-c7ae2cc18563.png">
