class CacheStorage {
  private storage = new Map();

  add = <T>(key: string[], data: T, cacheTime = 300000) => {
    if (key.length === 0) return;

    const keyString = key.join(' ');

    this.storage.set(keyString, data);
    setTimeout(() => {
      this.delete(keyString);
    }, cacheTime);
  };

  find = <T>(key?: string[]): null | T => {
    if (!key) return null;

    const keyString = key.join(' ');

    if (!this.hasKey(keyString)) return null;
    return this.storage.get(keyString) as T;
  };

  private hasKey = (key: string) => this.storage.has(key);

  private delete = (key: string) => this.storage.delete(key);
}

const cacheStorage = new CacheStorage();

export default cacheStorage;
