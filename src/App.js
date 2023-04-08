import React, { useState } from 'react';
import './App.css';

import CoffeeTable from './CoffeeTable';

function MainPage() {

  const [showTable, setShowTable] = useState(false);

  const toggleTable = () => {
    setShowTable(!showTable);
  }

  return (
    <div className="App">
      <header>
        <h1>Great Coffee App</h1>
      </header>
      <main>
        {showTable && <CoffeeTable />}
      </main>
      <footer>
        <button>Explore</button>
        <button>Brew</button>
        <button onClick={toggleTable}>My Coffee</button>
      </footer>
    </div>
  );
};

export default MainPage;

