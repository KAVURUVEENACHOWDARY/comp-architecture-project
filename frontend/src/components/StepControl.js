// src/components/StepControl.js
import React from 'react';
import './StepControl.css';

const StepControl = ({ onNext, onRestart, isRunning, currentStep, totalSteps }) => {
  return (
    <div className="step-control">
      <button onClick={onNext} disabled={!isRunning || currentStep >= totalSteps}>Next Step</button>
      <button onClick={onRestart}>Restart</button>
      <p>Step {currentStep} of {totalSteps}</p>
    </div>
  );
};

export default StepControl;
