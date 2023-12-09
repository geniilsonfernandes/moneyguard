import dayjs from 'dayjs';

class CacheManager<T> {
  private cacheKeyPrefix: string;
  private expirationKeyPrefix: string;

  constructor() {
    this.cacheKeyPrefix = 'app_cache_';
    this.expirationKeyPrefix = 'app_cache_expiry_';
  }

  // Gera a chave do cache baseada na URL
  private generateCacheKey(url: string): string {
    return `${this.cacheKeyPrefix}${url}`;
  }

  // Salva dados no cache usando sessionStorage
  public setCache(url: string, data: T): void {
    const cacheKey = this.generateCacheKey(url);
    const expirateKey = `${this.expirationKeyPrefix}${url}`;
    const ONE_HOUR_IN_SECONDS = 60 * 60;

    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    sessionStorage.setItem(expirateKey, dayjs().add(ONE_HOUR_IN_SECONDS, 'second').toISOString());
  }

  // Obtém dados do cache usando sessionStorage

  public getCache(url: string): T | null {
    const cacheKey = this.generateCacheKey(url);
    const expirateKey = `${this.expirationKeyPrefix}${url}`;
    const expirationDate = sessionStorage.getItem(expirateKey);

    if (dayjs().isAfter(dayjs(expirationDate))) {
      console.log('CACHE EXPIRED');

      sessionStorage.removeItem(cacheKey);
      sessionStorage.removeItem(expirateKey);
      return null;
    }

    const cachedData = sessionStorage.getItem(cacheKey);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  // Remove um item específico do cache usando sessionStorage
  public invalidateCache(url: string): void {
    const cacheKey = this.generateCacheKey(url);
    sessionStorage.removeItem(cacheKey);
  }

  // Remove todos os itens do cache usando sessionStorage
  public invalidateAllCache(): void {
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(this.cacheKeyPrefix)) {
        sessionStorage.removeItem(key);
      }
    }
  }
}

export default CacheManager;

// // Exemplo de uso:
// const cache = new CacheManager();

// // Salvando dados no cache
// const sampleData = { example: 'data' };
// cache.setCache('https://exemplo.com/api/data', sampleData);

// // Obtendo dados do cache
// const cachedData = cache.getCache('https://exemplo.com/api/data');
// console.log(cachedData);

// // Invalidando o cache para uma URL específica
// cache.invalidateCache('https://exemplo.com/api/data');

// // Invalidando todo o cache
// cache.invalidateAllCache();
