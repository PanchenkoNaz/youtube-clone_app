import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {

  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([]);
  // The useParams hook returns the id (an object of key/value pairs of the dynamic params) from the current URL
  const { id } = useParams(); 

  // to see the channel Details and the videos belonging to the channel
  // console.log(channelDetail, videos)

  // will render as soon as the component opens
  useEffect(() => {

    // the first channel in the list / access to all channels in the list
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data) => setChannelDetail(data?.items[0])); 
  
    // fetches the videos belonging to the channel
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setVideos(data?.items));
  }, [id])

  return (
    <Box minHeight='95vh'>
      <Box>
        <div style= {{ 
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%)',
          zIndex: 10,
          height: '300px'
        }}
        />
        <ChannelCard channelDetail={channelDetail}
        marginTop= '-110px' />
      </Box>
      <Box display='flex' padding='2'>
        {/* updates the marginRight to 100px only on smaller and higher decvices - not xs */}
        <Box sx={{ marginRight: { sm: '100px' } }} /> 
          <Videos videos = { videos } />
      </Box>
    </Box>
  )
}

export default ChannelDetail