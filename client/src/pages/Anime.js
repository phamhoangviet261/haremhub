import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

import {Typography, Box, Grid, Paper, Divider, Chip, Alert, Breadcrumbs, Link, List, ListItem, ListItemText, ListItemAvatar, Avatar  } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
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

function Anime() {
    const location = useLocation();
    let id = ''
    console.log(location.pathname);
    const type = location.pathname.split('/')[1]
    const [data, setData] = useState()
    const [link, setLink] = useState([])
    const { pathname } = useLocation();
    let URL = ``;
    let dataPost = null
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
      data = {
        "value": location.pathname.split('?').pop()
      }
    }
    console.log("URL", URL);
    useEffect(() => {
        let endpoint = ''
        let method = 'POST'
        
        let d = axios({
        method,
        url: URL,
        data: dataPost
        }).catch(err => {
        console.log(err);
        }).then(res => {
            console.log(res.data)
            setData(res.data)
            setLink(Object.entries(res.data.links))
        });
      }, [id, pathname])
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [id, pathname]);

      const handleClick = (event) => {
        // event.preventDefault();
        console.info('You clicked a breadcrumb.');
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
          Anime
        </Link>,
        <Typography key="3" color="text.primary">
          {data && data.name}
        </Typography>,
      ];

  return <>
    {data && <Box sx={{ flexGrow: 1, margin: "0 25px" }}>
        <Typography mb={2}>{data.name}</Typography>
        <Breadcrumbs mb={3} separator="›" aria-label="breadcrumb">
            {breadcrumbs}
        </Breadcrumbs>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Box sx={{ pt: '100%', position: 'relative', height: "450px" }}>
                    <ProductImgStyle alt={data.name} src={data.coverArt ? data.coverArt[0] : ''} />
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Box sx={{display: "flex", flexDirection: "column", padding: "15px 25px 35px 25px"}}>
                    <Box>
                    <a href="/dashboard/anime" style={{cursor: "pointer", textDecoration: "none"}}><Chip sx={{cursor: "pointer"}} color="error" label="ANIME"/></a>
                    <Chip sx={{marginLeft: "10px"}}color="success" label={data.status.toUpperCase()}/>
                    {data.originalLanguage && <Chip sx={{marginLeft: "10px"}}color="info" label={data.originalLanguage.toUpperCase()}/>}
                    </Box>
                    <Typography variant='h3' sx={{fontFamily: "'Quicksand', sans-serif", fontSize: "42px !important", fontWeight: "800"}}>{data.name.toUpperCase()}</Typography>
                    <Typography sx={{fontWeight: "700"}}>{data.altTitle}</Typography>
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
                    
                </Box>
                
            </Grid>

        </Grid>
        {/* list links to view */}
        <Grid container sx={{width: "auto"}}>
          
          <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'rgb(33, 43, 54)', borderRadius: "2em", marginTop: "50px" }}>
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
