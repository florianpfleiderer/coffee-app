import React, { useState } from 'react';
import axios from 'axios';

function AddRecipeForm(props) {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
        if (name == '' || ingredients == '' || instructions == '') {
            throw new Error("Failed to add Recipe - fill out all boxes.");
        }
        const recipe = { name, ingredients, instructions };
        axios.post('/api/recipes', recipe)
            .then(response => {
            props.onAddRecipe();
            })
            .catch(error => {
            console.error(error);
            });
        setName('');
        setIngredients('');
        setInstructions('');
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
        <label>
            Ingredients:
            <input type="text" value={ingredients} onChange={e => setIngredients(e.target.value)} />
        </label>
        <label>
            Instructions:
            <input type="text" value={instructions} onChange={e => setInstructions(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
        </form>
    );
    }

export default AddRecipeForm;