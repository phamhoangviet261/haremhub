import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import {
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Chip,
  Alert,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Rating,
  Tooltip,
  IconButton,
  Snackbar
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

import Comment from 'src/components/_dashboard/products/Comment';
import { SERVER } from '../config';

import Flag from 'react-world-flags';

import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  marginTop: '15px',
  borderRadius: '1em'
});

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75'
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47'
  }
});

function Movie() {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  const [data, setData] = useState();
  const [link, setLink] = useState([]);
  const [isComment, setIsComment] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { pathname } = useLocation();
  let URL = `${SERVER}/api/movie/${slug}`;

  useEffect(() => {
    let endpoint = '';
    let method = 'get';

    let d = axios({
      method,
      url: URL,
      data: {}
    })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        // setLink(Object.entries(res.data.data.links))
        // setIsComment(res.data.isCommented)
      });
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleClick = (event) => {
    // event.preventDefault();
    console.info('You clicked a breadcrumb.');
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
      Trang chủ
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/dashboard/movie" onClick={handleClick}>
      {'movie'.toLocaleUpperCase()}
    </Link>,
    <Typography key="3" color="text.primary">
      {data && data.name}
    </Typography>
  ];

  return (
    <>
      {data && (
        <Box sx={{ flexGrow: 1, margin: '0 25px' }}>
          {/* <Typography mb={2}>{data.name}</Typography> */}
          <Alert variant="outlined" severity="info" sx={{ marginBottom: '20px' }}>
            Thư viện vẫn đang trong giai đoạn phát triển nên thông tin các bộ có thể còn thiếu sót
          </Alert>
          <Breadcrumbs mb={3} separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <Grid container spacing={2} id="grid-anime">
            <Grid item xs={3}>
              <Box sx={{ pt: '100%', position: 'relative', height: '450px' }}>
                <ProductImgStyle alt={data.name} src={data.thumb_url ? data.thumb_url : ''} />
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', padding: '15px 25px 35px 25px' }}
              >
                <Box>
                  <a
                    href="/dashboard/movie"
                    style={{
                      cursor: 'pointer',
                      textDecoration: 'none',
                      marginRight: '10px',
                      marginTop: '10px'
                    }}
                  >
                    <Chip
                      sx={{ cursor: 'pointer', marginTop: '10px' }}
                      color="error"
                      label="MOVIE"
                    />
                  </a>
                  <Chip
                    sx={{ marginRight: '10px', marginTop: '10px' }}
                    color="success"
                    label={data.status.toUpperCase()}
                  />
                  {data.originalLanguage && (
                    <Chip
                      sx={{ marginRight: '10px', marginTop: '10px' }}
                      color="info"
                      label={data.originalLanguage.toUpperCase()}
                    />
                  )}
                  <Chip
                    sx={{ marginRight: '10px', marginTop: '10px' }}
                    color="secondary"
                    label={'Score: ' + parseInt(data.score) / 10}
                  />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: '42px !important',
                    fontWeight: '800'
                  }}
                >
                  {data.name.toUpperCase()}
                </Typography>
                <Typography sx={{ fontWeight: '700' }}>{data.name}</Typography>
                <StyledRating
                  name="customized-color"
                  defaultValue={data.avgRating ? data.avgRating : 5}
                  getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  precision={1}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  readOnly
                  sx={{ marginTop: '10px' }}
                />
                <Box sx={{ marginTop: '20px' }}>
                  {data.actor &&
                    data.actor.map((s, index) => (
                      <Chip
                        key={index}
                        sx={{ margin: '5px', cursor: 'pointer' }}
                        label={s}
                        color="primary"
                        clickable
                      />
                    ))}
                </Box>
                <Divider sx={{ margin: '10px 0' }}></Divider>
                <Typography sx={{ fontWeight: '700' }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: data.content }}
                    style={{ fontSize: '14px' }}
                  ></div>
                </Typography>
                <Divider sx={{ margin: '10px 0' }}></Divider>
                {/* <Typography>Tags:</Typography>
                    <Box>
                        {data.tags && data.tags.map((tag, index) => <Chip key={index} sx={{margin: "5px", cursor: "pointer"}} label={tag} color="primary" variant="outlined" clickable/>)}
                    </Box>
                    {data.genres.length > 0 ? <Divider sx={{margin: "10px 0"}}></Divider> : <></>}
                    <Typography>Thể loại:</Typography>
                    <Box>
                        {data.genres && data.genres.map((genre, index) => <Chip key={index} sx={{margin: "5px", cursor: "pointer"}} label={genre} color="warning" variant="outlined" clickable/>)}
                    </Box> */}
                {/* list links to view */}
                <Divider sx={{ margin: '10px 0' }}></Divider>

                {/* Comment */}
                {/* <Divider sx={{margin: "20px 0 0 0"}}></Divider> */}
              </Box>
            </Grid>
          </Grid>
          {/* <Comment comments={data.comment} id={data.id} type={data.type} isComment={isComment}></Comment> */}

          <Box mt={20}>
            <ViewListEpisodes movie={data}></ViewListEpisodes>
          </Box>
          <Box mt={5}>
            <Alert severity="info">
              Data clone từ server của <a href="https://zennomi.web.app/">Zennomi</a>
            </Alert>
          </Box>
          <Box mt={2}>
            <Alert severity="info">
              Data crawl bằng bot nên khả năng bị sai nhiều, phiền bạn đăng nhập và bình luận vào bộ
              có thông tin sai nhé, bổ sung thông tin chuẩn nữa thì càng tốt! Cảm ơn nhiềuuu ♥
            </Alert>
          </Box>
        </Box>
      )}
    </>
  );
}

