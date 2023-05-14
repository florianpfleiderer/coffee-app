import React, { useState } from 'react';

function EditDialog({ coffee, attribute }) {
    const [value, setValue] = useState('');

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update the selected coffee's attribute with the new value
        const updatedCoffee = {
            ...coffee, [attribute]: value,
        };
        // Make a PUT request to the Flask backend to update the coffee's attribute in the inventory list
        fetch(`/api/coffees/${coffee.name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCoffee),
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