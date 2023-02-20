import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { Container, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import SearchComponent from 'react-material-ui-searchbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import { userRows } from '../../components/Datagrid/dummyData';
import ImageListItem from '@mui/material/ImageListItem';
import room1 from '../../assets/images/roomimg/room1.png';
import { IconUserCircle } from '@tabler/icons';
// import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import PendingOutlinedIcon from '@mui/icons-material';
import Popover from '@mui/material/Popover';
import { Link } from 'react-router-dom';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { styled } from "@mui/material/styles";
import RoomA1 from 'assets/images/roomimg/RoomA_V1.webp';
import RoomA_Items1 from 'assets/images/roomimg/RoomA_Items1.webp';
import RoomA_Items2 from 'assets/images/roomimg/RoomA_Items2.webp';
import RoomA_Items3 from 'assets/images/roomimg/RoomA_Items3.webp';
import RoomA_Items4 from 'assets/images/roomimg/RoomA_Items4.webp';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import Paper from '@mui/material/Paper';
import UserIconGroup from 'assets/images/icons/UserIconGroup.png';
import {
    IconHeart,
    IconArchive
} from '@tabler/icons';
import axios from 'axios';


const icons = { IconHeart, IconArchive };
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 280,
    height: 300,
    // boxShadow: "3.0331px 0px 3.0331px rgba(0, 0, 0, 0.25)",
    boxShadow: "0 8px 8px 3px rgb(0 0 0 / 25%)",
    marginTop:30
    // transform: "rotate(90deg)",
}));

