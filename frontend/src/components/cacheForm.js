// src/components/CacheForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./cacheForm.css";

const CacheForm = ({ onSimulation }) => {
    const [cacheSize, setCacheSize] = useState('');
    const [replacementPolicy, setReplacementPolicy] = useState('');
    const [memoryAddresses, setMemoryAddresses] = useState('');
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        const policies = [
            { id: 1, name: 'FIFO', description: 'First In, First Out' },
            { id: 2, name: 'LRU', description: 'Least Recently Used' },
        ];
        // Fetch available policies from the backend
        setPolicies(policies);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare data for simulation
        const memoryAddressArray = memoryAddresses.split(',').map(addr => addr.trim());
        const formData = {
            cacheSize: parseInt(cacheSize, 10),
            replacementPolicy,
            memoryAddresses: memoryAddressArray,
        };
        onSimulation(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="cache-form">
            <div>
                <label>Cache Size:</label>
                <input
                    type="number"
                    value={cacheSize}
                    onChange={(e) => setCacheSize(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Replacement Policy:</label>
                <select
                    value={replacementPolicy}
                    onChange={(e) => setReplacementPolicy(e.target.value)}
                    required
                >
                    <option value="">Select a policy</option>
                    {policies.map(policy => (
                        <option key={policy.id} value={policy.name}>
                            {policy.name} - {policy.description}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Memory Addresses (comma-separated):</label>
                <input
                    type="text"
                    value={memoryAddresses}
                    onChange={(e) => setMemoryAddresses(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Simulate</button>
        </form>
    );
};

export default CacheForm;
