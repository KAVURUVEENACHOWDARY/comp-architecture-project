// // Cache replacement policies
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

const lruPolicy = (cache, cacheSize, address, cacheMap, counter) => {
    if (cache.includes(address)) {
        // Update usage for LRU
        counter.value++;
        cacheMap.set(address, counter.value);
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
        counter.value++;
        cache.push(address);
        cacheMap.set(address, counter.value);
        return { hit: false };
    }
};




// Single cache simulation
const simulateCache = (req, res) => {
    console.log(req?.body);
    let { cacheSize, replacementPolicy, memoryAddresses } = req.body;

    if (!cacheSize || !replacementPolicy || !memoryAddresses) {
        return res.status(400).json({ error: 'Invalid input parameters' });
    }

    // Convert memory addresses to integers (if they are strings)
    memoryAddresses = memoryAddresses.map(addr => parseInt(addr, 10));

    // Initialize cache and a usage map for LRU
    let cache = [];
    let hits = 0;
    let misses = 0;
    let cacheMap = new Map(); // Only used for LRU
    let counter = { value: 0 }; // Initialize counter as an object

    // Simulate cache behavior based on the selected policy
    memoryAddresses.forEach((address) => {
        let result;
        switch (replacementPolicy.toLowerCase()) {
            case 'fifo':
                result = fifoPolicy(cache, cacheSize, address);
                break;
            case 'lru':
                result = lruPolicy(cache, cacheSize, address, cacheMap, counter);
                break;
            default:
                return res.status(400).json({ error: 'Unsupported replacement policy' });
        }

        if (result.hit) {
            hits++;
        } else {
            misses++;
        }
    });

    res.json({
        hits,
        misses,
        finalCacheState: cache
    });
};

// Compare multiple cache configurations
const compareCacheConfigurations = (req, res) => {
    console.log(req?.body);
    const { configurations, memoryAddresses } = req.body;

    if (!configurations || !Array.isArray(configurations) || !memoryAddresses) {
        return res.status(400).json({ error: 'Invalid input parameters' });
    }

    // Convert memory addresses to integers (if they are strings)
    const memAddresses = memoryAddresses.map(addr => parseInt(addr, 10));

    const results = configurations.map((config, index) => {
        const { replacementPolicy } = config;
        const cacheSize = parseInt(config.cacheSize, 10);

        let cache = [];
        let hits = 0;
        let misses = 0;
        let cacheMap = new Map(); // Only used for LRU
        let counter = { value: 0 }; // Initialize counter as an object

        memAddresses.forEach((address) => {
            let result;
            switch (replacementPolicy.toLowerCase()) {
                case 'fifo':
                    result = fifoPolicy(cache, cacheSize, address);
                    break;
                case 'lru':
                    result = lruPolicy(cache, cacheSize, address, cacheMap, counter);
                    break;
                default:
                    return res.status(400).json({ error: 'Unsupported replacement policy' });
            }

            if (result.hit) {
                hits++;
            } else {
                misses++;
            }
        });

        return {
            configuration: `Cache Size: ${cacheSize}, Policy: ${replacementPolicy}`,
            hits,
            misses,
        };
    });

    res.json(results);
};


const prepareSteps = (req, res) => {
    const { cacheSize, replacementPolicy, memoryAddresses } = req.body;

    console.log(req?.body);

    if (!cacheSize || !replacementPolicy || !memoryAddresses) {
        return res.status(400).json({ error: 'Invalid input parameters' });
    }

    let cache = [];
    let steps = [];
    let cacheMap = new Map(); // Used for LRU
    let counter = 0; // Counter for tracking LRU usage

    memoryAddresses.forEach((address, index) => {
        let hit = false;

        switch (replacementPolicy.toLowerCase()) {
            case 'fifo':
                if (cache.includes(address)) {
                    hit = true;
                } else {
                    if (cache.length >= cacheSize) {
                        cache.shift(); // Remove the oldest element
                    }
                    cache.push(address);
                }
                break;

            case 'lru':
                if (cache.includes(address)) {
                    hit = true;
                    // Update usage for LRU policy
                    cacheMap.set(address, counter++);
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
                    // Add the new element and update usage
                    cache.push(address);
                    cacheMap.set(address, counter++);
                }
                break;

            default:
                return res.status(400).json({ error: 'Unsupported replacement policy' });
        }

        // Prepare the cache state with both the address and whether it was a hit
        let cacheStateWithHitInfo = cache.map((addr) => ({
            address: addr,
            hit: hit && addr === address, // Mark hit only for the current address if it was a hit
        }));

        // Add the current step information
        steps.push({
            step: index + 1,
            address,
            hit,
            cacheState: cacheStateWithHitInfo,
        });
    });

    res.json({ steps });
};

