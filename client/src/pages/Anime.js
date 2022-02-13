import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

import {Typography, Box, Grid, Paper, Divider, Chip, Alert, Breadcrumbs, 
  Link, List, ListItem, ListItemText, ListItemAvatar, Avatar, Rating, Tooltip, IconButton, Snackbar   } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import Comment from 'src/components/_dashboard/products/Comment';
import {SERVER} from '../config'

import Flag from 'react-world-flags'

import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    marginTop: '15px',
    borderRadius: "1em"
});

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function Anime() {
    const location = useLocation();
    let id = ''
    // console.log(location.pathname);
    const type = location.pathname.split('/')[1]
    const [data, setData] = useState()
    const [link, setLink] = useState([])
    const [isComment, setIsComment] = useState(false)
    const [isWishlist, setIsWishlist] = useState(false)

    const [openSnackbar, setOpenSnackbar] = useState(false)

    const { pathname } = useLocation();
    let URL = ``;
    let dataPost = {
      "token": localStorage.getItem('accessToken') || ""
    }
    if(type == 'anime') {
      id = location.pathname.split('&').pop();
      URL = `${SERVER}/api/anime/animeid/${id}`
    }
    else if(type == 'manga') {
      id = location.pathname.split('&').pop();
      URL = `${SERVER}/api/manga/mangaid/${id}`
    }
    else if(type == 'search') {
      URL = `${SERVER}/api/search/byName`
      dataPost= {
        "value": location.pathname.split('?').pop()
      }
    }
    // console.log("location.pathname", location.pathname);
    // console.log("id", id)
    useEffect(() => {
        let endpoint = ''
        let method = 'post'
        
        let d = axios({
        method,
        url: URL,
        data: dataPost
        }).catch(err => {
        console.log(err);
        }).then(res => {
          console.log(res.data)
          setData(res.data.data)
          setLink(Object.entries(res.data.data.links))
          setIsComment(res.data.isCommented)
          setIsWishlist(res.data.isWishlist)
        });
      }, [id, pathname])

      useEffect(() => {
        window.scrollTo(0, 0);
      }, [id, pathname]);

      const handleClick = (event) => {
        // event.preventDefault();
        console.info('You clicked a breadcrumb.');
      }

      const addToWishList = async ({id}) => {
        if(localStorage.getItem('accessToken')){
          const data = {
            "id": id,
            "token": localStorage.getItem('accessToken')
          }
          console.log(data, `${SERVER}/api/${type == 'anime' ? 'anime' : 'manga'}/addToWishlist`);
          await axios({
            method: 'post',
            url: `${SERVER}/api/${type == 'anime' ? 'anime' : 'manga'}/addToWishlist`,
            data: data
          })
          .then(function (res) {
              console.log(res);
              
              
              // window.location.reload()
              if(res.data.success){
                setIsWishlist(true)
                setOpenSnackbar(true)
              }
          });
        }
      }

      const removeFromWishList = async ({id}) => {
        if(localStorage.getItem('accessToken')){
          const data = {
            "id": id,
            "token": localStorage.getItem('accessToken')
          }
          console.log(data, `${SERVER}/api/${type == 'anime' ? 'anime' : 'manga'}/removeFromWishList`);
          await axios({
            method: 'post',
            url: `${SERVER}/api/${type == 'anime' ? 'anime' : 'manga'}/removeFromWishList`,
            data: data
          })
          .then(function (res) {
              console.log(res);
              
              
              // window.location.reload()
              if(res.data.success){
                setIsWishlist(false)
                setOpenSnackbar(true)
              }
          });
        }
      }

      const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          Trang chủ
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="/dashboard/anime"
          onClick={handleClick}
        >
          {type.toLocaleUpperCase()}
        </Link>,
        <Typography key="3" color="text.primary">
          {data && data.name}
        </Typography>,
      ];

  return <>
    {data && <Box sx={{ flexGrow: 1, margin: "0 25px" }}>
        {/* <Typography mb={2}>{data.name}</Typography> */}
        <Alert variant="outlined" severity="info" sx={{marginBottom: "20px"}}>Thư viện vẫn đang trong giai đoạn phát triển nên thông tin các bộ có thể còn thiếu sót</Alert>
        <Breadcrumbs mb={3} separator="›" aria-label="breadcrumb">
            {breadcrumbs}
        </Breadcrumbs>
        <Grid container spacing={2} id="grid-anime">
            <Grid item xs={3}>
                <Box sx={{ pt: '100%', position: 'relative', height: "450px" }}>
                    <ProductImgStyle alt={data.name} src={data.coverArt ? data.coverArt[0] : ''} />
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Box sx={{display: "flex", flexDirection: "column", padding: "15px 25px 35px 25px"}}>
                    <Box>
                      <a href="/dashboard/anime" style={{cursor: "pointer", textDecoration: "none", marginRight: "10px", marginTop: "10px"}}><Chip sx={{cursor: "pointer", marginTop: "10px"}} color="error" label="ANIME"/></a>
                      <Chip sx={{marginRight: "10px", marginTop: "10px"}}color="success" label={data.status.toUpperCase()}/>
                      {data.originalLanguage && <Chip sx={{marginRight: "10px", marginTop: "10px"}}color="info" label={data.originalLanguage.toUpperCase()}/>}
                      <Chip sx={{marginRight: "10px", marginTop: "10px"}}color="secondary" label={"Score: " + parseInt(data.score)/10}/>
                      {!isWishlist ? <Tooltip title="Add to whishlist">
                        <IconButton sx={{marginTop: "6px"}} onClick={() => addToWishList(data)}>
                          <FavoriteBorderOutlinedIcon color='error'/>
                        </IconButton>
                      </Tooltip>
                      : <Tooltip title="Remove from whishlist">
                        <IconButton sx={{marginTop: "6px"}} onClick={() => removeFromWishList(data)}>
                          <FavoriteOutlinedIcon color='error'/>
                        </IconButton>
                      </Tooltip>}
                      <Snackbar
                        autoHideDuration={1500}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={openSnackbar}
                        onClose={() => setOpenSnackbar(false)}
                        message={isWishlist ? 'Thêm vào wishlist thành công.' : 'Xoá khỏi wishlist thành công.'}                        
                        style={{}}
                        className="snackbar-anime"
                      >
                        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                        {isWishlist ? 'Thêm vào wishlist thành công.' : 'Xoá khỏi wishlist thành công.'} 
                        </Alert>
                      </Snackbar>
                    </Box>
                    <Typography variant='h3' sx={{fontFamily: "'Quicksand', sans-serif", fontSize: "42px !important", fontWeight: "800"}}>{data.name.toUpperCase()}</Typography>
                    <Typography sx={{fontWeight: "700"}}>{data.altTitle}</Typography>
                    <StyledRating
                      name="customized-color"
                      defaultValue={data.avgRating}
                      getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                      precision={1}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      readOnly
                      sx={{marginTop: "10px"}}
                    />
                    <Box sx={{marginTop: "20px"}}>
                        {data.staff && data.staff.map((s, index) => <Chip key={index} sx={{margin: "5px", cursor: "pointer"}} label={s} color="primary" clickable/>)}
                    </Box>
                    <Divider sx={{margin: "10px 0"}}></Divider>
                    <Typography sx={{fontWeight: "700"}}>
                        <div dangerouslySetInnerHTML={{ __html: data.description }} style={{fontSize: "14px"}}></div>
                    </Typography>
                    <Divider sx={{margin: "10px 0"}}></Divider>
                    <Typography>Tags:</Typography>
                    <Box>
                        {data.tags && data.tags.map((tag, index) => <Chip key={index} sx={{margin: "5px", cursor: "pointer"}} label={tag} color="primary" variant="outlined" clickable/>)}
                    </Box>
                    {data.genres.length > 0 ? <Divider sx={{margin: "10px 0"}}></Divider> : <></>}
                    <Typography>Thể loại:</Typography>
                    <Box>
                        {data.genres && data.genres.map((genre, index) => <Chip key={index} sx={{margin: "5px", cursor: "pointer"}} label={genre} color="warning" variant="outlined" clickable/>)}
                    </Box>
                    {/* list links to view */}
                    <Divider sx={{margin: "10px 0"}}></Divider>
                    <Typography>Danh sách đọc:</Typography>
                    <Grid container sx={{width: "auto"}}>
                      
                      <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'rgb(33, 43, 54)', borderRadius: "2em", marginTop: "20px" }}>
                        <Box sx={{maxHeight: "240px", overflowY: "auto", width: 'calc(100% - 10px)'}} id="style-2">
                        <Grid container sx={{width: "calc( 100% - 10px)", height: "50px", bgcolor: "#6373817a", borderRadius: "2em", margin: "5px 10px"}}>
                          <Grid item xs={9}><Typography sx={{color: "#fff",lineHeight: "50px", marginLeft: "30px"}}>Site</Typography></Grid>
                          <Grid item xs={3}><Typography sx={{color: "#fff",lineHeight: "50px", marginLeft: "20px"}}>Ngôn ngữ</Typography></Grid>
                        </Grid>
                        {
                          link && link.map((l, index1) => {                
                            return <div key={index1}>
                            {l && l[1].map((l1, index2) => {
                              
                              return <ListItem style={{paddingLeft: "25px"}} key={index2}>
                                <Grid item xs={10} sx={{display: "flex", marginTop: "1em"}}>
                                  <ListItemAvatar>
                                    <Avatar>
                                      <LinkIcon />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <Box sx={{display: "flex", flexDirection: "column", width: "300px"}}>
                                    <ListItemText primary={l1.site} sx={{color: "#fff"}}/>
                                    <Typography noWrap sx={{color: "#2065d1"}}><a href={l1.link} style={{color: "#2065d1", fontSize: "12px"}}>{l1.link}</a></Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={2} sx={{color: "#fff"}}>
                                  {l[0] == 'en' 
                                    ? <Flag style={{maxWidth: "50%"}} code={'gb'} /> 
                                    : l[0] == 'vi' 
                                      ? <Flag style={{maxWidth: "50%"}} code={'vn'}/> 
                                      : <Flag style={{maxWidth: "50%"}} code={'jp'} />
                                  }
                                </Grid>
                              </ListItem>
                            })}
                            </div>
                          }               
                          )
                        }
                        </Box>
                      </List>
                    </Grid>

                    {/* Comment */}
                    {/* <Divider sx={{margin: "20px 0 0 0"}}></Divider> */}
                    
                </Box>
                
            </Grid>

        </Grid>
        <Comment comments={data.comment} id={data.id} type={data.type} isComment={isComment}></Comment>
        <Box mt={5}>
            <Alert severity="info">Data clone từ server của <a href="https://zennomi.web.app/">Zennomi</a></Alert>
        </Box>
        <Box mt={2}>
            <Alert severity="info">Data crawl bằng bot nên khả năng bị sai nhiều, phiền bạn đăng nhập và bình luận vào bộ có thông tin sai nhé, bổ sung thông tin chuẩn nữa thì càng tốt! Cảm ơn nhiềuuu ♥</Alert>
        </Box>
    </Box>}
  </>
}

export default Anime;
