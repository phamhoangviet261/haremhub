import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, 
    CardContent, CardHeader, Button } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../SvgIconStyle';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------


export default function PostCard() {
  

  return (
    <Grid container style={{justifyContent: "space-between"}}>
      <Grid container xs={8}>
        <Card variant="outlined" style={{width: "100%", display: "flex",justifyContent: "space-between",  backgroundColor: "#ead1d1"}}>
            <Grid item xs={6} sx={{padding: "10px 10px 0 10px "}}>
                <CardContent>
                    <Typography sx={{fontSize: "30px", fontWeight: "900"}} gutterBottom>Yahalost,</Typography>
                    <Typography variant="body2" color="text.secondary">Shiro, một nam sinh viên đại học bình thường có thể tìm thấy ở bất cứ nơi đâu, nhân dịp nghỉ Tết 2022 đã code trang web chứa toàn bộ romcom mà <a href="https://zennomi.web.app/homepage">Zennomi</a> đã đọc/xem.</Typography>
                    <Button sx={{marginTop: "20px"}} href="/dashboard/anime" variant="outlined">Check hàng ngay</Button>
                </CardContent>
            </Grid>
            <Grid item xs={6} style={{height: "100%"}}>
                <img style={{height: "100%"}} src="/static/mock-images/covers/cover_7.jpg" alt="huhu"/>
            </Grid>
        </Card>
      </Grid>
      <Grid item xs={3.7}>
            <Card variant="outlined" style={{width: "100%", height: "100%"}}>
                <img style={{height: "100%"}} src="/static/mock-images/covers/cover_5.jpg" alt="huhu"/>
            </Card>
      </Grid>
    </Grid>
  );
}
