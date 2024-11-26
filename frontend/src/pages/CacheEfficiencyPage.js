import React, { useState } from 'react';
import axios from 'axios';
import EfficiencyChart from '../components/EfficiencyChart';
import './CacheEfficiencyPage.css';

const CacheEfficiencyPage = () => {
    const [configurations, setConfigurations] = useState([]);
    const [cacheSize, setCacheSize] = useState('');
    const [replacementPolicy, setReplacementPolicy] = useState('');
    const [memoryAddresses, setMemoryAddresses] = useState('');
    const [efficiencyData, setEfficiencyData] = useState([]);

    const addConfiguration = () => {
        if (cacheSize && replacementPolicy) {
            setConfigurations([...configurations, { cacheSize: parseInt(cacheSize, 10), replacementPolicy }]);
            setCacheSize('');
            setReplacementPolicy('');
        }
    };

    const handleAnalyze = () => {
        const memoryAddressArray = memoryAddresses.split(',').map(addr => addr.trim());
        axios.post('http://localhost:3005/api/cache/analyze-efficiency', {
            configurations,
            memoryAddresses: memoryAddressArray,
        })
        .then(response => {
            setEfficiencyData(response.data);
        })
        .catch(error => console.error('Error during efficiency analysis', error));
    };

    return (
        <div className="cache-efficiency-page">
            <h1>Cache Efficiency Analysis</h1>

            <div className="configuration-form">
                <div>
                    <label>Cache Size:</label>
                    <input type="number" value={cacheSize} onChange={(e) => setCacheSize(e.target.value)} />
                </div>
                <div>
                    <label>Replacement Policy:</label>
                    <select value={replacementPolicy} onChange={(e) => setReplacementPolicy(e.target.value)}>
                        <option value="">Select a policy</option>
                        <option value="FIFO">FIFO</option>
                        <option value="LRU">LRU</option>
                    </select>
                </div>
                <button onClick={addConfiguration}>Add Configuration</button>
            </div>

            {/* Display the added configurations */}
            <div className="configurations-list">
                <h3>Added Configurations:</h3>
                {configurations.length > 0 ? (
                    <ul>
                        {configurations.map((config, index) => (
                            <li key={index}>
                                Cache Size: {config.cacheSize}, Policy: {config.replacementPolicy}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No configurations added yet.</p>
                )}
            </div>

            <div className="memory-address-input">
                <label>Memory Addresses (comma-separated):</label>
                <input type="text" value={memoryAddresses} onChange={(e) => setMemoryAddresses(e.target.value)} />
            </div>
            <button onClick={handleAnalyze}>Analyze Efficiency</button>

            {/* Display the chart with efficiency data */}
            <EfficiencyChart efficiencyData={efficiencyData} />
        </div>
    );
};

export default CacheEfficiencyPage;
