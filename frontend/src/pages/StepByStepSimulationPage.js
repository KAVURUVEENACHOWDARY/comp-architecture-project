// src/pages/StepByStepSimulationPage.js
import React, { useState } from 'react';
import StepForm from '../components/StepForm';
import StepControl from '../components/StepControl';
import StepVisualization from '../components/StepVisualization';
import axios from 'axios';
import './StepByStepSimulationPage.css';

const StepByStepSimulationPage = () => {
  const [cacheState, setCacheState] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = (formData) => {
    // Prepare the steps based on the entire memory sequence
    axios.post('http://localhost:3005/api/cache/prepare-steps', formData)
      .then(response => {
        setSteps(response.data.steps);
        setCurrentStep(0);
        setCacheState([]);
        setIsRunning(true);
      })
      .catch(error => console.error('Error during step preparation', error));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      const nextStep = steps[currentStep];
      setCacheState(nextStep.cacheState);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setCacheState([]);
    setIsRunning(false);
  };

  return (
    <div className="step-by-step-page">
      <h1>Step-by-Step Cache Simulation</h1>
      <StepForm onStart={handleStart} />
      <StepControl onNext={handleNextStep} onRestart={handleRestart} isRunning={isRunning} currentStep={currentStep} totalSteps={steps.length} />
      <StepVisualization cacheState={cacheState} currentStep={currentStep} />
    </div>
  );
};

export default StepByStepSimulationPage;
