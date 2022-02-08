import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="Shiro | Register">
      <AuthLayout>
        Có tài khoản rồi thì &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Đăng nhập
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Join with Shiro
          </Typography>
          <img alt="register" src="/static/illustrations/register.png"  style={{maxHeight: "400px"}}/>
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Đăng ký ở đây 
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Chúng tôi cam kết không đánh cắp thông tin người dùng =))
            </Typography>
          </Box>

          <AuthSocial />

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            Bằng cách đăng ký, bạn đồng ý với&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Điều khoản dịch vụ
            </Link>
            &nbsp;và&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Chính sách bảo mật
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Có tài khoản rồi thì&nbsp;
              <Link to="/login" component={RouterLink}>
                Đăng nhập
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
