import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import './LogBookPage.css';
import SectionHeader from '../components/SectionHeader';

function LogBookPage({ onBack }) {
  const [allLogs, setAllLogs] = useState([]);
  const [coffees, setCoffees] = useState([]);
  const [selectedCoffee, setSelectedCoffee] = useState('all');

  useEffect(() => {
    // Fetch coffees for the filter
    axios.get(`${API_BASE_URL}/api/coffees`)
      .then(response => {
        setCoffees(response.data);
      })
      .catch(error => {
        console.error('Error fetching coffees for log book:', error);
      });

    // TODO: Replace with actual API call when implemented
    // For now, using mock data
    setAllLogs([
      {
        id: 1,
        coffeeName: "Ethiopian Yirgacheffe",
        date: '2024-03-15',
        rating: 4.5,
        notes: 'Bright and fruity with hints of berry. Perfect morning brew.',
        recipe: 'V60 - 15g:250g',
        grindSize: '15 (medium-fine)',
        brewTime: '2:45'
      },
      {
        id: 2,
        coffeeName: "Colombian Supremo",
        date: '2024-03-14',
        rating: 3.5,
        notes: 'Slightly under-extracted, increase brew time next time.',
        recipe: 'V60 - 15g:250g',
        grindSize: '16 (medium)',
        brewTime: '2:30'
      },
      // Add more mock entries...
    ]);
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="star">
        {index + 1 <= rating ? '★' : '☆'}
      </span>
    ));
  };

  const filteredLogs = selectedCoffee === 'all' 
    ? allLogs 
    : allLogs.filter(log => log.coffeeName === selectedCoffee);

  return (
    <div className="logbook-page">
      <SectionHeader 
        title="Coffee Brewing Journal"
        subtitle="Track your coffee brewing journey"
        action={
          <button className="back-button" onClick={onBack}>
            <i className="fas fa-arrow-left"></i>
            Back to My Coffee
          </button>
        }
      />

      <div className="logbook-filters">
        <select 
          value={selectedCoffee}
          onChange={(e) => setSelectedCoffee(e.target.value)}
          className="coffee-filter"
        >
          <option value="all">All Coffees</option>
          {coffees.map(coffee => (
            <option key={coffee.name} value={coffee.name}>
              {coffee.name}
            </option>
          ))}
        </select>
      </div>

      <div className="logs-grid">
        {filteredLogs.map(log => (
          <div key={log.id} className="log-card">
            <div className="log-card-header">
              <div className="log-coffee-name">{log.coffeeName}</div>
              <div className="log-date">{log.date}</div>
            </div>
            <div className="log-rating">{renderStars(log.rating)}</div>
            <div className="log-card-details">
              <div className="detail-item">
                <span className="label">Recipe:</span> {log.recipe}
              </div>
              <div className="detail-item">
                <span className="label">Grind:</span> {log.grindSize}
              </div>
              <div className="detail-item">
                <span className="label">Time:</span> {log.brewTime}
              </div>
            </div>
            <div className="log-notes">{log.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogBookPage; 