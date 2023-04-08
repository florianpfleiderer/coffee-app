import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCoffeeForm from './AddCoffeeForm'
// import './CoffeeTable.css'

function CoffeeTable() {
    const [inventory, setInventory] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [selectedCoffee, setSelectedCoffee] = useState(null);

    useEffect(() => {
        axios.get('/api/coffees')
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // handle Clicks
    const handleRowClick = (coffee) => {
        setSelectedCoffee(coffee);
        setShowForm(false);
        setShowTable(false);
        setShowDetail(true);
    };

    const handleBackClick = () => {
        setSelectedCoffee(null);
        setShowDetail(false);
        setShowTable(true);

        // Fetch inventory data from API to update the table
        axios.get('/api/coffees')
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleAddCoffee = () => {
        setShowForm(true);
        setShowTable(false);
        setShowDetail(false);
    };

    const handleDelete = () => {
        // Send DELETE request to API to delete selected coffee
        fetch(`/api/coffees/${selectedCoffee.name}`, { method: "DELETE" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete coffee.");
                }
                // Remove deleted coffee from inventory
                const updatedInventory = inventory.filter(
                    (coffee) => coffee.id !== selectedCoffee.id
                );
                setInventory(updatedInventory);
                // Clear selected coffee and hide detail view
                setSelectedCoffee(null);
                setShowDetail(true);
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to delete coffee.");
            });
    };

    // render all the stuff
    const renderTable = () => {
        return (
            // render the coffee table here
            // add an onClick event handler to each row
            // call handleRowClick with the clicked coffee object
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Farmer</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((coffee) => (
                        <tr key={coffee.name} onClick={() => handleRowClick(coffee)}>
                            <td>{coffee.name}</td>
                            <td>{coffee.price}</td>
                            <td>{coffee.farmer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderDetail = (selectedCoffee) => {
        if (!selectedCoffee) {
            return null;
        }
        // render the detailed information for the selected coffee here
        // use the selectedCoffee state variable to get the coffee object
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Name:</th>
                        <td>{selectedCoffee.name}</td>
                    </tr>
                    <tr>
                        <th>Price:</th>
                        <td>{selectedCoffee.price}</td>
                    </tr>
                    <tr>
                        <th>Farmer:</th>
                        <td>{selectedCoffee.farmer}</td>
                    </tr>
                </tbody>
            </table>
        );
    };

    const renderContent = () => {
        if (showTable) {
            return (
                <div>
                    {renderTable()}
                    <button1 onClick={handleAddCoffee}>Add Coffee</button1>
                </div>
            )
        } else if (showDetail) {
            return (
                <div>
                    {renderDetail(selectedCoffee)}
                    <button1 onClick={handleDelete}>Delete</button1>
                    <button1 onClick={handleBackClick}>Back</button1>
                </div>
            );
        } else if (showForm) {
            return (
                <div>
                    {showForm && <AddCoffeeForm />}
                    <button1 onClick={handleBackClick}>Back</button1>
                </div>
            );
        }
    };

    // TODO: Render the table with inventory data
    return (
        <div>
            {renderContent()}
        </div>
    );
}

export default CoffeeTable;