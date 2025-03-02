import React, { useState, useEffect } from 'react';
import CoffeeNews from './CoffeeNews';
import CoffeeVarieties from './CoffeeVarieties';
import CoffeeMap from './CoffeeMap';
import './Explore.css';

function Explore() {
  const [activeTab, setActiveTab] = useState('news');

  return (
    <div className="explore-container">
      <div className="explore-tabs">
        <button 
          className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          Coffee News
        </button>
        <button 
          className={`tab-button ${activeTab === 'varieties' ? 'active' : ''}`}
          onClick={() => setActiveTab('varieties')}
        >
          Coffee Varieties
        </button>
        <button 
          className={`tab-button ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          Origin Map
        </button>
      </div>
      
      <div className="explore-content">
        {activeTab === 'news' && <CoffeeNews />}
        {activeTab === 'varieties' && <CoffeeVarieties />}
        {activeTab === 'map' && <CoffeeMap />}
      </div>
    </div>
  );
}

export default Explore; 