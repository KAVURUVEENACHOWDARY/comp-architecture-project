const lruPolicy = (cache, cacheSize, address, cacheMap) => {
    if (cache.includes(address)) {
      // Update usage for LRU
      cacheMap.set(address, Date.now());
      return { hit: true };
    } else {
      if (cache.length >= cacheSize) {
        // Find the least recently used element
        let lru = cache[0];
        let lruTime = cacheMap.get(lru);
        for (let addr of cache) {
          if (cacheMap.get(addr) < lruTime) {
            lru = addr;
            lruTime = cacheMap.get(addr);
          }
        }
        // Remove the least recently used element
        cache.splice(cache.indexOf(lru), 1);
        cacheMap.delete(lru);
      }
      // Add the new element
      cache.push(address);
      cacheMap.set(address, Date.now());
      return { hit: false };
    }
  };

module.exports = lruPolicy;