import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  //get price
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentFarmer, setFarmer] = useState('');

  useEffect(() => {
    fetch('/get_coffee').then(res => res.json()).then(data => {
      setCurrentPrice(data.price);
      setFarmer(data.farmer);
    });
  }, []);

  //adds the option to post something to the api with a button
  const [data, setData] = useState('');

  function sendData() {
  
    fetch('/post_price', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data})
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>The current price is {currentPrice}.</p>
        <p>The current farmer is {currentFarmer}.</p>
        <input value={data} onChange={e => setData(e.target.value)} />
        <button onClick={sendData}>Send Data</button>
      </header>
    </div>
  );
}

export default App;
