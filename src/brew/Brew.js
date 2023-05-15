import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import './Brew.css';

function Brew() {
    const [inventoryGrinders, setInventoryGrinders] = useState([]);
    const [inventoryCoffees, setInventoryCoffees] = useState([]);
    const [inventoryRecipes, setInventoryRecipes] = useState([]);
    const [selectedGrinder, setSelectedGrinder] = useState(null);
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showGrinderSelection, setshowGrinderSelection] = useState(false);
    const [showCoffeSelection, setshowCoffeSelection] = useState(false);
    const [showRecipeSelection, setshowRecipeSelection] = useState(true);
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
    const [totalTimeInput, setTotalTimeInput] = useState("");
    const [Pour1stTimeInput, set1stPourTimeInput] = useState("");
    const [Pour2ndTimeInput, set2ndPourTimeInput] = useState("");
    const [WaterInput, setWaterInput] = useState("");
    const [editAttribute, setEditAttribute] = useState('');


    

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
        axios.get('/api/recipes')
            .then(response => {
                setInventoryRecipes(response.data);
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
        // } else if (isRunning && time >= totalTime) {
        // f_brewSection
          if(time === totalTime) {setIsTimeUp(true);}
          clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, time, totalTime, Pour1stTime, Pour2ndTime]);

     //if choose BrewGuide
    const handleRecipeRowClick = (recipe) => {
        setSelectedRecipe(recipe);
        setSelectedGrinder(recipe.grinder);
        setSelectedCoffee(recipe.coffee);
        setWaterInput(recipe.water);
        setTotalTimeInput(recipe.totalTime);
        set1stPourTimeInput(recipe.Pour1stTime);
        set2ndPourTimeInput(recipe.Pour2ndTime);
        setshowCoffeSelection(false);
        setshowGrinderSelection(false);
        setshowRecipeSelection(false);
        setshowBrewGuide(true);
    }
      //choose Grinder    
      const handleGrinderRowClick = (grinder) => {
          setSelectedGrinder(grinder);
          setshowGrinderSelection(false);
          setshowRecipeSelection(false);
          setshowBrewGuide(true);
          setshowCoffeSelection(false);
      }
      //choose Coffee
      const handleCoffeeRowClick = (coffee) => {
          setSelectedCoffee(coffee);
          setshowCoffeSelection(false);
          setshowRecipeSelection(false);
          setshowGrinderSelection(false);
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

        axios.get('/api/recipes')
            .then(response => {
                setInventoryRecipes(response.data);
            })
            .catch(error => {
                console.error(error);
            });
          
        setSelectedCoffee("Choose a Coffee");
        setSelectedGrinder("Choose a Grinder");
        setSelectedRecipe(null);
        setshowBrewGuide(false);
        setshowCoffeSelection(false);
        setshowGrinderSelection(false);
        setshowRecipeSelection(true);
        setTime(0);
        setIsRunning(false);
        setIsTimeUp(false);
        setIs1stPourDone(false);
        setIs2ndPourDone(false);
    };

    const handleStart = () => {
        if(time === totalTime) {setTime(0);}
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

      const handleTimeSubmit = (e) => {
        e.preventDefault();
        setTotalTime(parseInt(totalTimeInput));
        set1stPourTime(parseInt(Pour1stTimeInput));
        set2ndPourTime(parseInt(Pour2ndTimeInput));
        setTime(0);
        setIsRunning(false);
        setIsTimeUp(false);
        setIs1stPourDone(false);
        setIs2ndPourDone(false);
      };

        const handleWaterSubmit = (e) => {
        e.preventDefault();
        setWaterInput(parseInt(WaterInput));
        };


        const handleEditClick = (attribute) => {
            setEditAttribute(attribute);
            if(attribute === "grinder") {
                setshowGrinderSelection(true);
                setshowCoffeSelection(false);
                setshowRecipeSelection(false);
                setshowBrewGuide(false);
            } else if (attribute === "coffee") {
                setshowGrinderSelection(false);
                setshowCoffeSelection(true);
                setshowRecipeSelection(false);
                setshowBrewGuide(false);
            }

            
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
                            <th>Farmer</th>
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

    // render recipe selection
    const renderRecipeSelection = () => {
        return (
            // render the grinder table here
            // add an onClick event handler to each row
            // call handleRowClick with the clicked coffee object
            <div className="RecipeSelection">
                <header>
                    <h2>Choose Recipe:</h2>
                </header>
                <table>

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Grinder</th>
                            <th>Coffee</th>
                            <th>Ratio</th>
                            <th>Water</th>
                            <th>Total Time</th>
                        </tr>
                    </thead>
                    <tbody>

                        {inventoryRecipes.map((recipe) => (
                            <tr key={recipe.name} onClick={() => handleRecipeRowClick(recipe)}>
                                <td>{recipe.name}</td>
                                <td>{recipe.grinder}</td>
                                <td>{recipe.coffee}</td>
                                <td>{recipe.ratio}</td>
                                <td>{recipe.water}</td>
                                <td>{recipe.totalTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    //renders the timer implemented in the Timer.js file
    //lets me choose a cooffee, grinder
    const renderBrewGuide = () => {
        return (
          <div className="BrewGuide">
            <header>
              <h2>Brew Guide:</h2>
            </header>

            <table>
                <tbody>
                    <tr key={selectedGrinder.name} onClick={() => handleEditClick('grinder')}>
                        <th>Grinder:</th>
                        <td>{selectedGrinder}</td>
                    </tr>
                    <tr key={selectedCoffee.name} onClick={() => handleEditClick('coffee')}>
                        <th>Coffee:</th>
                        <td>{selectedCoffee}</td>
                    </tr>
                    <tr>
                        <th>Ratio:</th>
                        <td>{selectedRecipe.ratio}</td>
                    </tr>
                    <tr key={selectedRecipe.water}>
                        <th>Water:</th>
                        <td>
                            <form onSubmit={handleWaterSubmit}>
                                <label>
                                <input
                                    type="text"
                                    value={WaterInput}
                                    onChange={(e) => setWaterInput(e.target.value)}
                                />
                                </label>
                                <input type="submit" value="Update" />
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <th>Total time:</th>
                        <td>
                            <form onSubmit={handleTimeSubmit}>
                                <label>
                                <input
                                    type="text"
                                    value={totalTimeInput}
                                    onChange={(e) => setTotalTimeInput(e.target.value)}
                                />
                                </label>
                                <input type="submit" value="Update" />
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <th>1st Pour:</th>
                        <td>
                            <form onSubmit={handleTimeSubmit}>
                                <label>
                                <input
                                    type="text"
                                    value={Pour1stTimeInput}
                                    onChange={(e) => set1stPourTimeInput(e.target.value)}
                                />
                                </label>
                                <input type="submit" value="Update" />
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <th>2nd Pour:</th>
                        <td>
                            <form onSubmit={handleTimeSubmit}>
                                <label>
                                <input
                                    type="text"
                                    value={Pour2ndTimeInput}
                                    onChange={(e) => set2ndPourTimeInput(e.target.value)}
                                />
                                </label>
                                <input type="submit" value="Update" />
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
              <div className="Timer">
                <div className="TimerRow">
                  <div></div>
                  <div className="TimerItem">
                    <h1 style={{ fontSize: '40px' }}>
                      {minutes}:{seconds < 10 ? '0' : ''}{seconds}
                    </h1>
                    {isTimeUp && <p>Enjoy your coffee!</p>}
                    {is1stPourDone && <p>End of 1st Pour</p>}
                    {is2ndPourDone && <p>End of 2nd Pour</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="TimerButtons">
              <buttonRow>
                <brewButton onClick={handleStart}>Start</brewButton>
                <brewButton onClick={handleStop}>Stop</brewButton>
                <brewButton onClick={handleReset}>Reset</brewButton>
              </buttonRow>
              <div>
                <button class="back" onClick={handleBackClick}>Back</button>
              </div>
            </div>
          </div>
        );
      };



    // TODO: new table with coffee selection
    return (
        <div>
            {showRecipeSelection && renderRecipeSelection()}
            {showGrinderSelection && renderGrinderSelection()}
            {showCoffeSelection && renderCoffeeSelection()}
            {showBrewGuide && renderBrewGuide()}
        </div>

    );
    
}

export default Brew;