// src/components/StepForm.js
import React, { useState } from 'react';
import './StepForm.css';

const StepForm = ({ onStart }) => {
  const [cacheSize, setCacheSize] = useState('');
  const [replacementPolicy, setReplacementPolicy] = useState('');
  const [memoryAddresses, setMemoryAddresses] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const memoryAddressArray = memoryAddresses.split(',').map(addr => addr.trim());
    onStart({
      cacheSize: parseInt(cacheSize, 10),
      replacementPolicy,
      memoryAddresses: memoryAddressArray,
    });
  };

  return (
    <form className="step-form" onSubmit={handleSubmit}>
      <div>
        <label>Cache Size:</label>
        <input type="number" value={cacheSize} onChange={(e) => setCacheSize(e.target.value)} required />
      </div>
      <div>
        <label>Replacement Policy:</label>
        <select value={replacementPolicy} onChange={(e) => setReplacementPolicy(e.target.value)} required>
          <option value="">Select a policy</option>
          <option value="FIFO">FIFO</option>
          <option value="LRU">LRU</option>
        </select>
      </div>
      <div>
        <label>Memory Addresses (comma-separated):</label>
        <input type="text" value={memoryAddresses} onChange={(e) => setMemoryAddresses(e.target.value)} required />
      </div>
      <button type="submit">Start Simulation</button>
    </form>
  );
};

export default StepForm;
