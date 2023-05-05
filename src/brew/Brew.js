import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';


function Brew() {
    const [inventoryGrinders, setInventoryGrinders] = useState([]);
    const [inventoryCoffees, setInventoryCoffees] = useState([]);
    const [selectedGrinder, setSelectedGrinder] = useState(null);
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [showGrinderSelection, setshowGrinderSelection] = useState(true);
    const [showCoffeSelection, setshowCoffeSelection] = useState(false);
    const [showBrewGuide, setshowBrewGuide] = useState(false);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [maxTime, setMaxTime] = useState(210); // Default max time of 3 minutes 30seconds
    const [isTimeUp, setIsTimeUp] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    

    useEffect(() => {
        axios.get('/api/grinders')
            .then(response => {
                setInventoryGrinders(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios.get('/api/coffees')
            .then(response => {
                setInventoryCoffees(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        let interval;
    
        if (isRunning) {
          interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
          }, 1000);
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [isRunning]);

    const handleGrinderRowClick = (grinder) => {
        setSelectedGrinder(grinder);
        setshowGrinderSelection(false);
        setshowCoffeSelection(true);
    }

    const handleCoffeeRowClick = (coffee) => {
        setSelectedCoffee(coffee);
        setshowCoffeSelection(false);
        setshowBrewGuide(true);
    }

    const handleBackClick = () => {
        axios.get('/api/grinders')
            .then(response => {
                setInventoryGrinders(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        
        axios.get('/api/coffees')
            .then(response => {
                setInventoryCoffees(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        setSelectedCoffee(null);
        setSelectedGrinder(null);
        setshowBrewGuide(false);
        setshowCoffeSelection(false);
        setshowGrinderSelection(true);
    };

    const handleStart = () => {
        setIsRunning(true);
      };
    
    const handleStop = () => {
        setIsRunning(false);
      };
    
    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
      };
    
    const handleSave = () => {
        axios.post('/save-time', { time })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      };

    const handleMaxTimeChange = (event) => {
        setMaxTime(Number(event.target.value));
        setTime(0);
        setIsRunning(false);
      };

    
    // render all the stuff
    // render the grinder selection
    const renderGrinderSelection = () => {
        return (
            // render the grinder table here
            // add an onClick event handler to each row
            // call handleRowClick with the clicked coffee object
            <div className="GrinderSelection">
                <header>
                    <h2>Choose Grinder:</h2>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Burrs</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryGrinders.map((grinder) => (
                            <tr key={grinder.name} onClick={() => handleGrinderRowClick(grinder)}>
                                <td>{grinder.name}</td>
                                <td>{grinder.burrs}</td>
                                <td>{grinder.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    // render all the stuff
    const renderCoffeeSelection = () => {
        return (
            // render the grinder table here
            // add an onClick event handler to each row
            // call handleRowClick with the clicked coffee object
            <div className="CoffeeSelection">
                <header>
                    <h2>Choose Coffee:</h2>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Burrs</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryCoffees.map((coffee) => (
                            <tr key={coffee.name} onClick={() => handleCoffeeRowClick(coffee)}>
                                <td>{coffee.name}</td>
                                <td>{coffee.price}</td>
                                <td>{coffee.farmer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    //renders the timer implemented in the Timer.js file
    const renderBrewGuide = () => {
        return (
            <div className="BrewGuide">
                <header>
                    <h2>Brew Guide:</h2>
                </header>
                <div className="BrewGuideContent">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="BrewGuideContentLeft">
                        <h3>Grinder:</h3>
                        <p>{selectedGrinder.name}</p>
                        <h3>Coffee:</h3>
                        <p>{selectedCoffee.name}</p>
                    </div>
                    <div className="BrewGuideContentLeft">
                        <h3>Ratio:</h3>
                        <p>1:16</p>
                        <h3>Water:</h3>
                        <p>300g</p>
                        <h3>Time:</h3>
                        <p>3:00</p>
                    </div>
                </div>
                <div/>
                <div className="Timer">
                <h1 style={{ fontSize: '72px' }}>{minutes}:{seconds < 10 ? '0' : ''}{seconds}</h1>
            {isTimeUp && <p>Time is up!</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div>
          <label htmlFor="max-time-input">Max Time (seconds):</label>
          <input type="number" id="max-time-input" value={maxTime} onChange={handleMaxTimeChange} />
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
                
            </div>
                <button onClick={handleBackClick}>Back</button>
            </div>



            </div>
        );
    };



    // TODO: new table with coffee selection
    return (
        <div>
            {showGrinderSelection && renderGrinderSelection()}
            {showCoffeSelection && renderCoffeeSelection()}
            {showBrewGuide && renderBrewGuide()}
        </div>

    );

}

export default Brew;