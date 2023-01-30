import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// assets
import { IconMenu2, IconBell } from '@tabler/icons';
import Stack from '@mui/material/Stack';
import usericon from 'assets/images/icons/UserIcon.webp';
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: '#7983FF',
                    alignItems: 'center',
                    textAlign: 'center',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span">
                    <LogoSection />
                </Box>
                {/* <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase> */}
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', pr: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <IconBell style={{ color: '#FFFFFF', width: '35px', height: '35px' }} />
                        <img src={usericon} alt="UserIcon" width={32} height={32} style={{ borderRadius: '50%' }} />
                    </Stack>
                </Box>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            {/* <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} /> */}

            {/* notification & profile */}

            {/* <ProfileSection /> */}
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
