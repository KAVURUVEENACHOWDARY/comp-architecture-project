const fifoPolicy = (cache, cacheSize, address) => {
    if (cache.includes(address)) {
      return { hit: true };
    } else {
      if (cache.length >= cacheSize) {
        // Remove the oldest element (FIFO)
        cache.shift();
      }
      cache.push(address);
      return { hit: false };
    }
  };

module.exports = fifoPolicy;