const analyzeCacheEfficiency = (req, res) => {
    const { configurations, memoryAddresses } = req.body;

    if (!configurations || !memoryAddresses || memoryAddresses.length === 0) {
        return res.status(400).json({ error: 'Invalid input parameters' });
    }

    let efficiencyResults = [];

    configurations.forEach((config) => {
        const { cacheSize, replacementPolicy } = config;

        let cache = [];
        let hits = 0;
        let misses = 0;
        let cacheMap = new Map(); // Only used for LRU
        let efficiencyOverTime = [];

        memoryAddresses.forEach((address, index) => {
            let hit = false;

            switch (replacementPolicy.toLowerCase()) {
                case 'fifo':
                    if (cache.includes(address)) {
                        hit = true;
                    } else {
                        if (cache.length >= cacheSize) {
                            cache.shift();
                        }
                        cache.push(address);
                    }
                    break;

                case 'lru':
                    if (cache.includes(address)) {
                        hit = true;
                        cacheMap.set(address, Date.now());
                    } else {
                        if (cache.length >= cacheSize) {
                            let lru = cache[0];
                            let lruTime = cacheMap.get(lru);
                            for (let addr of cache) {
                                if (cacheMap.get(addr) < lruTime) {
                                    lru = addr;
                                    lruTime = cacheMap.get(addr);
                                }
                            }
                            cache.splice(cache.indexOf(lru), 1);
                            cacheMap.delete(lru);
                        }
                        cache.push(address);
                        cacheMap.set(address, Date.now());
                    }
                    break;

                default:
                    return res.status(400).json({ error: 'Unsupported replacement policy' });
            }

            if (hit) {
                hits++;
            } else {
                misses++;
            }

            // Calculate the hit ratio and miss ratio
            const hitRatio = hits / (index + 1);
            const missRatio = misses / (index + 1);

            efficiencyOverTime.push({
                step: index + 1,
                hitRatio,
                missRatio,
            });
        });

        efficiencyResults.push({
            configuration: `Cache Size: ${cacheSize}, Policy: ${replacementPolicy}`,
            efficiencyOverTime,
        });
    });

    res.json(efficiencyResults);
};


const simulateCacheHierarchy = (req, res) => {
    const { l1CacheSize, l2CacheSize, replacementPolicy, memoryAddresses } = req.body;

    if (!l1CacheSize || !l2CacheSize || !replacementPolicy || !memoryAddresses) {
        return res.status(400).json({ error: 'Invalid input parameters' });
    }

    let l1Cache = [];
    let l2Cache = [];
    let hits = 0;
    let misses = 0;
    let l1Hits = 0;
    let l2Hits = 0;
    let l1Misses = 0;
    let l2Misses = 0;

    memoryAddresses.forEach((address) => {
        address = parseInt(address, 10);
        let hit = false;

        // L1 Cache Check
        if (l1Cache.includes(address)) {
            l1Hits++;
            hits++;
            hit = true;
        } else {
            // L2 Cache Check
            if (l2Cache.includes(address)) {
                l2Hits++;
                hits++;
                hit = true;
                
                // Promote to L1 Cache (do not count as L1 miss since it's a hit from L2)
                if (l1Cache.length >= l1CacheSize) {
                    l1Cache.shift(); // Remove the oldest element from L1
                }
                l1Cache.push(address);
            } else {
                // If not in L1 or L2, it's a miss
                l1Misses++; // Count as an L1 miss only if it's not found in either cache
                l2Misses++;
                misses++;

                // Add to L1 and L2 Cache
                if (l1Cache.length >= l1CacheSize) {
                    l1Cache.shift(); // Remove the oldest element from L1
                }
                l1Cache.push(address);

                if (l2Cache.length >= l2CacheSize) {
                    l2Cache.shift(); // Remove the oldest element from L2
                }
                l2Cache.push(address);
            }
        }
    });

    res.json({
        l1Hits,
        l1Misses,
        l2Hits,
        l2Misses,
        totalHits: hits,
        totalMisses: misses,
        l1FinalCacheState: l1Cache,
        l2FinalCacheState: l2Cache
    });
};




module.exports = {
    simulateCache,
    compareCacheConfigurations,
    prepareSteps,
    analyzeCacheEfficiency,
    simulateCacheHierarchy
};
