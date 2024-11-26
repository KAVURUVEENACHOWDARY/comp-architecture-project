import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './ComparisonVisualization.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ComparisonVisualization = ({ data }) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: data.map((result, index) => `Config ${index + 1}`),
    datasets: [
      {
        label: 'Cache Hits',
        data: data.map(result => result.hits),
        backgroundColor: 'rgba(46, 204, 113, 0.6)',
      },
      {
        label: 'Cache Misses',
        data: data.map(result => result.misses),
        backgroundColor: 'rgba(231, 76, 60, 0.6)',
      },
    ],
  };

  useEffect(() => {
    // Cleanup function to destroy the chart instance before the component is unmounted or re-rendered
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="comparison-visualization">
      <h3>Comparison Visualization</h3>
      <Bar ref={chartRef} data={chartData} />
    </div>
  );
};

export default ComparisonVisualization;
