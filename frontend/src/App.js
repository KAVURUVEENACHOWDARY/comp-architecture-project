// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import CacheForm from './components/CacheForm';
import CacheSimulationPage from './pages/CacheSimulationPage';
import StepByStepSimulationPage from './pages/StepByStepSimulationPage';
import CacheEfficiencyPage from './pages/CacheEfficiencyPage';
import CachePerformancePage from './pages/CachePerformancePage';
import MultiLevelCachePage from './pages/MultiLevelCachePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <nav className="sidebar">
          <h2>Cache Simulator</h2>
          <ul>
            <li>
              <Link to="/cache-simulation">Cache Simulation</Link>
            </li>
            <li>
              <Link to="/cache-performance">Cache Performance Analysis</Link>
            </li>
            <li>
              <Link to="/step-by-step-simulation">Step-by-Step Simulation</Link>
            </li>
            <li>
              <Link to="/cache-efficiency-analysis">Cache Efficiency Analysis</Link>
            </li>
            {/* <li><Link to="/multi-level-cache">Multi-Level Cache Simulation</Link></li> */}
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/cache-simulation" element={<CacheSimulationPage />} />
            <Route path="/cache-performance" element={<CachePerformancePage />} />
            <Route path="/step-by-step-simulation" element={<StepByStepSimulationPage />} />
            <Route path="/cache-efficiency-analysis" element={<CacheEfficiencyPage />} />
            <Route path="/multi-level-cache" element={<MultiLevelCachePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;