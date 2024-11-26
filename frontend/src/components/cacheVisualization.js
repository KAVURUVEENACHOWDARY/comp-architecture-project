// src/components/CacheVisualization.js
import React from 'react';
import "./cacheVisualization.css";
const CacheVisualization = ({ cacheState }) => {
    return (
        <div className="cache-visualization">
            <h3>Cache State</h3>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                {cacheState.map((block, index) => (
                    <div key={index} style={{ padding: '10px', border: '1px solid black' }}>
                        {block}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CacheVisualization;
