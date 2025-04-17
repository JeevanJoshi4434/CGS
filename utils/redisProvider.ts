import { Redis } from 'ioredis';
import { RedisOptions } from 'ioredis';

class RedisProvider {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisProvider.instance) {
      const connection: RedisOptions = {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 10001,
        maxRetriesPerRequest: null,
        db: 0,
      };
      
      RedisProvider.instance = new Redis(connection);
    }
    return RedisProvider.instance;
  }
}

export default RedisProvider;