// Library page 
const Library = () => {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const theme = useTheme();
    const StyledTab = styled(Tab)({
        "&.Mui-selected": {
            color: theme.palette.background.primaryColor
        }
    });

    const [roomdata, setRoomdata] = useState([]);
    const [objectdata, setObjectdata] = useState([]);


    useEffect(() => {
  
        const getlibraryroom = async () => {
            const res = await axios.post('http://localhost:3000/api/library/usericon',{   // get favourite icon status setting
                userinfo:localStorage.getItem("userinfo"),
                type:"Room"
            })
            setRoomdata(res.data);
          }
        getlibraryroom();

        const getlibraryobject = async () => {
            const res = await axios.post('http://localhost:3000/api/library/getobject',{ 
                userinfo:localStorage.getItem("userinfo"),
                type:"Object"
            })
        
            setObjectdata(res.data);
        }
        getlibraryobject();  
    },[])



    const FormRow = () => {
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
        const roomname = "Room A";
        const [iconHeart, SetIconHeart] = useState(-1);
     

        async function iconheartclickdatabase(title, check) {
            const userinfo = localStorage.getItem('userinfo');
         
            const updateresult = await axios.post("http://localhost:3000/api/library/favourite", {
               userinfo,title,check,type:"Room"
            })
            setRoomdata(updateresult.data);

        }
    
        return (
            <React.Fragment>
                <Grid container spacing={4}>
                    {roomdata.map((onedata, index) => (
                        //spacing size problem
                        <Grid container spacing={0} xs={3} item key={index}>
                            <Item>
                                <ImageListItem sx={{ mt: 7 }}>
                                    <img
                                        src={RoomA1}
                                        alt="room1"
                                        loading="lazy"
                                        style={{width:"270px", height:"200px"}}
    
                                    // onClick={ () => openLinkInNewTab('https://grwth.leoluca.io/?assignments=room2')}
                                    />
                                </ImageListItem>
                                {/* boxShadow:"0px 3.0331px 3.0331px rgba(0, 0, 0, 0.25)", borderRadius:"7.58274px 7.58274px 0px 0px" */}
                                <Box sx={{ display: 'flex', justifyContent: "space-between", padding: "0px 13px" }}>
                                    <Typography component="h2" variant="h2">
                                          
                                    </Typography>
                                    <IconHeart style = {onedata.favourite == true ?{fill:"#CE2C2C"}:{}} onClick = {() => iconheartclickdatabase(onedata.title,onedata.favourite)}/>
                                </Box>
    
                            </Item>
                            <Typography component="h2" variant="h2" sx={{mt:2,fontFamily:"Livvic"}}>
                                        {onedata.title}
                            </Typography>
    
                        </Grid>
    
                    ))}
    
                </Grid>
            </React.Fragment>
        );

    }


    

function ObjectRoom() {


    const currentDate = new Date();
    const toIsodate = currentDate.toISOString();
    const toIsodate1 = toIsodate.slice(0, -5);


    async function iconObjectClick(id, check) {
        const userinfo = localStorage.getItem('userinfo');
     
        const updateresult = await axios.post("http://localhost:3000/api/library/objectfavourite", {
           id:id, check, type:"Object", userinfo
        })
 
        setObjectdata(updateresult.data);

    }

    const [iconObject, SetIconObject] = useState(-1);
    return (
        <React.Fragment>
            <Grid container spacing={4}>
                {objectdata.map((onedata, index) => (
                    //spacing size problem
                    <Grid container spacing={-2} xs={3} item key={index}>
                        <Item>
                            <ImageListItem sx={{ mt: 7 }}>
                                <img
                                    src={onedata.imageurl}
                                    alt="room1"
                                    loading="lazy"
                                    style={{width:"270px", height:"200px"}}
                                // onClick={ () => openLinkInNewTab('https://grwth.leoluca.io/?assignments=room2')}
                                />
                            </ImageListItem>
                            {/* boxShadow:"0px 3.0331px 3.0331px rgba(0, 0, 0, 0.25)", borderRadius:"7.58274px 7.58274px 0px 0px" */}
                            <Box sx={{ display: 'flex', justifyContent: "space-between", padding: "0px 13px" }}>
                                <Typography component="h2" variant="h2">
                                </Typography>
                                <IconHeart  style = {onedata.favourite == true ?{fill:"#CE2C2C"}:{}} onClick = {() => iconObjectClick(onedata._id,onedata.favourite)}/>
                            </Box>

                        </Item>
                        <Typography component="h2" variant="h2" sx={{mt:2,fontFamily:"Livvic"}}>
                                    {onedata.title}
                        </Typography>

                    </Grid>

                ))}

            </Grid>
        </React.Fragment>
    );

}


   
    
    return (
        <Box>
            <Box sx={{ mt: '0px' }}>
                <Typography component="h2" variant="h3" sx={{fontFamily:"Livvic"}}>
                    Library
                </Typography>
            </Box>
            <TabContext value={value}>
                {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
                <TabList onChange={handleChange} aria-label="lab API tabs example" TabIndicatorProps={{
                    style: { background: theme.palette.background.primaryColor }}} 
                 
                    >
                    <StyledTab label="Room" value="1" />
                    <StyledTab label="Object" value="2" />
                </TabList>

                <TabPanel value="1">
                    <PerfectScrollbar
                        component="div"
                        options={{ maxScrollbarLength: 150, scrollYMarginOffset: 7,wheelSpeed: 0.5,color:"#2CC5CE"}}
                        style={{
                            height:  'calc(100vh - 56px)',
                            paddingLeft: '40px',
                            paddingRight: '16px',
                            borderRight: "6px solid #DBDBDB",
                            
                    
                        }}
                    >
                        <Grid container item spacing={1}>
                            <FormRow />
                        </Grid>
                    </PerfectScrollbar>

                </TabPanel>
                <TabPanel value="2">
                <PerfectScrollbar
                    component="div"
                    options={{ maxScrollbarLength: 150, scrollYMarginOffset: 7,wheelSpeed: 0.5,color:"#2CC5CE"}}
                    style={{
                        height:  'calc(100vh - 56px)',
                        paddingLeft: '40px',
                        paddingRight: '16px',
                        borderRight: "6px solid #DBDBDB",
                        
                   
                    }}
                >
                        <Grid container item spacing={1}> 
                            <ObjectRoom />
                        </Grid>
                     
                </PerfectScrollbar>

                </TabPanel>
            </TabContext>
        </Box>
    )

}

export default Library;