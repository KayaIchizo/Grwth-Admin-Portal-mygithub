import React from 'react';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
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
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
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
import Paper from '@mui/material/Paper';
import UserIconGroup from 'assets/images/icons/UserIconGroup.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";
import {
    IconHeart,
    IconArchive
} from '@tabler/icons';
const icons = { IconHeart, IconArchive };

//custom material ui paper
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 280,
    height: 300,
    marginTop: 0,
    boxShadow: "0 8px 8px 3px rgb(0 0 0 / 25%)",
    // boxShadow: "3.0331px 2px 3.0331px rgba(0, 0, 0, 0.25)",

}));

const Favourites = () => {   // Favourite page
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const theme = useTheme(); //using theme
    const StyledTab = styled(Tab)({
        "&.Mui-selected": {
            color: theme.palette.background.primaryColor
        }
    });

    const [favouritedata, setFavouritedata] = useState([]);

    useEffect(() => {
        const getfavouriteroom = async () => {
            const res = await axios.post('http://localhost:3000/api/favourite/likeicon', {
                userinfo: localStorage.getItem("userinfo"),
                favourite: true
            })

            setFavouritedata(res.data);
        }
        getfavouriteroom(); // get favourite func using userinfo

    }, [])


    const FavouriteRoom = () => {
        const currentDate = new Date();
        const toIsodate = currentDate.toISOString();
        const toIsodate1 = toIsodate.slice(0, -5);

        return (
            <React.Fragment>
                <Grid container spacing={9} sx={{ ml: "18px" }}>
                    {favouritedata.map((onedata, index) => (
                        //spacing size problem
                        <Grid container spacing={0} xs={3} item key={index}>
                            <Item>
                                <ImageListItem sx={{ mt: 7 }}>
                                    <img
                                        src={onedata.imageurl}
                                        alt="room1"
                                        loading="lazy"
                                        style={{ width: "270px", height: "200px" }}
                                    // onClick={ () => openLinkInNewTab('https://grwth.leoluca.io/?assignments=room2')}
                                    />
                                </ImageListItem>

                                <Box sx={{ display: 'flex', justifyContent: "space-between", padding: "0px 13px" }}>
                                    <Typography component="h2" variant="h2" sx={{ fontFamily: "Livvic" }}>
                                    </Typography>
                                    <IconHeart style={{ fill: '#CE2C2C' }} />
                                </Box>

                            </Item>
                            <Typography component="h2" variant="h2" sx={{ fontFamily: "Livvic", mt: 2 }}>
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
            <Box>
                <Typography component="h2" variant="h3" sx={{ fontFamily: "Livvic" }}>
                    Favourites
                </Typography>
            </Box>

            <Grid container item spacing={1} sx={{ mt: 5 }}>
                <FavouriteRoom />
            </Grid>

        </Box>
    )

}

export default Favourites;