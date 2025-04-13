import { Redis } from "ioredis";
import RedisProvider from "../utils/redisProvider";

class MemoryCache {
    private static redis: Redis;
        
    constructor() {
        if (!MemoryCache.redis) {
            MemoryCache.redis = RedisProvider.getInstance();
        }
    }

    /**
     * 
     * @param key Key to get
     * @returns Promise<object | null> 
     */
    protected async get(key: string): Promise<object | null> {
        try {
            const result = await Promise.resolve(MemoryCache.redis.get(key));
            return result ? JSON.parse(result) : null;
        } catch (err) {
            console.warn(`Failed to get or parse Redis key: ${key}`);
            return null;
        }
    }
    
    /**
     * 
     * @param key Key to set
     * @param value Value to set
     * @returns Promise<boolean>
     */
    protected async set(key: string, value: Object): Promise<boolean> {
       try {
        
           const result = await Promise.resolve(MemoryCache.redis.set(key, JSON.stringify(value)));
           return result === "OK" ? true : false;
        } catch (error) {
            return false;
        }   
    }

    /**
     * 
     * @param key The key to delete
     * @returns Promise<number>
     */
    protected del(key: string): Promise<number> {
        return MemoryCache.redis.del(key);
    }

    /**
     * 
     * @param key The key to set
     * @param value The value to set
     * @param time The time to set in seconds
     * @returns Promise<boolean>
     */
    protected async setWithTime(key: string, value: Object, time: number): Promise<boolean> {
        try {
            const result = await Promise.resolve(MemoryCache.redis.set(key, JSON.stringify(value), "EX", time));
            return result === "OK" ? true : false;
        } catch (error) {
            return false;
        }
    }
}

export default MemoryCache;