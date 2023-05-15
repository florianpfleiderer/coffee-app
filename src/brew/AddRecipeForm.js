import React, { useState } from 'react';
import axios from 'axios';
import Brew from './Brew';

function AddRecipeForm(props) {
    const [name, setName] = useState('');



    
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
        if (name == '') {
            throw new Error("Failed to add Recipe - enter a name.");
        }
        const recipe = {name};
        axios.post('/api/recipes', recipe)
            .then(response => {
            props.onAddRecipe();
            })
            .catch(error => {
            console.error(error);
            });
        setName('');
        } catch (error) {
        console.error(error);
        alert("Failed to add Recipe - fill out all boxes.");
        }
    };


    
    return (
        <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        
        <button type="submit">Submit</button>
        </form>
    );
    }

export default AddRecipeForm;