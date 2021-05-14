# Overtones

Check out the live app at 
[https://www.overtones.io](https://www.overtones.io) 🚀 

## What Is Overtones - a Short Summary

Overtones is an ear training game designed for musician that tests how good your 
ears are. There are multiple levels, each one getting more difficult as you
progress. 

You can climb up the leaderboard and compete with musicians all around the 
world.

## The Idea

We've had the idea for Overtones for a while and have done a few different 
ideation phases thinking of building for example a pure education app like 
Duolingo. We've built very, very basic prototypes but have never gotten around 
to actually releasing something.

The Redis hackathon was a perfect opportunity to give ourselves one month to try
and knock out a prototype to test with musicians to see how they like the 
gamified concept of testing out their knowledge.

## Project Stack

- NextJS
- React
- NodeJS
- Redis
- MongoDB
- Vercel

## Usage of Redis

We are using Redis to populate our leaderboard which indicates how good a user 
is compared to other users. 

Also we are using the RedisJSON module to store the user's study activity, so 
that we can report simple statistics to the player. 

Additionally the study activity data will allow us to perform data analysis as 
well as statistical modeling, e.g. to understand the difficulty of exercises and
suggest personalized exercises to match the learning pace of the player. The 
latter would be done with ML models that we would like to deploy using RedisAI. 
We did look into this part already, but due to the lack of usage data and time 
we did not implement it.

### Redis Commands used

To implement the leaderboard we're using a the library 
[redis-rank](https://github.com/mlomb/redis-rank) which has all the 
functionality we want (and more), and we would like to extend the functionality
of the app with e.g. weekly or regional leaderboards which are implemented in 
this library. 

However, implementing this ourselves is straightforward using a sorted set 
(`ZSET`) with the following commands (and indeed these are the commands used 
under the hood by this library): 

- [`ZADD`](https://redis.io/commands/zadd) to add or replace the highscore of a 
  player
- [`ZSCORE`](https://redis.io/commands/zscore) to retrieve the highscore of a 
   player 
- [`ZREVRANK`](https://redis.io/commands/zrevrank) to retrieve the rank of the 
  player 
- [`ZCARD`](https://redis.io/commands/zcard) to retrieve the total amount of 
  players

To implement the study activity we are using another library called 
[iorejson](https://github.com/evanhuang8/iorejson). We use the following 
commands:

- [`JSON.SET`](https://oss.redislabs.com/redisjson/commands/#jsonset) to create
  an empty array for each user to store their activity data
- [`JSON.ARRAPPEND`](https://oss.redislabs.com/redisjson/commands/#jsonarrappend)
  to insert study activity data each time a user submits an answer
- [`JSON.GET`](https://oss.redislabs.com/redisjson/commands/#jsonget) to 
  retrieve the user's study activity and show some basic usage statistics on the 
  welcome screen of the app

## Design and Architecture 

### Game Logic Overview

<img width="1352" alt="Screenshot 2021-05-12 at 20 54 01" 
src="https://user-images.githubusercontent.com/13220692/118036211-34457200-b364-11eb-88dc-c7ae2cc18563.png">

## Running the app locally

Copy the `.env.example` file and create a `.env` file in the root directory. 
You will have to configure the variables according to your environment.

### Via Docker-Compose

Run `yarn install` to install all necessary dependencies.

In one terminal, run:
```
docker-compose up
```

This will start a Mongodb and Redis.

Then run
```
yarn dev
```

in another terminal window to start the NextJS application.

### As devcontainer in VSCode

If you're using VSCode just open the project with the 
[Remote Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
extention installed. When prompted to open the project in a dev container do so 
(make sure you have Docker running first). Then you can just launch the app 
via the _Run/Debug_ tab.

## Team / Contact

- David Flögel (<https://github.com/davidfloegel>) – Team Lead, Full Stack, UX
- Clemens Westrup (<https://github.com/cle-ment>) – Backend, Machine Learning