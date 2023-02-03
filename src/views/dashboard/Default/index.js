import React,{ useEffect, useState } from 'react';
// material-ui
import { Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import room1 from '../../../assets/images/roomimg/room1.png';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography,Divider } from '@mui/material';
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
import RoomA1 from '../../../assets/images/roomimg/RoomA1.png';
import Slider from 'react-slick';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import UserIconGroup from 'assets/images/icons/UserIconGroup.png';
import AssignmentTitle from 'assets/images/roomimg/Assignment Title.png';
import Tilt from 'react-parallax-tilt';
import { Menu, MenuItem } from '@mui/material';
import Fade from '@mui/material/Fade';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 300,
    height: 250,
    // boxShadow: "0 4px 0px -10px;  #ccc",
    // boxShadow: "3.0331px 3.0331px 3.0331px rgba(0, 0, 0, 0.25)",


}));

const openLinkInNewTab = (url) => {

    const newTab = window.open(url, '_blank');
    if (newTab) newTab.opener = null;
};

function SamplePrevArrow(props) {
    const { className, style, onClick,  currentSlide, slideCount } = props;

    return (
        <div
            className={className}
            style={{ ...style,    display: currentSlide == 3  ?"block":"none", color: "black", backgroundColor: "grey", borderRadius: "30px",marginRight:"65px",left:"-43px", dropShadow:"3px 2px 5px #4444dd" }}
            onClick={() => onClick()}
        />
    );
}


function SampleNextArrow(props) {
    const { className, style, onClick, currentSlide, slideCount } = props;
    console.log("current=",currentSlide);
    console.log("slideCount=",slideCount);

    return (
        <div
            className={className}
            style={{ ...style,  display: currentSlide == 0   ?"block":"none", color: "black", backgroundColor: "grey", borderRadius: "30px",marginRight:"65px",dropShadow:"3px 2px 5px #4444dd" }}
            onClick={() => onClick()}
        />
    );
}

const onPrev = () => {
    console.log("ddd")
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow   onClick={onPrev}/>,
    prevArrow: <SamplePrevArrow />,
  
};


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
        { imageurl: RoomA1, title: "Maths Calculation", sharedNumber: '' },
        { imageurl: RoomA1, title: "English Grammar", sharedNumber: '+5' },
        { imageurl: RoomA1, title: "Analytic", sharedNumber: '+5' },

        { imageurl: RoomA1, title: "Artistic Elements", sharedNumber: '+5' },
        { imageurl: RoomA1, title: "Texture and Space", sharedNumber: '+5' },
        { imageurl: RoomA1, title: "Mathematics Problem", sharedNumber: '+5' },

    ];

  

    return (
        <React.Fragment>
            <Container>
                <Slider {...settings}  >
                    {createdByMeMockdatas.map((onedata, id) => (
                        // <Tilt  key={id}>
                       
                            <Item key={id}>
                               <ImageListItem sx={{ width: 300 }}>
                                    <img
                                        src={onedata.imageurl}
                                        alt="room1"
                                        loading="lazy"
                                        style={{ height: "170px", boxShadow: "3.0331px 3.0331px 3.0331px rgba(0, 0, 0, 0.25)"}}
                                     
                                    // onClick={ () => openLinkInNewTab('https://grwth.leoluca.io/?assignments=room2')}
                                    />
                               </ImageListItem>
                                {/* boxShadow:"0px 3.0331px 3.0331px rgba(0, 0, 0, 0.25)", borderRadius:"7.58274px 7.58274px 0px 0px" */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding:"10px", width:"300px", boxShadow: "3.0331px 8px 8px rgba(0, 0, 0, 0.25)"}}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <img src={UserIconGroup} alt="icon" loading="lazy" width={60} height={40}  />
                                        <Typography component="h2" variant="h5" sx={{ mr: 2 }}>
                                            {onedata.sharedNumber}
                                        </Typography>
                                        <Typography component="h3" variant="h4">
                                            {onedata.title}
                                        </Typography>
                                    </Box>
                                    {/* // boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.15)",background:"#F2F2F2",borderRadius:"30px" */}
                                    <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={handleclickstudentlistopen}>
                                        <PendingOutlinedIcon sx={{ color: '#2CC5CE', }} />

                                    </Box>
                                </Box>
                            </Item>
                        // </Tilt>
                    ))}
                </Slider>
            </Container>
        </React.Fragment>
    );

}

