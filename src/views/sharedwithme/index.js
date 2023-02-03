import React from 'react';
import { useEffect, useState } from 'react';
// material-ui
import { Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import room1 from 'assets/images/roomimg/room1.png';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography } from '@mui/material';
import { Card } from '@mui/material';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
// ==============================|| DEFAULT DASHBOARD ||============================== //
import RoomA1webp from 'assets/images/roomimg/RoomA_V1.webp';
import RoomA1 from 'assets/images/roomimg/RoomA1.png';
import Slider from 'react-slick';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import UserIconGroup from 'assets/images/icons/UserIconGroup.png';
import AssignmentTitle from 'assets/images/roomimg/Assignment Title.png';
import Divider from '@mui/material/Divider';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 330,
    height: 280,
    boxShadow: "3.0331px  3px 3.0331px rgba(0, 0, 0, 0.25)",
    marginTop:63
    
    // transform: "rotate(90deg)",
    
}));

function FormRow() {
    const Userlist = [{ title: 'Everyone' }, { title: 'Joby' }, { title: 'Alan' }, { title: 'Kaya' }, { title: 'Noah' }];
    const [openstudentlist, Setopenstudentlist] = useState(false);
    const handleclickstudentlistopen = () => {
        Setopenstudentlist(true);
    };
    const handleclickstudentlistclose = () => {
        Setopenstudentlist(false);
    };

    const currentDate = new Date();
    const toIsodate = currentDate.toISOString();
    const toIsodate1 = toIsodate.slice(0, -5);

    

    const createdByMeMockdatas = [
        { imageurl: RoomA1, title: "Room Name", sharedNumber: '' },
        { imageurl: RoomA1, title: "Room Name", sharedNumber: '+5' },
        { imageurl: RoomA1, title: "Room Name", sharedNumber: '+5' },

        { imageurl: RoomA1, title: "Room Name", sharedNumber: '' },
        { imageurl: RoomA1, title: "Room Name", sharedNumber: '+5' },
        { imageurl: RoomA1, title: "Room Name", sharedNumber: '+5' },

        { imageurl: RoomA1, title: "Room Name", sharedNumber: '' },
        { imageurl: RoomA1, title: "Room Name", sharedNumber: '+5' },
        { imageurl: RoomA1, title: "Room Name", sharedNumber: '+5' },

        { imageurl: RoomA1, title: "Room Name", sharedNumber: '' },
        { imageurl: RoomA1, title: "Room Name last", sharedNumber: '+5' },
        { imageurl: RoomA1, title: "Room Name", sharedNumber: '+5' }
    ];

  
    return (
        <React.Fragment>
            <Grid container spacing={0}>
                    {createdByMeMockdatas.map((onedata, index) => (
                        //spacing size problem
                        <Grid container spacing={0} xs={4} item  key={index}>  
                            <Item>
                                <ImageListItem  >
                                    <img
                                        src={onedata.imageurl}
                                        alt="room1"
                                        loading="lazy"
                                    
                                    
                                        // onClick={ () => openLinkInNewTab('https://grwth.leoluca.io/?assignments=room2')}
                                    />
                                </ImageListItem>
                                {/* boxShadow:"0px 3.0331px 3.0331px rgba(0, 0, 0, 0.25)", borderRadius:"7.58274px 7.58274px 0px 0px" */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mt: 1.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <img src={UserIconGroup} alt="icon" loading="lazy" width={60} height={40} />
                                        <Typography component="h2" variant="h5" sx={{ mr: 2 }}>
                                            {onedata.sharedNumber}
                                        </Typography>
                                        <Typography component="h2" variant="h2">
                                            {onedata.title}
                                        </Typography>
                                    </Box>
                                       {/* // boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.15)",background:"#F2F2F2",borderRadius:"30px" */}
                                    <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={handleclickstudentlistopen}>
                                        <PendingOutlinedIcon sx={{ color: '#2CC5CE',  }} />
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                    ))}
            
            </Grid>
        </React.Fragment>
    );
  
}

const Sharedwithme = () => {
    const [isLoading, setLoading] = useState(true);
    const theme = useTheme();
    useEffect(() => {
        setLoading(false);
    }, []);
  
    return (
     
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} sx={{ mx: 'auto' }}>
                <Box sx={{ mt: '10px' }}>
                    <Typography component="h2" variant="h3"  sx={{fontFamily:"Livvic"}}>
                       Shared with me
                    </Typography>
                </Box>

                <PerfectScrollbar
                    component="div"
                    options={{ maxScrollbarLength: 150, scrollYMarginOffset: 7,wheelSpeed: 0.5,color:"#2CC5CE"}}
                    style={{
                        height:  'calc(100vh - 56px)',
                        paddingLeft: '80px',
                        paddingRight: '16px',
                        borderRight: "6px solid #DBDBDB",
                        
                   
                    }}
                >

                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>
                </PerfectScrollbar>
        
            </Grid>
        </Box>
    );
}

export default Sharedwithme;