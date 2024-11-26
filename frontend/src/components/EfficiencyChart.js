// src/components/EfficiencyChart.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './EfficiencyChart.css';

// Register the components that are needed
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EfficiencyChart = ({ efficiencyData }) => {
    const chartData = {
        labels: efficiencyData.length > 0 ? efficiencyData[0].efficiencyOverTime.map(step => step.step) : [],
        datasets: efficiencyData.map((config, index) => ({
            label: config.configuration,
            data: config.efficiencyOverTime.map(step => step.hitRatio),
            fill: false,
            borderColor: `rgba(${(index * 50) % 255}, ${(index * 80) % 255}, ${(index * 110) % 255}, 1)`,
        })),
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Cache Hit Ratio Over Time',
            },
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Step',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Hit Ratio',
                },
                min: 0,
                max: 1,
            },
        },
    };

    return (
        <div className="efficiency-chart">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default EfficiencyChart;
