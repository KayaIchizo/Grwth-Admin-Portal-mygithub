// next
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography, Grid } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// guards
import GuestGuard from 'src/guards/GuestGuard';
// components
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import LoginForm from 'src/components/LoginForm';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const BannerSectionStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const BackgroundImageGrid = styled(Grid)(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url("/assets/bg_login.webp")',
}));

// ----------------------------------------------------------------------

export default function Login() {
  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Login">
        <Grid container >
          <Grid item xs={12} md={6}>
            <Container maxWidth="sm">
              <ContentStyle>
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      Sign In
                    </Typography>
                  </Box>
                </Stack>
                <LoginForm />
              </ContentStyle>
            </Container>
          </Grid>
          {mdUp && (<BackgroundImageGrid item xs={12} md={6}>
            <Container maxWidth="sm">
              <BannerSectionStyle>
                <Stack direction="row" alignItems='center' spacing={2}>
                  <Logo />
                  <Stack direction="column" spacing={.5}>
                    <Typography
                      variant="h4"
                    >
                      FUTUREVERSE
                    </Typography>
                    <Typography
                      variant="caption"
                      color={'primary.main'}
                    >
                      SUBHEADING
                    </Typography>
                  </Stack>
                </Stack>
              </BannerSectionStyle>
            </Container>
          </BackgroundImageGrid>)}
        </Grid>
      </Page>
    </GuestGuard>
  );
}
