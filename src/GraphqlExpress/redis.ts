import * as Redis from 'ioredis';

export const redis = new Redis({
    showFriendlyErrorStack: (process.env.NODE_ENV !== "production")
});