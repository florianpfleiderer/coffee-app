import React, { useState } from 'react';
import './App.css';


function MainPage() {
  //get price
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentFarmer, setFarmer] = useState('');
  const [data, setData] = useState('');

  const coffees = [
    { name: 'Coffee 1', price: 2.50, farmer: 'Farmer 1' },
    { name: 'Coffee 2', price: 3.00, farmer: 'Farmer 2' },
    { name: 'Coffee 3', price: 2.75, farmer: 'Farmer 3' },
  ];

  const [showTable, setShowTable] = useState(false);
  const [coffeeName, setCoffeeName] = useState('');
  const [coffeePrice, setCoffeePrice] = useState('');
  const [coffeeFarmer, setCoffeeFarmer] = useState('');

  const toggleTable = () => {
    setShowTable(!showTable);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCoffee = { name: coffeeName, price: coffeePrice, farmer: coffeeFarmer };
    const response = await fetch('/api/coffees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCoffee)
    });
    if (response.ok) {
      setCoffeeName('');
      setCoffeePrice('');
      setCoffeeFarmer('');
      setShowTable(true);
    } else {
      // handle error
    }
  }

  // function postPrice() {
  //   fetch('/post_price', {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ data })
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error(error));
  // };

  // async function handleLeftButtonClick() {
  //   const response = await fetch('/get_coffee');
  //   const data = await response.json();
  //   const newWindow = window.open('');
  //   newWindow.document.write(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
  //   newWindow.document.write(`
  //       <div>
  //         <button onclick="window.close()">Go back to main page</button>
  //       </div>
  //     `);

  // };

  // // middle button displays price and farmer
  // function handleMiddleButtonClick() {
  //   fetch('/get_coffee').then(res => res.json()).then(data => {
  //     setCurrentPrice(data.coffee1.price);
  //     setFarmer(data.coffee1.farmer);
  //   });
  // };

  // // write button is for writing data
  // function handleRightButtonClick() {
  //   postPrice();
  // };

  return (
    <div className="App">
      <header>
        <h1>Great Coffee App</h1>
      </header>
      <main>
        {showTable && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Farmer</th>
              </tr>
            </thead>
            <tbody>
              {coffees.map((coffee, index) => (
                <tr key={index}>
                  <td>{coffee.name}</td>
                  <td>{coffee.price}</td>
                  <td>{coffee.farmer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={coffeeName} onChange={(event) => setCoffeeName(event.target.value)} />
          </label>
          <label>
            Price:
            <input type="text" value={coffeePrice} onChange={(event) => setCoffeePrice(event.target.value)} />
          </label>
          <label>
            Farmer:
            <input type="text" value={coffeeFarmer} onChange={(event) => setCoffeeFarmer(event.target.value)} />
          </label>
          <button type="submit">Add Coffee</button>
        </form>
      </main>
      <footer>
        <button>Explore</button>
        <button>Brew</button>
        <button onClick={toggleTable}>My Coffee</button>
      </footer>
    </div>
    // <div className="phone">
    //   <div className="screen">
    //     {/* Add your app's content here */}
    //     <p>The current price is {currentPrice}.</p>
    //     <p>The current farmer is {currentFarmer}.</p>
    //     <p><input value={data} onChange={e => setData(e.target.value)} /></p>
    //   </div>
    //   <div className="buttons">
    //     <button onClick={handleLeftButtonClick}>MY COFFEES</button>
    //     <button onClick={handleMiddleButtonClick}>Daten aktualisieren</button>
    //     <button onClick={handleRightButtonClick}>POST</button>
    //   </div>
    // </div>
  );
}

export default MainPage;

