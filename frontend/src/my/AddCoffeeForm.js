import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import './AddCoffeeForm.css'

function AddCoffeeForm(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [farmer, setFarmer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      if (name === '' || farmer === '' || price === '') {
        setErrorMessage("Please fill out all required fields");
        setIsSubmitting(false);
        throw new Error("Failed to add Coffee - fill out all boxes.");
      }
      
      const coffee = { name, price, farmer };
      console.log(`Sending POST request to: ${API_BASE_URL}/api/coffees`);
      console.log('Coffee data:', coffee);
      
      axios.post(`${API_BASE_URL}/api/coffees`, coffee)
        .then(response => {
          console.log('Coffee added successfully:', response.data);
          setIsSubmitting(false);
          setName('');
          setPrice('');
          setFarmer('');
          
          if (props.onAddCoffee) {
            props.onAddCoffee();
          } else {
            console.warn('onAddCoffee callback is not defined');
          }
        })
        .catch(error => {
          setIsSubmitting(false);
          console.error('Error adding coffee:', error);
          
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            setErrorMessage(`Server error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            setErrorMessage('Network error: No response from server. Check your connection and API URL.');
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            setErrorMessage(`Error: ${error.message}`);
          }
          
          alert(`Failed to add coffee: ${errorMessage || 'Check console for details'}`);
        });
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      setErrorMessage(error.message);
      alert(`Failed to add coffee: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        <div className="form-row">
          <label>
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Price:
            <input type="text" value={price} onChange={e => setPrice(e.target.value)} />
          </label>
        </div>
        <div className="form-row">
          <label>
            Farmer:
            <input type="text" value={farmer} onChange={e => setFarmer(e.target.value)} />
          </label>
        </div>
        <button className="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default AddCoffeeForm;