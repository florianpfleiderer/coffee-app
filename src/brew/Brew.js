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
    const [totalTime, setTotalTime] = useState(0); // Maximum time in seconds
    const [Pour1stTime, set1stPourTime] = useState(0); // Time for the first pour
    const [Pour2ndTime, set2ndPourTime] = useState(0); // Time for the second pour
    const [is1stPourDone, setIs1stPourDone] = useState(false); // Boolean to check if the first pour is done
    const [is2ndPourDone, setIs2ndPourDone] = useState(false); // Boolean to check if the second pour is done
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

    //Timer
    useEffect(() => {
        let interval;
    
        if (isRunning && time < totalTime) { // Stop the timer when the maximum time is reached
          interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
          }, 1000);
          if(time === Pour1stTime) {
            setIs1stPourDone(true);
          }
          if(time === Pour1stTime + 5) {
            setIs1stPourDone(false);
          }
          if(time === Pour2ndTime) {
            setIs2ndPourDone(true);
          }
          if(time === Pour2ndTime + 5) {
            setIs2ndPourDone(false);
          }
        } else {
          clearInterval(interval);
          setIsTimeUp(true);
        }
        return () => clearInterval(interval);
    }, [isRunning, time, totalTime]);

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
        setIsTimeUp(false);
        setIs1stPourDone(false);
        setIs2ndPourDone(false);
      };
    
      const handleStop = () => {
        setIsRunning(false);
      };
    
      const handleReset = () => {
        setTime(0);
        setIsRunning(false);
        setIsTimeUp(false);
        setIs1stPourDone(false);
        setIs2ndPourDone(false);
      };
    
      const handleTotalTimeChange = (event) => {
        setTotalTime(Number(event.target.value));
        setTime(0);
        setIsRunning(false);
        setIsTimeUp(false);
        setIs1stPourDone(false);
        setIs2ndPourDone(false);
      };

      const handle1stTimeChange = (event) => {
        set1stPourTime(Number(event.target.value));
        setTime(0);
        setIsRunning(false);
        setIsTimeUp(false);
      };

      const handle2ndTimeChange = (event) => {
        set2ndPourTime(Number(event.target.value));
        setTime(0);
        setIsRunning(false);
        setIsTimeUp(false);
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
                        <div></div>
                        <div>
                            <h3>Grinder:</h3>
                            <p>{selectedGrinder.name}</p>
                            <h3>Coffee:</h3>
                            <p>{selectedCoffee.name}</p>
                        </div>
                        <div>
                            <h3>Ratio:</h3>
                            <p>1:16</p>
                            <h3>Water:</h3>
                            <p>300g</p>
                        </div>
                        <div>
                            <h3>Time:</h3>
                            <p>{totalTime}</p>
                        </div>
                        </div><div />
                    <div className="Timer">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div></div>
                            <div>
                                <h1 style={{ fontSize: '40px' }}>{minutes}:{seconds < 10 ? '0' : ''}{seconds}</h1>
                                {isTimeUp && <p>Enjoy your coffee!</p>}
                                {is1stPourDone && <p>End of 1st Pour</p>}
                                {is2ndPourDone && <p>End of 2nd Pour</p>}
                            </div>
                            <div>
                                <button onClick={handleStart}>Start</button>
                                <button onClick={handleStop}>Stop</button>
                                <button onClick={handleReset}>Reset</button>
                            </div>
                            <div>
                                <label htmlFor="total-time-input">Total Time (seconds):</label>
                                <input type="number" id="total-time-input" value={totalTime} onChange={handleTotalTimeChange} />
                            </div>
                            <div>
                                <label htmlFor="1st-time-input">1st Pour (seconds):</label>
                                <input type="number" id="1st-time-input" value={Pour1stTime} onChange={handle1stTimeChange} />
                            </div>
                            <div>
                                <label htmlFor="2nd-time-input">2nd Pour (seconds):</label>
                                <input type="number" id="2nd-time-input" value={Pour2ndTime} onChange={handle2ndTimeChange} />
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