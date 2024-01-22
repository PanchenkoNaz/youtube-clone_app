import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

// local imports
import { Videos } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI';

// to get the videoDetail data
const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  // gets the id of the video I want to fetch the data for
  const { id } = useParams();

  // no use the useEffect hook to immediatly fetch the data as soon the component loads
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0])); // fetch only the first video

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items));
  }, [id]);

  /* error: 'Cannot read properties of null (reading 'snippet')'
    -> write this if statement */
  if(!videoDetail?.snippet) return 'Loading...';

  // Object-destructuring destructures all the values from the videoDetail
  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount} } = videoDetail;

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs:'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{ width:'100%', position: 'sticky', top:'86px' }}>

            {/* renders the URL player.
            ReactPlayer is a React component for playing a variety of URLs, 
            including file paths, YouTube, Facebook, Twitch, SoundCloud, 
            Streamable, Vimeo, Wistia, Mixcloud, DailyMotion and Kaltura*/}
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${id}`} 
              className='react-player' // video gets a big bigger
              controls // creates controls in the video like timeline, play-button etc 
            />
            {/* renders the title ofthe video */}
            <Typography 
              color='#fff' 
              variant='h5' 
              fontWeight='bold' 
              p={2}
            >
              {title}
            </Typography>
            {/* renders the channelTitle and CheckCircle of the channel */}
            <Stack 
              direction='row' 
              justifyContent='space-between' 
              sx={{ color:'#fff' }} 
              py={1} 
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography 
                  variant={{ sm: 'subtitle1', md: 'h6'}} 
                  color='#fff'
                >
                  {channelTitle}
                  <CheckCircle sx={{ fontSize:'12px', color: 'gray', ml:'5px'}} />
                </Typography>
              </Link>
              {/* renders the views and likes of the video */}
              <Stack 
                direction='row' 
                gap='20px'
                alignItems='center'
              >
                {/* Likes */}
                <Typography 
                  variant='body1' 
                  sx={{ opacity: 0.7 }}
                >
                  {/* this will add the dots to the number to make it more readable */}
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
                {/* Views */}
                <Typography 
                  variant='body1' 
                  sx={{ opacity: 0.7 }}
                >
                  {/* this will add the dots to the number to make it more readable */}
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        {/* renders the suggestion of related videos to the video which is shown */}
        <Box 
          px={2} 
          py={{ md: 1, xs: 5 }} 
          justifyContent='center' 
          alignItems='center'
        >
          <Videos videos={videos} direction='column'/>
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail
