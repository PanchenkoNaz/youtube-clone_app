import React from "react";

import { Stack } from "@mui/material";

import { categories } from "../utils/constants";

// static variable before I implemented selectedCategory and setSelectedCategory in Sidebar
// const selectedCategory = 'New';
// {} are important here
const Categories = ({ selectedCategory, setSelectedCategory }) => (
    <Stack 
        direction='row'
        sx={{ 
            overflowY:'auto',
            height: { sx: 'auto', md:'95%'},
            flexDirection: {md: 'column'},
        }}
    >
        {categories.map((category) => (
        // we want to return a button for each category
            <button 
                className='category-btn'
                onClick={() => setSelectedCategory(category.name)}  
                // if the name of the category is the same like the selected category, then ad the color #FC1503 to the button                      
                style={{ 
                    background: category.name === selectedCategory && '#FC1503', 
                    color: 'white',
                }}
                // whenever we are mapping over something in react we need to give each property a key
                key={category.name}
            >
                <span style={{color: category.name === selectedCategory ? 'white' : 'red', marginRight: '15px' }}>
                    {category.icon}
                </span>
                <span style={{opacity:category.name === selectedCategory ? '1' : '0.8'}}>
                    {category.name}
                </span>
            </button>
        ))}
    </Stack>
);

export default Categories

