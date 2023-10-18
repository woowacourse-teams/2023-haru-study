class CacheStorage {
  #storage = new Map();

  hasKey = (key: string) => this.#storage.has(key);

  add = <T>(key: string[], data: T, cacheTime = 300000) => {
    if (key.length === 0) return;

    const keyString = key.join(' ');

    this.#storage.set(keyString, data);
    setTimeout(() => {
      this.delete(keyString);
    }, cacheTime);
  };

  delete = (key: string) => this.#storage.delete(key);

  find = <T>(key?: string[]): null | T => {
    if (!key || !this.hasKey(key.join(' '))) return null;
    return this.#storage.get(key.join(' ')) as T;
  };

  isEqualData = (fetchData: unknown, cacheData: unknown) => JSON.stringify(fetchData) === JSON.stringify(cacheData);
}

const cacheStorage = new CacheStorage();

export default cacheStorage;
