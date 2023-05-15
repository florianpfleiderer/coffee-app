import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
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
    const [CoffeeInInput, setCoffeeInInput] = useState("");
    const [TempInput, setTempInput] = useState("");
    const [editAttribute, setEditAttribute] = useState('');
    const [RecipeNameInput, setRecipeNameInput] = useState("");




    

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

    const find_recipe_by_name = (name) => {
        fetchRecipes();
        for (let i = 0; i < inventoryRecipes.length; i++) {
            if (inventoryRecipes[i].name === name) {
                return inventoryRecipes[i];
            }
        }
    }

    // const calculateRatio = () => {
    //     if (WaterInput != 0 && CoffeeInInput != 0 && (WaterInput / CoffeeInInput) != 0) {
    //         selectedRecipe.ratio = WaterInput / CoffeeInInput;
    //     } else {
    //         selectedRecipe.ratio = 0;
    //     }
    // }






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
        setSelectedGrinder(find_grinder_by_name(recipe.grinder));
        setSelectedCoffee(find_coffee_by_name(recipe.coffee));
        setRecipeNameInput(recipe.name);
        setWaterInput(recipe.water);
        setCoffeeInInput(recipe.coffeeIn);
        //calculateRatio();
        setTempInput(recipe.temp);
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
        setshowCoffeSelection(false);
        setshowRecipeSelection(false);
        setshowBrewGuide(true);
        handleSaveClick();
      }
      //choose Coffee
      const handleCoffeeRowClick = (coffee) => {
        setSelectedCoffee(coffee);
        setshowGrinderSelection(false);
        setshowCoffeSelection(false);
        setshowRecipeSelection(false);
        setshowBrewGuide(true);
        handleSaveClick();
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
        handleSaveClick();
      };

        const handleWaterSubmit = (e) => {
        e.preventDefault();
        setWaterInput(parseInt(WaterInput));
        //calculateRatio();
        handleSaveClick();
        };

        const handleCoffeeInSubmit = (e) => {
        e.preventDefault();
        setCoffeeInInput(parseInt(CoffeeInInput));
        // calculateRatio();
        handleSaveClick();
        };

        const handleTempSubmit = (e) => {
        e.preventDefault();
        setTempInput(parseInt(TempInput));
        handleSaveClick();
        };



        const handleNameSubmit = (e) => {
        e.preventDefault();
        setRecipeNameInput(RecipeNameInput);
        handleSaveClick();
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

        //saves the edited grinder/coffee to the api
        const handleSaveClick = () => {
            const updatedRecipe = { ...selectedRecipe };
            updatedRecipe.name = RecipeNameInput;
            updatedRecipe.grinder = selectedGrinder.name;
            updatedRecipe.coffee = selectedCoffee.name;
            updatedRecipe.water = WaterInput;
            updatedRecipe.coffeeIn = CoffeeInInput;
            updatedRecipe.temp = TempInput;
            updatedRecipe.totalTime = totalTimeInput;
            updatedRecipe.Pour1stTime = Pour1stTimeInput;
            updatedRecipe.Pour2ndTime = Pour2ndTimeInput;
            axios.put('api/recipes/' + selectedRecipe.name, updatedRecipe)
            .then((response) => {
                fetchRecipes();
                
            })
            .catch((error) => {
                console.log(error);
            });

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
                                <td>1:{recipe.ratio}</td>
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
                                    value={RecipeNameInput}
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
                    <tr key={selectedRecipe.coffeeIn}>
                        <th>Coffee in g:</th>
                        <td>
                            <form onSubmit={handleCoffeeInSubmit}>
                                <label>
                                <input
                                    type="text"
                                    value={CoffeeInInput}
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
                                    value={TempInput}
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
              {/* </buttonRow>
              <buttonRow> */}
                <brewButton onClick={handleBackClick}>Back</brewButton>
                <brewButton onClick={handleSaveClick}>Save</brewButton>
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