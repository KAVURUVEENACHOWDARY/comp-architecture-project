// src/components/SimulationResults.js
import React from 'react';
import "./simulationResults.css";
const SimulationResults = ({ hits, misses }) => {
    return (
        <div className='simulation-results'>
            <h3>Simulation Results</h3>
            <p>Cache Hits: {hits}</p>
            <p>Cache Misses: {misses}</p>
        </div>
    );
};

export default SimulationResults;
