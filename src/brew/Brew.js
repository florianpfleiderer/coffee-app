import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { render } from '@testing-library/react';
import AddRecipeForm from './AddRecipeForm';
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
    const [showForm, setShowForm] = useState(false);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [totalTime, setTotalTime] = useState(0); // Maximum time in seconds
    const [time1, setTime1] = useState(0); // Time for the first pour
    const [time2, setTime2] = useState(0); // Time for the second pour
    const [isTime1up, setIsTime1up] = useState(false);
    const [isTime2up, setIsTime2up] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [totalTimeInput, setTotalTimeInput] = useState("");
    const [time1Input, setTime1Input] = useState("");
    const [time2Input, setTime2Input] = useState("");
    const [waterInput, setWaterInput] = useState("");
    const [coffeeInInput, setCoffeeInInput] = useState("");
    const [tempInput, setTempInput] = useState("");
    const [recipeNameInput, setRecipeNameInput] = useState("");



    const fetchGrinders = () => {
        axios
          .get('/api/grinders')
          .then((response) => {
            setInventoryGrinders(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
      useEffect(() => {
        fetchGrinders();
      }, []);

      const fetchCoffees = () => {
        axios
          .get('/api/coffees')
          .then((response) => {
            setInventoryCoffees(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
      useEffect(() => {
        fetchCoffees();
      }, []);

      const fetchRecipes = () => {
        axios
          .get('/api/recipes')
          .then((response) => {
            setInventoryRecipes(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
      useEffect(() => {
        fetchRecipes();
      }, []);




    //finds grinder by name
    const find_grinder_by_name = (name) => {
        fetchGrinders();
        for (let i = 0; i < inventoryGrinders.length; i++) {
            if (inventoryGrinders[i].name === name) {
                return inventoryGrinders[i];
            }
        }
    }

    const find_coffee_by_name = (name) => {
        fetchCoffees();
        for (let i = 0; i < inventoryCoffees.length; i++) {
            if (inventoryCoffees[i].name === name) {
                return inventoryCoffees[i];
            }
        }
    }



    //Timer
    useEffect(() => {
        let interval;
    
        if (isRunning && time < totalTime) { // Stop the timer when the maximum time is reached
          interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
          }, 1000);
          if(time === time1) {
            setIsTime1up(true);
          }
          if(time === time1 + 5) {
            setIsTime1up(false);
          }
          if(time === time2) {
            setIsTime2up(true);
          }
          if(time === time2 + 5) {
            setIsTime2up(false);
          }
        } else {
        // } else if (isRunning && time >= totalTime) {
        // f_brewSection
          if(time === totalTime) {setIsTimeUp(true);}
          clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, time, totalTime, time1, time2]);

     //if choose BrewGuide
    const handleRecipeRowClick = (recipe) => {
        setSelectedRecipe(recipe);
        setSelectedGrinder(find_grinder_by_name(recipe.grinder));
        setSelectedCoffee(find_coffee_by_name(recipe.coffee));
        setRecipeNameInput(recipe.name);
        setWaterInput(recipe.water);
        setCoffeeInInput(recipe.coffee_In);
        setTime(0);
        setTempInput(recipe.temp);
        setTotalTimeInput(recipe.totalTime);
        setTotalTime(recipe.totalTime);
        setTime1Input(recipe.time1);
        setTime1(recipe.time1);
        setTime2Input(recipe.time2);
        setTime2(recipe.time2);
        setshowCoffeSelection(false);
        setshowGrinderSelection(false);
        setshowRecipeSelection(false);
        setshowBrewGuide(true);
    }
      //choose Grinder    
      const handleGrinderRowClick = (grinder) => {
        setSelectedGrinder(grinder);
        setshowGrinderSelection(false);
        setshowCoffeSelection(false);
        setshowRecipeSelection(false);
        setshowBrewGuide(true);
        handleSubmit();
      }
      //choose Coffee
      const handleCoffeeRowClick = (coffee) => {
        setSelectedCoffee(coffee);
        setshowGrinderSelection(false);
        setshowCoffeSelection(false);
        setshowRecipeSelection(false);
        setshowBrewGuide(true);
        handleSubmit();
      }

    const handleBackClick = () => {
        fetchCoffees();
        fetchGrinders();
        fetchRecipes();

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
        setIsTime1up(false);
        setIsTime2up(false);
    };

    const handleStart = () => {
        if(time === totalTime) {setTime(0);}
        setIsRunning(true);
        setIsTimeUp(false);
        setIsTime1up(false);
        setIsTime2up(false);
      };
    
      const handleStop = () => {
        setIsRunning(false);
      };
    
      const handleReset = () => {
        setTime(0);
        setIsRunning(false);
        setIsTimeUp(false);
        setIsTime1up(false);
        setIsTime2up(false);
      };


      const handleSubmit = () => {
        // e.preventDefault();
        const updatedRecipe = {
            name: recipeNameInput,
            water: waterInput,
            coffee_In: coffeeInInput,
            temp: tempInput,
            totalTime: totalTimeInput,
            time1: time1Input,
            time2: time2Input,
            grinder_id: selectedGrinder.name,
            coffee_id: selectedCoffee.name,

        };
        axios.put(`/api/recipes/${selectedRecipe.name}`, updatedRecipe)
        .then((response) => {
            fetchRecipes();
        })
        .catch((error) => {
            console.error(error);
        });
    };

    const handletotalTimeSubmit = (e) => {
        e.preventDefault();
        setTotalTime(parseInt(totalTimeInput));
        setTime1(parseInt(time1Input));
        setTime2(parseInt(time2Input));
        setTime(0);
        setIsRunning(false);
        setIsTimeUp(false);
        setIsTime1up(false);
        setIsTime2up(false);
        handleSubmit('totalTime');
    };

    const handleTime1Submit = (e) => {
        e.preventDefault();
        setTotalTime(parseInt(totalTimeInput));
        setTime1(parseInt(time1Input));
        setTime2(parseInt(time2Input));
        setTime(0);
        setIsRunning(false);
        setIsTimeUp(false);
        setIsTime1up(false);
        setIsTime2up(false);
        handleSubmit('time1');
    };

    const handleTime2Submit = (e) => {
        e.preventDefault();
        setTotalTime(parseInt(totalTimeInput));
        setTime1(parseInt(time1Input));
        setTime2(parseInt(time2Input));
        setTime(0);
        setIsRunning(false);
        setIsTimeUp(false);
        setIsTime1up(false);
        setIsTime2up(false);
        handleSubmit('time2');
    };


        const handleWaterSubmit = (e) => {
        e.preventDefault();
        setWaterInput(parseInt(waterInput));
        handleSubmit('water');
        };

        const handleCoffeeInSubmit = (e) => {
        e.preventDefault();
        setCoffeeInInput(parseInt(coffeeInInput));
        handleSubmit('coffee_In');
        };

        const handleTempSubmit = (e) => {
        e.preventDefault();
        setTempInput(parseInt(tempInput));
        handleSubmit('temp');
        };



        const handleNameSubmit = (e) => {
        e.preventDefault();
        setRecipeNameInput(recipeNameInput);
        handleSubmit('name');
        };


        const handleEditClick = (attribute) => {
            if(attribute === "grinder") {
                fetchGrinders();
                setshowGrinderSelection(true);
                setshowCoffeSelection(false);
                setshowRecipeSelection(false);
                setshowBrewGuide(false);
            } else if (attribute === "coffee") {
                fetchCoffees();
                setshowGrinderSelection(false);
                setshowCoffeSelection(true);
                setshowRecipeSelection(false);
                setshowBrewGuide(false);
            }
        };

        const handleAddRecipe = () => {
            setShowForm(true);
            setshowGrinderSelection(false);
            setshowCoffeSelection(false);
            setshowRecipeSelection(false);
            setshowBrewGuide(false);
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
                                <td>{grinder.burr}</td>
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
                                <td>1:{recipe.water / recipe.coffee_In}</td>
                                <td>{recipe.water}</td>
                                <td>{recipe.totalTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button class="button1" onClick={handleAddRecipe}>Add Recipe</button>
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
                    <tr key={selectedRecipe.name}>
                        <th>Name:</th>
                        <td>
                            <form onSubmit={handleNameSubmit}>
                                <label>
                                <input
                                    type="text"
                                    value={recipeNameInput}
                                    onChange={(e) => setRecipeNameInput(e.target.value)}
                                />
                                </label>
                                <input type="submit" value="Update" />
                            </form>
                        </td>
                    </tr>

                    <tr key={selectedGrinder.name} onClick={() => handleEditClick('grinder')}>
                        <th>Grinder:</th>
                        <td>{selectedGrinder.name}</td>
                    </tr>
                    <tr key={selectedCoffee.name} onClick={() => handleEditClick('coffee')}>
                        <th>Coffee:</th>
                        <td>{selectedCoffee.name}</td>
                    </tr>
                    <tr>
                        <th>Ratio:</th>
                        <td>1:{selectedRecipe.water / selectedRecipe.coffee_In}</td>
                    </tr>
                    <tr key={selectedRecipe.water}>
                        <th>Water:</th>
                        <td>
                            <form onSubmit={handleWaterSubmit}>
                                <label>
                                <input
                                    type="text"
                                    value={waterInput}
                                    onChange={(e) => setWaterInput(e.target.value)}
                                />
                                </label>
                                <input type="submit" value="Update" />
                            </form>
                        </td>
                    </tr>
                    <tr key={selectedRecipe.coffee_In}>
                        <th>Coffee in g:</th>
                        <td>
                            <form onSubmit={handleCoffeeInSubmit}>
                                <label>
                                <input
                                    type="text"
                                    value={coffeeInInput}
                                    onChange={(e) => setCoffeeInInput(e.target.value)}
                                />
                                </label>
                                <input type="submit" value="Update" />
                            </form>
                        </td>
                    </tr>
                    <tr key={selectedRecipe.temp}>
                        <th>Temperature in C:</th>
                        <td>
                            <form onSubmit={handleTempSubmit}>
                                <label>
                                <input
                                    type="text"
                                    value={tempInput}
                                    onChange={(e) => setTempInput(e.target.value)}
                                />
                                </label>
                                <input type="submit" value="Update" />
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <th>Total time:</th>
                        <td>
                            <form onSubmit={handletotalTimeSubmit}>
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
                            <form onSubmit={handleTime1Submit}>
                                <label>
                                <input
                                    type="text"
                                    value={time1Input}
                                    onChange={(e) => setTime1Input(e.target.value)}
                                />
                                </label>
                                <input type="submit" value="Update" />
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <th>2nd Pour:</th>
                        <td>
                            <form onSubmit={handleTime2Submit}>
                                <label>
                                <input
                                    type="text"
                                    value={time2Input}
                                    onChange={(e) => setTime2Input(e.target.value)}
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
                    {isTime1up && <p>End of 1st Pour</p>}
                    {isTime2up && <p>End of 2nd Pour</p>}
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
              <buttonRow>
                <brewButton onClick={handleBackClick}>Back</brewButton>
                <brewButton onClick={handleSubmit}>Save</brewButton>
              </buttonRow>
            </div>
          </div>
        );
      };



    // TODO: new table with coffee selection

    const renderContent = () => {
        if (showRecipeSelection) {
            return renderRecipeSelection();
        } else if (showGrinderSelection) {
            return renderGrinderSelection();
        } else if (showCoffeSelection) {
            return renderCoffeeSelection();
        } else if (showBrewGuide) {
            return renderBrewGuide();
        } else if (showForm) {
            return (
                <div>
                    {showForm && <AddRecipeForm />}
                    <button class="back" onClick={handleBackClick}><span>Back</span></button>
                </div>
            );
        }
    };

    return (
        <div>
            {renderContent()}
        </div>

    );
    
}

export default Brew;