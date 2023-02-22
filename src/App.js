import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';


function MainPage() {
    //get price
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentFarmer, setFarmer] = useState('');
    const [data, setData] = useState('');
    // const [data1, setData1] = useState('');

    function postPrice() {
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
    };

    async function handleLeftButtonClick() {
      const response = await fetch('/get_coffee');
      const data = await response.json();
      const newWindow = window.open('');
      newWindow.document.write(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
      newWindow.document.write(`
        <div>
          <button onclick="window.close()">Go back to main page</button>
        </div>
      `); 
    
    };

  // middle button displays price and farmer
  function handleMiddleButtonClick() {
    fetch('/get_coffee').then(res => res.json()).then(data => {
      setCurrentPrice(data.coffee1.price);
      setFarmer(data.coffee1.farmer);
    });
  };

  // write button is for writing data
  function handleRightButtonClick() {
    postPrice();
  };

  return (
    <div>
      <p>The current price is {currentPrice}.</p>
      <p>The current farmer is {currentFarmer}.</p>
      <p><input value={data} onChange={e => setData(e.target.value)} /></p>
      
      <button onClick={handleLeftButtonClick}>MY COFFEES</button>
      <button onClick={handleMiddleButtonClick}>Daten aktualisieren</button>
      <button onClick={handleRightButtonClick}>POST</button>
    </div>
  );
}

export default MainPage;

/*
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
*/