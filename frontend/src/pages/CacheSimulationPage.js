// src/pages/CacheSimulationPage.js
import React, { useState } from 'react';
import CacheForm from '../components/cacheForm';
import CacheVisualization from '../components/cacheVisualization';
import SimulationResults from '../components/simulationResults';
import axios from 'axios';

const CacheSimulationPage = () => {
  const [cacheState, setCacheState] = useState([]);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  const handleSimulation = (formData) => {
    axios.post('http://localhost:3005/api/cache/simulate', formData)
      .then(response => {
        const { hits, misses, finalCacheState } = response.data;
        setHits(hits);
        setMisses(misses);
        setCacheState(finalCacheState);
      })
      .catch(error => console.error('Error during simulation', error));
  };

  return (
    <div className="cache-simulation-page">
      <h1>Cache Simulation</h1>
      <CacheForm onSimulation={handleSimulation} />
      <SimulationResults hits={hits} misses={misses} />
      <CacheVisualization cacheState={cacheState} />
    </div>
  );
};
export default CacheSimulationPage;
