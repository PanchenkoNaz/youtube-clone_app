import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

// pulls data or query from the parameters from the browser
import { useParams } from'react-router-dom';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Videos } from './';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams(); // this is going to get popullated to whatever will enter in the url bar after the "/seacrh"

  // calls the API to get the videos
  useEffect(() => {
    // async function
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items)) // in async functions .then-function needs to be chained to the function // getting back the videos
    },[searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography variant='h4' fontWeight='bold' mb={2} sx={{ color: 'white' }}>
        Search results for: <span style={{ color: '#FC1503' }}>{searchTerm}</span> videos
      </Typography>
        
      <Videos videos={videos} /> 
    </Box>
  );
};

export default SearchFeed;