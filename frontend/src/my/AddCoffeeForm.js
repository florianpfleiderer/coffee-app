import React, { useState } from 'react';
import axios from 'axios';
import './AddCoffeeForm.css'

function AddCoffeeForm(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [farmer, setFarmer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (name === '' || farmer === '' || price === '') {
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
    <div class="form-container">
      <form onSubmit={handleSubmit}>
        <div class="form-row">
          <label>
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </label>
        </div>
        <div class="form-row">
          <label>
            Price:
            <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
          </label>
        </div>
        <div class="form-row">
          <label>
            Farmer:
            <input type="text" value={farmer} onChange={e => setFarmer(e.target.value)} />
          </label>
        </div>
        <button class="submit">Submit</button>
      </form>
    </div>


  );
}

export default AddCoffeeForm;