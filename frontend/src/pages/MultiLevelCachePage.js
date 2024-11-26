import React, { useState } from 'react';
import axios from 'axios';
import './MultiLevelCachePage.css';

const MultiLevelCachePage = () => {
    const [l1CacheSize, setL1CacheSize] = useState('');
    const [l2CacheSize, setL2CacheSize] = useState('');
    const [replacementPolicy, setReplacementPolicy] = useState('');
    const [memoryAddresses, setMemoryAddresses] = useState('');
    const [simulationResult, setSimulationResult] = useState(null);

    const handleSimulate = () => {
        const memoryAddressArray = memoryAddresses.split(',').map(addr => addr.trim());
        axios.post('http://localhost:3005/api/cache/multi-level', {
            l1CacheSize: parseInt(l1CacheSize, 10),
            l2CacheSize: parseInt(l2CacheSize, 10),
            replacementPolicy,
            memoryAddresses: memoryAddressArray,
        })
        .then(response => {
            setSimulationResult(response.data);
        })
        .catch(error => console.error('Error during simulation', error));
    };

    return (
        <div className="multi-level-cache-page">
            <h1>Multi-Level Cache Simulation</h1>
            <div className="cache-form">
                <div>
                    <label>L1 Cache Size:</label>
                    <input type="number" value={l1CacheSize} onChange={(e) => setL1CacheSize(e.target.value)} />
                </div>
                <div>
                    <label>L2 Cache Size:</label>
                    <input type="number" value={l2CacheSize} onChange={(e) => setL2CacheSize(e.target.value)} />
                </div>
                <div>
                    <label>Replacement Policy:</label>
                    <select value={replacementPolicy} onChange={(e) => setReplacementPolicy(e.target.value)}>
                        <option value="">Select a policy</option>
                        <option value="FIFO">FIFO</option>
                        <option value="LRU">LRU</option>
                    </select>
                </div>
                <div>
                    <label>Memory Addresses (comma-separated):</label>
                    <input type="text" value={memoryAddresses} onChange={(e) => setMemoryAddresses(e.target.value)} />
                </div>
                <button onClick={handleSimulate}>Simulate</button>
            </div>

            {simulationResult && (
                <div className="simulation-result">
                    <h3>Simulation Results</h3>
                    <p><strong>L1 Hits:</strong> {simulationResult.l1Hits}</p>
                    <p><strong>L1 Misses:</strong> {simulationResult.l1Misses}</p>
                    <p><strong>L2 Hits:</strong> {simulationResult.l2Hits}</p>
                    <p><strong>L2 Misses:</strong> {simulationResult.l2Misses}</p>
                    <p><strong>Total Hits:</strong> {simulationResult.totalHits}</p>
                    <p><strong>Total Misses:</strong> {simulationResult.totalMisses}</p>
                    <p><strong>L1 Final Cache State:</strong> {simulationResult.l1FinalCacheState.join(', ')}</p>
                    <p><strong>L2 Final Cache State:</strong> {simulationResult.l2FinalCacheState.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default MultiLevelCachePage;