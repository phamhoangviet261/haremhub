// material
import { Box, Grid, Container, Typography,Alert, Button } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';


// change
import POSTS from '../_mocks_/blog';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch, PostCard } from '../components/_dashboard/blog';
// ----------------------------------------------------------------------
import { useDispatch } from 'react-redux'
import {changeUsername} from '../redux/actions'
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch =  useDispatch();

  const handleChangeUsername = () => {
    alert('click')
    dispatch(changeUsername("Viet"))
  }
  return (
    <Page title="Shiro | Trang Chủ">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
          <Button variant="text" onClick={handleChangeUsername}>Change username</Button>
        </Box>
        <Box sx={{ pb: 5 }}>
          <Alert variant="outlined" severity="info">Thư viện vẫn đang trong giai đoạn phát triển =))</Alert>
        </Box>
        <Box mb={5}>
          <PostCard></PostCard>
        </Box>
        <Grid container spacing={3}>
          
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
        <Grid container spacing={3} style={{marginTop: "20px"}}>
          
          <Grid item xs={12} md={6} lg={8}>
            {/* <AppNewsUpdate /> */}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {/* <AppOrderTimeline /> */}
          </Grid>

          
        </Grid>
      </Container>
    </Page>
  );
}
