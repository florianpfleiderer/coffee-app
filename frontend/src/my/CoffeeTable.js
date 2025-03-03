import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import AddCoffeeForm from './AddCoffeeForm'
import EditDialog from './EditDialog';
import SectionHeader from '../components/SectionHeader';
import './CoffeeTable.css'
import LogBook from './LogBook';
import LogBookPage from './LogBookPage';

function CoffeeTable() {
    const [inventory, setInventory] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editAttribute, setEditAttribute] = useState('');
    const [showLogBook, setShowLogBook] = useState(false);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/coffees`)
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error('Error fetching coffees:', error);
                // Add user-facing error notification here
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
        axios.get(`${API_BASE_URL}/api/coffees`)
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error('Error fetching coffees:', error);
                // Add user-facing error notification here
            });
        setSelectedCoffee(null);
        setShowDetail(false);
        setShowTable(true);
    };

    const handleCloseEditDialog = () => {
        axios.get(`${API_BASE_URL}/api/coffees`)
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error('Error fetching coffees:', error);
                // Add user-facing error notification here
            });
        setShowEditDialog(false);
        setSelectedCoffee(null);
        setShowDetail(false);
        setShowTable(true);
    };

    const handleDelete = () => {
        // Send DELETE request to API to delete selected coffee
        fetch(`${API_BASE_URL}/api/coffees/${selectedCoffee.name}`, { method: "DELETE" })
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
        axios.get(`${API_BASE_URL}/api/coffees`)
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error('Error fetching coffees:', error);
                // Add user-facing error notification here
            });
        setSelectedCoffee(null);
        setShowDetail(false);
        setShowTable(true);
    };

    // Add a handler for when a coffee is added successfully
    const handleCoffeeAdded = () => {
        console.log("Coffee added, refreshing list...");
        axios.get(`${API_BASE_URL}/api/coffees`)
            .then(response => {
                setInventory(response.data);
                setShowForm(false);
                setShowTable(true);
            })
            .catch(error => {
                console.error('Error fetching coffees after add:', error);
            });
    };

    // render all the stuff
    const renderTable = () => {
        return (
            <div className="coffee-section">
                <SectionHeader 
                    title="My Coffee Collection"
                    subtitle="Manage your coffee inventory"
                    action={
                        <div className="header-actions">
                            <button className="secondary-button" onClick={() => setShowLogBook(true)}>
                                <i className="fas fa-book"></i>
                                Brewing Journal
                            </button>
                            <button className="action-button" onClick={handleAddCoffee}>
                                <i className="fas fa-plus"></i>
                                Add Coffee
                            </button>
                        </div>
                    }
                />
                
                <div className="card-grid">
                    {inventory.map((coffee) => (
                        <div 
                            key={coffee.name} 
                            className="coffee-card card" 
                            onClick={() => handleRowClick(coffee)}
                        >
                            <h3>{coffee.name}</h3>
                            <div className="coffee-card-details">
                                <div className="detail-item">
                                    <span className="label">Price</span>
                                    <span className="value">${coffee.price}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Farmer</span>
                                    <span className="value">{coffee.farmer}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderDetail = (coffee) => {
        if (!coffee) {
            return null;
        }

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <td onClick={() => handleEditClick('name')}>{coffee.name}</td>
                        </tr>
                        <tr>
                            <th>Origin:</th>
                            <td onClick={() => handleEditClick('origin')}>{coffee.origin}</td>
                        </tr>
                        <tr>
                            <th>Variety:</th>
                            <td onClick={() => handleEditClick('variety')}>{coffee.variety}</td>
                        </tr>
                        <tr>
                            <th>Process:</th>
                            <td onClick={() => handleEditClick('process')}>{coffee.process}</td>
                        </tr>
                        <tr>
                            <th>Roast:</th>
                            <td onClick={() => handleEditClick('roast')}>{coffee.roast}</td>
                        </tr>
                        <tr>
                            <th>Farmer:</th>
                            <td onClick={() => handleEditClick('farmer')}>{coffee.farmer}</td>
                        </tr>
                        <tr>
                            <th>Size:</th>
                            <td onClick={() => handleEditClick('size')}>{coffee.size}</td>
                        </tr>
                        <tr>
                            <th>Price:</th>
                            <td onClick={() => handleEditClick('price')}>{coffee.price}</td>
                        </tr>
                    </tbody>
                </table>
                
                <LogBook coffee={coffee} />
            </div>
        );
    };

    const renderContent = () => {
        if (showLogBook) {
            return <LogBookPage onBack={() => setShowLogBook(false)} />;
        } else if (showTable) {
            return renderTable();
        } else if (showDetail) {
            if (showEditDialog) {
                return (
                    <div>
                        {showEditDialog && <EditDialog coffee={selectedCoffee} attribute={editAttribute} />}
                        <div className="button-container">
                            <button className="back-button" onClick={handleCloseEditDialog}>
                                <i className="fas fa-arrow-left"></i>
                                Back
                            </button>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        {renderDetail(selectedCoffee)}
                        <div className="button-container">
                            <button className="delete-button" onClick={handleDelete}>
                                <i className="fas fa-trash"></i>
                                Delete
                            </button>
                            <button className="back-button" onClick={handleBackClick}>
                                <i className="fas fa-arrow-left"></i>
                                Back
                            </button>
                        </div>
                    </div>
                );
            }
        } else if (showForm) {
            return (
                <div>
                    {showForm && <AddCoffeeForm onAddCoffee={handleCoffeeAdded} />}
                    <button class="back" onClick={handleBackClick}><span>Back</span></button>
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