import React, { useState } from 'react';
import axios from 'axios';

function AddCoffeeForm(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [farmer, setFarmer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (name == '' || farmer == '' || price == '') {
        throw new Error("Failed to add Coffee - fill out all boxes.");
      }
      const coffee = { name, price, farmer };
      axios.post('/api/coffees', coffee)
        .then(response => {
          props.onAddCoffee();
        })
        .catch(error => {
          console.error(error);
        });
      setName('');
      setPrice('');
      setFarmer('');
    } catch (error) {
      console.error(error);
      alert("Failed to add Coffee - fill out all boxes.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
      </label>
      <label>
        Farmer:
        <input type="text" value={farmer} onChange={e => setFarmer(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddCoffeeForm;