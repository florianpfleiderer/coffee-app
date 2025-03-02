import React, { useState } from 'react';
import './App.css';

import CoffeeTable from './my/CoffeeTable';
import Brew from './brew/Brew';
import Explore from './explore/Explore';

function MainPage() {
  const [showTable, setShowTable] = useState(false);
  const [showBrew, setShowBrew] = useState(false);
  const [showExplore, setShowExplore] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
    setShowBrew(false);
    setShowExplore(false);
  }

  const toggleBrew = () => {
    setShowBrew(!showBrew);
    setShowTable(false);
    setShowExplore(false);
  }

  const toggleExplore = () => {
    setShowExplore(!showExplore);
    setShowTable(false);
    setShowBrew(false);
  }

  return (
    <div className="App">
      <header>
        <h1>Great Coffee App</h1>
      </header>
      <main>
        {showTable && <CoffeeTable />}
        {showBrew && <Brew />}
        {showExplore && <Explore />}
      </main>
      <footer>
        <button onClick={toggleExplore}>Explore</button>
        <button onClick={toggleBrew}>Brew</button>
        <button onClick={toggleTable}>My Coffee</button>
      </footer>
    </div>
  );
}

export default MainPage;

