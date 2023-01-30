// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { alpha, Box, Divider, MenuItem, Typography } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import MyAvatar from '../../../components/MyAvatar';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useState } from 'react';
import MenuPopover from 'src/components/MenuPopover';
import { IconButtonAnimate } from 'src/components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2.5),
  paddingBottom: theme.spacing(1),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined;
};

// ----------------------------------------------------------------------

export default function NavbarAccount({ isCollapse }: Props) {
  const router = useRouter();

  const { user, logout, isQaAdmin } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <IconButtonAnimate
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              '&:before': {
                zIndex: 1,
                content: "''",
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              },
            }),
          }}
        >
          <MyAvatar />
        </IconButtonAnimate>

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {isQaAdmin? "QA-Admin" : "QA-User"}
          </Typography>
        </Box>
        <MenuPopover
          open={Boolean(open)}
          anchorEl={open}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          arrow="bottom-left"
          onClose={handleClose}
          sx={{
            p: 0,
            mt: 1.5,
            ml: 0.75,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          }}
        >
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle2" noWrap>
              {user?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {user?.email}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* <Stack sx={{ p: 1 }}>
            {navAccountAvatarMenu.map((option) => (
              <NextLink key={option.label} href={option.linkTo} passHref>
                <MenuItem key={option.label} onClick={handleClose}>
                  {option.label}
                </MenuItem>
              </NextLink>
            ))}
          </Stack> */}

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
            Logout
          </MenuItem>
        </MenuPopover>
      </RootStyle>
    </>
  );
}
