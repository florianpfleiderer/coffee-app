import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import axios from 'axios';

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
        // Make a PUT request to update the coffee's attribute
        fetch(`${API_BASE_URL}/api/coffees/${coffee.name}`, {
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
                console.log(`Recipe ${attribute} updated successfully`);
                coffee.onClose();
            })
            .catch((error) => {
                console.error('Error updating recipe:', error);
                alert('Failed to update recipe. Please try again.');
            });
        setValue('')
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                {attribute}:
                <input type="text" value={value} onChange={handleInputChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default EditDialog;