import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export async function cacheGet<T>(key: string): Promise<T | null> {
  return redis.get<T>(key);
}

export async function cacheSet(key: string, value: unknown, exSeconds = 300) {
  return redis.setex(key, exSeconds, JSON.stringify(value));
}

export async function cacheDel(key: string) {
  return redis.del(key);
}