import React, { useState } from 'react';
import axios from 'axios';
// import Brew from './Brew';


function AddRecipeForm(props) {
    const [name, setName] = useState('');
    const [water, setWater] = useState('');
    const [coffee_In, setCoffee_In] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [grinder_id, setGrinder_id] = useState('');
    const [coffee_id, setCoffee_id] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            if (name === '' || water === '' || coffee_In === '' || totalTime === '' || grinder_id === '' || coffee_id === '') {
                throw new Error("Failed to add Recipe - fill out all the boxes.");
            }
            const recipe = {name, water, coffee_In, totalTime, grinder_id, coffee_id};
            axios.post('/api/recipes', recipe)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    props.onAddRecipe();
                })
                .catch(error => {
                console.error(error);
                });
            setName('');
            setWater('');
            setCoffee_In('');
            setTotalTime('');
            setGrinder_id('');
            setCoffee_id('');
        } catch (error) {
        console.error(error);
        alert("Failed to add Recipe - fill out all boxes.");
        }
    };


    
    return (
        <div class="form-container">
            <form onSubmit={handleSubmit}>
            <div class="form-row">   
                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
            </div>
            <div class="form-row">
                <label>
                    Water:
                    <input type="text" value={water} onChange={e => setWater(e.target.value)} />
                </label>
            </div>
            <div class="form-row">
                <label>
                    Coffee_In:
                    <input type="text" value={coffee_In} onChange={e => setCoffee_In(e.target.value)} />
                </label>
            </div>
            <div class="form-row">
                <label>
                    TotalTime:
                    <input type="text" value={totalTime} onChange={e => setTotalTime(e.target.value)} />
                </label>
            </div>
            <div class="form-row">
                <label>
                    Grinder_id:
                    <input type="text" value={grinder_id} onChange={e => setGrinder_id(e.target.value)} />
                </label>
            </div>
            <div class="form-row">
                <label>
                    Coffee_id:
                    <input type="text" value={coffee_id} onChange={e => setCoffee_id(e.target.value)} />
                </label>
            </div>
            <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddRecipeForm;