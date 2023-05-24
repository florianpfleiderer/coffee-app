import React, { useState } from 'react';
import './CoffeeTable.css'
import './AddCoffeeForm.css'

function EditDialog({ coffee, attribute }) {
    const [value, setValue] = useState('');

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update the selected coffee's attribute with the new value
        const updatedAttribute = {
            [attribute]: value,
        };
        // Make a PUT request to the Flask backend to update the coffee's attribute in the inventory list
        fetch(`/api/coffees/${coffee.name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAttribute),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                coffee.onClose();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setValue('')
    };

    return (
        <div class="form-container">
            <form onSubmit={handleSubmit}>
                <div class="form-row">
                    <label>
                        {attribute}:
                        <input type="text" value={value} onChange={handleInputChange} />
                    </label>
                </div>
                <button class="submit">Submit</button>
            </form>
        </div>
    );
}

export default EditDialog;