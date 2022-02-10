import React, {useState, useEffect} from 'react';
import {Box, Card, CardContent, Button, Typography,
    CardActions, Rating, TextField, Snackbar, Alert, Collapse } from '@mui/material/'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import { SERVER } from '../../../config'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
});

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
);

let MiniComment = ({time, name, rating, comment}) => {
    return <Card variant="outlined" sx={{margin: "15px 0"}}>
        <CardContent>
            <StyledRating
                name="customized-color"
                defaultValue={rating}
                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                precision={1}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                readOnly
                sx={{marginTop: "10px"}}
            />
            
            <Typography variant="h4" component="div">
                {name}
            </Typography>
            <Typography sx={{ fontSize: 12}} color="text.secondary" gutterBottom>
                {time}
            </Typography>
            <Typography sx={{ fontSize: 16}}>
                {comment}
            </Typography>
        </CardContent>
        {localStorage.getItem('accessToken')  ? 
        <CardActions>
            <Button size="small">Like</Button>
            <Button size="small">Reply</Button>
            <Button size="small">Delete</Button>
        </CardActions>
        : <></>}
    </Card>
}

let CommentBox = ({id, type, isComment}) => { //id: anime id or manga id
    const [content, setContent] = useState('');
    const [rating, setRating] = React.useState(0);
    
    const [open, setOpen] = useState(false)
    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    };

    const handleSubmitComment= async () => {
        console.log({content, rating, id, token: localStorage.getItem('accessToken')});
        const data = {content, rating, id, token: localStorage.getItem('accessToken')}
        if(localStorage.getItem('accessToken')){
            await axios({
                method: 'post',
                url: `${SERVER}/api/${type}/comment`,
                data: data
              })
            .then(function (res) {
                console.log(res);
                
                setOpen(true)
                location.reload()
            });
            
        }
    }
    console.log("isComment", isComment);
    return <Card variant="outlined" sx={{margin: "15px 0 80px 0"}}>
        
        <CardContent>
            <StyledRating
                name="customized-color"
                defaultValue={0}
                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                precision={1}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                sx={{marginTop: "10px"}}
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />
            
            <Typography variant="h4" component="div">
            </Typography>
            <Typography sx={{ fontSize: 12}} color="text.secondary" gutterBottom>
                
            </Typography>
            {/* <Typography sx={{ fontSize: 16}}>
                
            </Typography> */}
            <TextField id="outlined-basic" label="Content" 
                variant="outlined" 
                fullWidth 
                value={content}
                onChange={handleChange} sx={{}}/>
        </CardContent>
        <CardActions>
            <Button disabled={isComment} size="medium" onClick={handleSubmitComment}>Comment</Button>            
        </CardActions>
        <Collapse in={open}>
            <Alert
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    setOpen(false);
                }}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            sx={{ mb: 2 }}
            >
            Comment successfully!
            </Alert>
        </Collapse>
    </Card>
}

function Comment({comments, id, type, isComment}) {
    let calTime = item => {
        const commentSecond = new Date(item).getSeconds()
        const commentMinute = new Date(item).getMinutes()
        const commentHour = new Date(item).getHours()
        const commentDate = new Date(item).getDate()
        const commentMonth = new Date(item).getMonth()
        const commentYear = (new Date(item).getYear()) + 1900
        return `${commentHour}:${commentMinute}:${commentSecond} ${commentDate}/${commentMonth}/${commentYear}`
    }
  return <Box sx={{ minWidth: 275, margin: "20px 0px"}}>
        <Typography variant="h4" component="div" gutterBottom>Comments:</Typography>
        <PositionedSnackbar></PositionedSnackbar>
        {localStorage.getItem('accessToken') 
            ? <CommentBox id={id} type={type} isComment={isComment}></CommentBox> 
            : <Alert>Đăng nhập để bình luận</Alert>}

        {comments.map((item, index) => <MiniComment key={index} time={calTime(item.comment.createAt)} name={item.comment.nameUserComment} rating={item.rating} comment={item.comment.content}></MiniComment>)}
    </Box>
}
export default Comment

function PositionedSnackbar({content = "I luv u"}) {
    const [state, setState] = React.useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
  
    const { vertical, horizontal, open } = state;
  
    const handleClick = (newState) => () => {
      setState({ open: true, ...newState });
    };
  
    const handleClose = () => {
      setState({ ...state, open: false });
    };
  
    const buttons = (
      <React.Fragment>
        <Button
          onClick={handleClick({
            vertical: 'top',
            horizontal: 'right',
          })}
        >
          Top-Right
        </Button>
      </React.Fragment>
    );
  
    return (
      <div>
        {buttons}
        <Snackbar
            autoHideDuration={1000}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message={content}
          key={vertical + horizontal}
          style={{backgroundColor: "#ff7979"}}
          className="snackbar-anime"
        />
      </div>
    );
  }
