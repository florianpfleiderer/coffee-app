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


    // TODO: new table with coffee selection
    return (
        <div>
            {showGrinderSelection && renderGrinderSelection()}
            {showCoffeSelection && renderCoffeeSelection()}
            {showBrewGuide &&
            <header>
                <h2>Brewing...</h2>
                <button1 onClick={handleBackClick}>Back</button1>
            </header>}
        </div>
    );
}

export default Brew;