const ViewListEpisodes = ({ movie }) => {
  const StyledContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column'
  });

  const StyledServerItem = styled('span')({
    textDecoration: 'none',
    color: '#ffffff',
    padding: '5px 15px',
    cursor: 'pointer',
    '&:hover': {
      background: '#f00'
    }
  });

  const StyledLinkItem = styled('div')((props) =>({
	display: 'flex',
    textDecoration: 'none',
    color: '#ffffff',
    padding: '10px 15px',
    cursor: 'pointer',
	  background: `${(props) => props.isChoose ? '#5dafec' : 'none'}`,
    '&:hover': {
      background: '#5dafec'
    }
  }));

  const [server, setServer] = useState(0);
  const [movieEmbed, setMovieEmbed] = useState(movie.episodes[0].server_data[0].link_embed);
  const [currentChapter, setCurrentChapter] = useState('');

  const handleSetMovieEmbed = (link, chapter) => {
	setMovieEmbed(link);
	setCurrentChapter(chapter);
	document.getElementById('fake-iframe').scrollIntoView({
		behavior: 'smooth'
	});
  }

  return (
    <>
		<div id="fake-iframe" style={{height: '20px'}}></div>
      <Box
        mt={5} mb={1}
        style={{ position: 'relative', overflow: 'hidden', width: '100%', paddingTop: '56.25%' }}
      >
		
        <iframe
          id="preview-frame"
          src={movieEmbed}
          name="preview-iframe"
          frameborder="0"
          noresize="noresize"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
            width: '95%',
            height: '95%'
          }}
        ></iframe>
      </Box>
	  <Box mb={2}>
		PLAYING:  {currentChapter}
	  </Box>
      <div className="">
        SERVER:{' '}
        {movie &&
          movie.episodes.map((e, index) => (
            <StyledServerItem
              onClick={() => setServer(index)}
              key={index}
              className={'' + (server == index ? '' : '')}
            >
              {e.server_name}
            </StyledServerItem>
          ))}
      </div>
      <StyledContainer className="">
        {movie &&
          movie.episodes[server].server_data.map((e, index1) => (
            <StyledLinkItem key={`${e.link_embed}`} className="" isChoose={true}>
              <span onClick={() => handleSetMovieEmbed(e.link_embed, e.filename)} style={{flex: '1'}}>
                {e.name} - {e.filename}
              </span>
			  <a style={{color: 'red'}} href={e.link_m3u8}>Download</a>
            </StyledLinkItem>
          ))}
      </StyledContainer>
    </>
  );
};

export default Movie;
