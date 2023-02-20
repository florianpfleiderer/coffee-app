import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    fetch('/get_price').then(res => res.json()).then(data => {
      setCurrentPrice(data.price);
    });
  }, []);
  
  //adds the option to post something to the api with a button
  const [data, setData] = useState('');

  const sendData = () => {
    fetch('/post_price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data})
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }

  //get farmer name
  const [data1, setData1] = useState('');

  useEffect(() => {
    fetch('/get_farmer').then(res => res.json()).then(data => {
      setData1(data.farmer);
    });
  }, []);

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
        <input value={data} onChange={e => setData(e.target.value)} />
        <button onClick={sendData}>Send Data</button>
        <p>The current farmer is {data1}.</p>
      </header>
    </div>
  );
}

export default App;
