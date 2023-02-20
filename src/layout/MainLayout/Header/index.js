import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase,Typography } from '@mui/material';
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
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const [queryParameters] = useSearchParams();
    const [code, setCode] = useState(queryParameters.get("code"));
    const navigate = useNavigate();
    const [userinfo, setUserinfo] = useState([]);
    const [user, setUser] = useState({});

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(async () => {


        async function init() {
            const data = await localStorage.getItem('userinfo'); 
            setUserinfo(JSON.parse(data));
          
          }
          init();
  
    },[])

    const removefunc = () => {
        localStorage.removeItem('userinfo');
        localStorage.removeItem('accesstoken');
        navigate('/');
    }


    return (
        <>
        {
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
             <Box sx={{ display: 'flex', justifyContent: 'space-evenly', pr: 4,justifyContent:"center", alignItems:"center" }}>
                 <Box sx={{mr:6}}>
                     <Typography
                         variant="h6"
                         component="h6"
                         sx={{ pl:2, fontWeight: '500', font: 'Lalezar', fontStyle: 'normal', color: '#FFFFFF', fontSize: '15px',fontFamily:"Livvic", cursor:"pointer"  }}
                     >
                       {userinfo != "" && userinfo}
                     </Typography>
                 </Box>

                 <Stack direction="row" spacing={2}>
                     <IconBell style={{ color: '#FFFFFF', width: '35px', height: '35px' }} />
                     <img src={usericon} alt="UserIcon" width={32} height={32} style={{ borderRadius: '50%' }} />
                 </Stack>
             </Box>
         </Box>

        }
         
   
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
