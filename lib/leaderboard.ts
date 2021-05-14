import { redis } from "lib/redis"
import { Leaderboard } from 'redis-rank';

const lb = new Leaderboard(redis, 'lb:alltime', {
    sortPolicy: 'high-to-low',
    updatePolicy: 'replace'
  });

export const leaderboardAllTime = lb;
