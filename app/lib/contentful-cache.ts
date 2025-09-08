// Simple in-memory cache for Contentful API responses
class ContentfulCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  set(key: string, data: any, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000, // Convert to milliseconds
    });
  }
  
  get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  delete(key: string): void {
    this.cache.delete(key);
  }
  
  // Clear expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

export const contentfulCache = new ContentfulCache();

// Helper function to create cache keys
export function createCacheKey(functionName: string, params?: any): string {
  const baseKey = `contentful:${functionName}`;
  
  if (!params) {
    return baseKey;
  }
  
  // Create a deterministic key from parameters
  const paramString = JSON.stringify(params, Object.keys(params).sort());
  return `${baseKey}:${btoa(paramString)}`;
}

// Wrapper function for cached API calls
export async function withCache<T>(
  cacheKey: string,
  fetchFunction: () => Promise<T>,
  ttlSeconds: number = 300
): Promise<T> {
  // Try to get from cache first
  const cached = contentfulCache.get(cacheKey);
  if (cached !== null) {
    return cached;
  }
  
  // If not in cache, fetch the data
  try {
    const data = await fetchFunction();
    
    // Only cache successful responses
    if (data !== null && data !== undefined) {
      contentfulCache.set(cacheKey, data, ttlSeconds);
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching data for key ${cacheKey}:`, error);
    throw error;
  }
}

// Cleanup expired cache entries every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    contentfulCache.cleanup();
  }, 5 * 60 * 1000);
}