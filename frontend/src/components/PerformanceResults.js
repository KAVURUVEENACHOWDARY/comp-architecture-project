// src/components/PerformanceResults.js
import React from 'react';
import './PerformanceResults.css';

const PerformanceResults = ({ data }) => {
  return (
    <div className="performance-results">
      <h3>Performance Results</h3>
      <table>
        <thead>
          <tr>
            <th>Configuration</th>
            <th>Cache Hits</th>
            <th>Cache Misses</th>
          </tr>
        </thead>
        <tbody>
          {data.map((result, index) => (
            <tr key={index}>
              <td>{result.configuration}</td>
              <td>{result.hits}</td>
              <td>{result.misses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceResults;
