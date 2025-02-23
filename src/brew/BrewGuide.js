import React, { useState, useEffect } from 'react';
import './BrewGuide.css';

function BrewGuide({ recipe, onComplete }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time < recipe.totalTime) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          // Check if we should move to next step
          const nextStep = recipe.steps.findIndex(step => step.time > newTime);
          if (nextStep !== -1 && nextStep !== currentStep) {
            setCurrentStep(nextStep);
          }
          return newTime;
        });
      }, 1000);
    } else if (time >= recipe.totalTime) {
      setIsRunning(false);
      setCompleted(true);
      if (onComplete) onComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, time, recipe, currentStep, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setCurrentStep(0);
    setCompleted(false);
  };

  return (
    <div className="brew-guide">
      <div className="brew-header">
        <h2>{recipe.name} Brewing Guide</h2>
        <div className="recipe-details">
          <div className="detail-item">
            <span className="label">Coffee:</span>
            <span>{recipe.coffee}</span>
          </div>
          <div className="detail-item">
            <span className="label">Grinder:</span>
            <span>{recipe.grinder} - {recipe.grind_size}</span>
          </div>
          <div className="detail-item">
            <span className="label">Ratio:</span>
            <span>1:{Math.round(recipe.water / recipe.coffee_In)}</span>
          </div>
          <div className="detail-item">
            <span className="label">Temperature:</span>
            <span>{recipe.temp}°C</span>
          </div>
        </div>
      </div>

      <div className="timer-section">
        <div className="timer-display">{formatTime(time)}</div>
        <div className="timer-controls">
          {!isRunning && !completed && <button onClick={handleStart}>Start</button>}
          {isRunning && <button onClick={handlePause}>Pause</button>}
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>

      <div className="steps-section">
        {recipe.steps.map((step, index) => (
          <div 
            key={index}
            className={`step-item ${index === currentStep && isRunning ? 'active' : ''} ${time >= step.time ? 'completed' : ''}`}
          >
            <div className="step-time">{formatTime(step.time)}</div>
            <div className="step-content">
              <h4>{step.action}</h4>
              <p>{step.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrewGuide; 