import React from 'react';
import { Box, Chip, Divider, Typography, Alert } from '@mui/material';
function TooltipSide({description, tags, genres}) {
  return <Box sx={{padding: "10px 7px"}}>      
    <Typography sx={{
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 4,
    }}>Mô tả:
        <div dangerouslySetInnerHTML={{ __html: description }} style={{fontSize: "14px"}}></div>
    </Typography>
    <Divider sx={{margin: "10px 0"}}></Divider>
    <Typography>Thẻ:</Typography>
    {tags && tags.map((tag, index) => <Chip key={index} sx={{margin: "5px", cursor: "pointer"}} label={tag} color="primary" variant="outlined" clickable/>)}
    {genres.length > 0 ? <Divider sx={{margin: "10px 0"}}></Divider> : <></>}
    <Typography>Thể loại:</Typography>
    {genres && genres.map((genre, index) => <Chip key={index} sx={{margin: "5px", cursor: "pointer"}} label={genre} color="warning" variant="outlined" clickable/>)}
  </Box>;
}

export default TooltipSide;
