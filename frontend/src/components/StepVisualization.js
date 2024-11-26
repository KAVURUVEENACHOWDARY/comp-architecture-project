// src/components/StepVisualization.js
import React from 'react';
import './StepVisualization.css';

const StepVisualization = ({ cacheState, currentStep }) => {
  return (
    <div className="step-visualization">
      <h3>Cache State at Step {currentStep}</h3>
      <div className="cache-visualization">
        {cacheState.map((block, index) => (
          <div key={index} className={`cache-block ${block.hit ? 'hit' : ''}`}>
            {block.address}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepVisualization;
