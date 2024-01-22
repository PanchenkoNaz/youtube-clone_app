import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState(''); // at the start its set to an empty string

  const navigate = useNavigate(); // when something is typed in the searchbar and is checked -> the useNavigate hook can be used then

  // passses the input from Searchbar to the URL (the query)
  const handleSubmit = (e) => {
    e.preventDefault(); // to prevent a reload of the page everytime a form is submitted

    // check if the searchterm exists (if something is typed in)
    if (searchTerm) {
      navigate(`/search/${searchTerm}`); // dynamic template string by useNavigate hook to navigate to the specific url of the searchterm

      // resets the searchTerm to an empty String
      setSearchTerm('');
    }
  };

  return (
    <Paper
        component='form'
        // onhandleSubmit function here
        onSubmit={handleSubmit}        
        sx={{
            borderRadius:20,
            border: '1px solid #e3e3e3',
            paddingLeft: 2,
            boxShadow: 'none',
            marginRight: { sm: 5 }, // only on small devises
        }}
         >
        <input 
            className='search-bar'
            placeholder= 'Search...'
            value={searchTerm}
            
            /* update the searchTerm when something is typed / keypressEvent
             the value of the keypress is stored in e.target.value */
            onChange={(e) => setSearchTerm(e.target.value)}> 
        </input>
        <IconButton type='submit'
                    sx={{ padding: '10px', color: 'red' }}>
            <Search />
        </IconButton>
    </Paper>
  )
}

export default SearchBar