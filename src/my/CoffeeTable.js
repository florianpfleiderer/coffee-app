import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCoffeeForm from './AddCoffeeForm'
import EditDialog from './EditDialog';
// import './CoffeeTable.css'

function CoffeeTable() {
    const [inventory, setInventory] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editAttribute, setEditAttribute] = useState('');

    useEffect(() => {
        axios.get('/api/coffees')
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // handle Clicks / opening windows
    const handleRowClick = (coffee) => {
        setSelectedCoffee(coffee);
        setShowForm(false);
        setShowTable(false);
        setShowDetail(true);
    };

    const handleEditClick = (attribute) => {
        setEditAttribute(attribute);
        setShowEditDialog(true);
    };

    const handleAddCoffee = () => {
        setShowForm(true);
        setShowTable(false);
        setShowDetail(false);
    };

    // closing windows / back clicks
    const handleBackClick = () => {
        axios.get('/api/coffees')
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        setSelectedCoffee(null);
        setShowDetail(false);
        setShowTable(true);
    };

    const handleCloseEditDialog = () => {
        axios.get('/api/coffees')
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        setShowEditDialog(false);
        setSelectedCoffee(null);
        setShowDetail(false);
        setShowTable(true);
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
        axios.get('/api/coffees')
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        setSelectedCoffee(null);
        setShowDetail(false);
        setShowTable(true);
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
                    <tr key={selectedCoffee.name} onClick={() => handleEditClick('name')}>
                        <th>Name:</th>
                        <td>{selectedCoffee.name}</td>
                    </tr>
                    <tr key={selectedCoffee.origin} onClick={() => handleEditClick('origin')}>
                        <th>Origin:</th>
                        <td>{selectedCoffee.origin}</td>
                    </tr>
                    <tr key={selectedCoffee.variety} onClick={() => handleEditClick('variety')}>
                        <th>Variety:</th>
                        <td>{selectedCoffee.variety}</td>
                    </tr>
                    <tr key={selectedCoffee.process} onClick={() => handleEditClick('process')}>
                        <th>Process:</th>
                        <td>{selectedCoffee.process}</td>
                    </tr>
                    <tr key={selectedCoffee.roast} onClick={() => handleEditClick('roast')}>
                        <th>Roast:</th>
                        <td>{selectedCoffee.roast}</td>
                    </tr>
                    <tr key={selectedCoffee.farmer} onClick={() => handleEditClick('farmer')}>
                        <th>Farmer:</th>
                        <td>{selectedCoffee.farmer}</td>
                    </tr>
                    <tr key={selectedCoffee.size} onClick={() => handleEditClick('size')}>
                        <th>Size:</th>
                        <td>{selectedCoffee.size}</td>
                    </tr>
                    <tr key={selectedCoffee.price} onClick={() => handleEditClick('price')}>
                        <th>Price:</th>
                        <td>{selectedCoffee.price}</td>
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
            if (showEditDialog) {
                return (
                    <div>
                        {showEditDialog && <EditDialog coffee={selectedCoffee} attribute={editAttribute} />}
                        <button1 onClick={handleCloseEditDialog}>Back</button1>
                    </div>
                );
            } else {
                return (
                    <div>
                        {renderDetail(selectedCoffee)}
                        <button1 onClick={handleDelete}>Delete</button1>
                        <button1 onClick={handleBackClick}>Back</button1>
                    </div>
                );
            }
        } else if (showForm) {
            return (
                <div>
                    {showForm && <AddCoffeeForm />}
                    <button1 onClick={handleBackClick}>Back</button1>
                </div>
            );
        }
    };

    // render everything
    return (
        <div>
            {renderContent()}
        </div>
    );
}

export default CoffeeTable;