import React, { useState } from 'react';
import './LogBook.css';

function LogBook({ coffee }) {
  const [logs, setLogs] = useState([
    {
      id: 1,
      date: '2024-03-15',
      rating: 4.5,
      notes: 'Bright and fruity with hints of berry. Perfect morning brew.',
      recipe: 'V60 - 15g:250g',
      grindSize: '15 (medium-fine)',
      brewTime: '2:45'
    },
    {
      id: 2,
      date: '2024-03-14',
      rating: 3.5,
      notes: 'Slightly under-extracted, increase brew time next time.',
      recipe: 'V60 - 15g:250g',
      grindSize: '16 (medium)',
      brewTime: '2:30'
    },
    {
      id: 3,
      date: '2024-03-12',
      rating: 5,
      notes: 'Perfect balance! Sweet with chocolate notes.',
      recipe: 'AeroPress - 18g:200g',
      grindSize: '12 (fine)',
      brewTime: '1:30'
    }
  ]);

  const [showAddLog, setShowAddLog] = useState(false);
  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split('T')[0],
    rating: 4,
    notes: '',
    recipe: '',
    grindSize: '',
    brewTime: ''
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="star">
        {index + 1 <= rating ? '★' : '☆'}
      </span>
    ));
  };

  const handleAddLog = () => {
    setLogs([
      {
        id: Date.now(),
        ...newLog
      },
      ...logs
    ]);
    setShowAddLog(false);
    setNewLog({
      date: new Date().toISOString().split('T')[0],
      rating: 4,
      notes: '',
      recipe: '',
      grindSize: '',
      brewTime: ''
    });
  };

  return (
    <div className="logbook">
      <div className="logbook-header">
        <h3>Brewing Log - {coffee.name}</h3>
        <button 
          className="primary-button"
          onClick={() => setShowAddLog(!showAddLog)}
        >
          <i className="fas fa-plus"></i>
          Add Entry
        </button>
      </div>

      {showAddLog && (
        <div className="add-log-form">
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={newLog.date}
                onChange={(e) => setNewLog({...newLog, date: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.5"
                value={newLog.rating}
                onChange={(e) => setNewLog({...newLog, rating: e.target.value})}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Recipe</label>
              <input
                type="text"
                value={newLog.recipe}
                onChange={(e) => setNewLog({...newLog, recipe: e.target.value})}
                placeholder="e.g., V60 - 15g:250g"
              />
            </div>
            <div className="form-group">
              <label>Grind Size</label>
              <input
                type="text"
                value={newLog.grindSize}
                onChange={(e) => setNewLog({...newLog, grindSize: e.target.value})}
                placeholder="e.g., 15 (medium-fine)"
              />
            </div>
            <div className="form-group">
              <label>Brew Time</label>
              <input
                type="text"
                value={newLog.brewTime}
                onChange={(e) => setNewLog({...newLog, brewTime: e.target.value})}
                placeholder="e.g., 2:45"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={newLog.notes}
              onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
              placeholder="How did it taste? What would you change?"
            />
          </div>
          <div className="form-actions">
            <button className="primary-button" onClick={handleAddLog}>Save Entry</button>
            <button className="back-button" onClick={() => setShowAddLog(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="logs-list">
        {logs.map(log => (
          <div key={log.id} className="log-entry">
            <div className="log-header">
              <div className="log-date">{log.date}</div>
              <div className="log-rating">{renderStars(log.rating)}</div>
            </div>
            <div className="log-details">
              <div className="log-recipe">
                <span className="label">Recipe:</span> {log.recipe}
              </div>
              <div className="log-grind">
                <span className="label">Grind:</span> {log.grindSize}
              </div>
              <div className="log-time">
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

export default LogBook; 