const RecentAssignmentsFormRow = () => {
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
    const navigate = useNavigate();


    const assignmentTitle = [
     
        { imageurl: AssignmentTitle, title: 'Grammar Assignment', sharedNumber: '+5' },
        { imageurl: AssignmentTitle, title: 'Calculation Problems', sharedNumber: '+5' },

        { imageurl: AssignmentTitle, title: 'Reading/Research Proposal', sharedNumber: '+5' },
        { imageurl: AssignmentTitle, title: 'My Favourite Book Essay', sharedNumber: '+5' },

        { imageurl: AssignmentTitle, title: 'Painting Assignment', sharedNumber: '' },
        { imageurl: AssignmentTitle, title: 'Personal Assignment', sharedNumber: '+5' },
    
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openpoper = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [shareOpen, setShareOpen] = useState(false);
    const handleShareOpen = () => {
        setShareOpen(true);
        setAnchorEl(null);
        navigate('/assignments')
    }


    return (
        <React.Fragment>
            <Container>
                <Slider {...settings}>
                    {assignmentTitle.map((oneassignment, id) => (
                    //   <Tilt key={id}>
                        <Item key={id}>
                            <ImageListItem sx={{ width: 300 }}  onClick={() => navigate('/studentlists')}>
                                <img
                                    src={oneassignment.imageurl}
                                    alt="room1"
                                    loading="lazy"
                                    style={{ height: "200px" }}
                                   

                                // onClick={ () => openLinkInNewTab('https://grwth.leoluca.io/?assignments=room2')}
                                />
                                <Typography component="h2" variant="h2" sx={{position:"absolute",top:"30%",margin:"0 25px",textAlign:"center",  }}>
                                    {oneassignment.title}
                                </Typography>
                            </ImageListItem>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: "6px 32px" }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <img src={UserIconGroup} alt="icon" loading="lazy" width={60} height={40} />

                                    <Typography component="h2" variant="h5" sx={{ mr: 2 }}>
                                        {oneassignment.sharedNumber}
                                    </Typography>


                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={handleclickstudentlistopen}>
                                    <PendingOutlinedIcon 
                                    variant="contained"
                                    aria-haspopup="true"
                                    aria-controls={openpoper ? 'fade-menu' : undefined}
                                    aria-expanded={openpoper ? 'true' : undefined}
                                    onClick={handleClick}
                                    sx={{margin:"15px 75px", color:"#2CC5CE"}}
                                    >
                                    </PendingOutlinedIcon>

                                    <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button'
                                    }}
                                    anchorEl={anchorEl}
                                    open={openpoper}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                    sx={{width:"130px"}}
                                >
                                    {/* <MenuItem onClick={handleClickOpen} sx={{"&:hover": { color: "white",backgroundColor:"#2CC5CE" }}}>Share Link</MenuItem> */}
                                    <MenuItem onClick={handleShareOpen} sx={{"&:hover": { color: "white",backgroundColor:"#2CC5CE" }, color:"#2CC5CE"}}>Share Link</MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleDeleteOpen();
                                            setDeleteId(row.calories);
                                        }}
                                       sx={{"&:hover": { color: "white",backgroundColor:"#2CC5CE" },  color:"#2CC5CE"}}
                                    >
                                        Delete
                                    </MenuItem>
                                    <MenuItem  sx={{"&:hover": { color: "white",backgroundColor:"#2CC5CE" },  color:"#2CC5CE"}}>Download</MenuItem>
                                 
                                   </Menu>
                                </Box>
                            </Box>
                        </Item>
                    //   </Tilt>
                    ))}

                </Slider>
            </Container>
        </React.Fragment>
    );

};

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const theme = useTheme();
    useEffect(() => {
        setLoading(false);
    }, []);
    const navigate = useNavigate();
  

    return (

        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4} sx={{ mx: 'auto' }}>
                <Box sx={{ mt: '30px' }}>
                    <Typography component="h2" variant="h3">
                        My projects
                    </Typography>
                </Box>

                <Grid container item spacing={1}>
                    <FormRow />
                </Grid>
                {/* <Grid container item spacing={1}>
                <FormRow />
            </Grid> */}
                <Divider sx={{ mt: 3, mb: 1, backgroundColor: '#DBDBDB' }} style={{ height: 3,width:"100%" }} />

                <Box sx={{ mt: '30px' }}>
                    <Typography component="h2" variant="h3">
                        Recent Assignments
                    </Typography>
                </Box>
                <Grid container item spacing={1}>
                    <RecentAssignmentsFormRow />
                </Grid>
            </Grid>
        </Box>
    );


};

export default Dashboard;
