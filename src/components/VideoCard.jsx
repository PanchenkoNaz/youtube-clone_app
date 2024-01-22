import React from 'react'
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

// this will be used in case ther is no data that can be fetched from the API
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants';

// destructure the property and syntax
const VideoCard = ({ video: { id: {videoId}, snippet  } }) => {
  console.log(videoId)

  return (
    <Card sx={{ width:{ xs: '100%', sm: '358px', md:'320px' }, boxShadow:'none', borderRadius: 0 }}>
      <Link to={videoId ? `/video/${videoId}`: demoVideoUrl}>
        <CardMedia 
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
          sx={{ width:{
            xs: '100%', sm: '358px', md:'320px'
          }, height: 180 }}
        />
      </Link>
      <CardContent sx={{backgroundColor: '#1e1e1e', height:106}}>
        <Link to={videoId ? `/video/${videoId}`: demoVideoUrl}>
          <Typography 
            variant='subtitle1' 
            fontWeight='bold' 
            color= '#fff'>
            {/* limited from 0 to 60 because some titles might get to long */}
            {snippet?.title.slice(0, 60) ||
            // if there is no title it renders the demoVideoTitle
            demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={snippet.channelId ? `/channel/${snippet?.channelId}`: demoChannelUrl}>
          <Typography 
            variant='subtitle2' 
            fontWeight='bold' 
            color= 'gray'>
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}

export default VideoCard