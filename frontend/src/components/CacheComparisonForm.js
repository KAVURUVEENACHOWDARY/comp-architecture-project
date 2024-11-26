// src/components/CacheComparisonForm.js
import React, { useState } from 'react';
import './CacheComparisonForm.css';

const CacheComparisonForm = ({ onCompare }) => {
  const [configurations, setConfigurations] = useState([]);
  const [currentConfig, setCurrentConfig] = useState({
    cacheSize: '',
    replacementPolicy: '',
  });
  const [memoryAddresses, setMemoryAddresses] = useState('');

  const addConfiguration = () => {
    setConfigurations([...configurations, currentConfig]);
    setCurrentConfig({ cacheSize: '', replacementPolicy: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const memoryAddressArray = memoryAddresses.split(',').map(addr => addr.trim());
    onCompare({ configurations, memoryAddresses: memoryAddressArray });
  };

  return (
    <form className="cache-comparison-form" onSubmit={handleSubmit}>
      <div>
        <label>Cache Size:</label>
        <input
          type="number"
          value={currentConfig.cacheSize}
          onChange={(e) => setCurrentConfig({ ...currentConfig, cacheSize: e.target.value })}
        />
      </div>
      <div>
        <label>Replacement Policy:</label>
        <select
          value={currentConfig.replacementPolicy}
          onChange={(e) => setCurrentConfig({ ...currentConfig, replacementPolicy: e.target.value })}
        >
          <option value="">Select a policy</option>
          <option value="FIFO">FIFO</option>
          <option value="LRU">LRU</option>
        </select>
      </div>
      <button type="button" onClick={addConfiguration}>Add Configuration</button>

      <div>
        <label>Memory Addresses (comma-separated):</label>
        <input
          type="text"
          value={memoryAddresses}
          onChange={(e) => setMemoryAddresses(e.target.value)}
        />
      </div>
      <button type="submit">Compare</button>

      <h3>Configurations:</h3>
      <ul>
        {configurations.map((config, index) => (
          <li key={index}>
            Cache Size: {config.cacheSize}, Policy: {config.replacementPolicy}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default CacheComparisonForm;
