// src/pages/CachePerformancePage.js
import React, { useState } from 'react';
import CacheComparisonForm from '../components/CacheComparisonForm';
import PerformanceResults from '../components/PerformanceResults';
import ComparisonVisualization from '../components/ComparisonVisualization';
import axios from 'axios';
import './CachePerformancePage.css';

const CachePerformancePage = () => {
  const [performanceData, setPerformanceData] = useState([]);

  const handleComparison = (configurations) => {
    console.log('Configurations:', configurations);
    axios.post('http://localhost:3005/api/cache/compare',  configurations)
      .then(response => {
        setPerformanceData(response.data);
      })
      .catch(error => console.error('Error during performance comparison', error));
  };

  return (
    <div className="cache-performance-page">
      <h1>Cache Performance Analysis</h1>
      <CacheComparisonForm onCompare={handleComparison} />
      {performanceData.length > 0 && (
        <>
          <PerformanceResults data={performanceData} />
          <ComparisonVisualization data={performanceData} />
        </>
      )}
    </div>
  );
};

export default CachePerformancePage;
