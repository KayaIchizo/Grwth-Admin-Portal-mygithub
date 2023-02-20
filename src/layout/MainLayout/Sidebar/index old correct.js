import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import MenuCard from './MenuCard';
import { drawerWidth } from 'store/constant';
import Calendarview from './MenuCard/calendar';
import { IconBrandChrome, IconHelp, IconHome, IconTrash, IconPlus, IconX } from '@tabler/icons';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
// import Select from '../../../components/select/select';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import QuestionMarkSharpIcon from '@mui/icons-material/QuestionMarkSharp';
import AddHomeIcon from '@mui/icons-material/AddHome';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { closest } from '@syncfusion/ej2-base';
import axios from 'axios';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, windowobject }) => {

    const [selectclass, setSelectclass] = useState([]);
    const [selectsubject, setSelectsubject] = useState([]);
    const [sendclass, setSendclass] = useState('');
    const [sendsubject, setSendsubject] = useState('');
    const [sendtitle, setSendtitle] = useState('');
    const [sendnum, setSendnum] = React.useState();
    const [senddatetime, setSenddatetime] = React.useState();
    useEffect(async () => {
        const gettype = async () => {
            const resclassdata = await axios.post('http://localhost:3000/api/findClass', {
                Authorization: 'Bearer' + JSON.parse(localStorage.getItem("accesstoken"))
            });
            setSelectclass(resclassdata.data)
            const ressubjectdata = await axios.post('http://localhost:3000/api/findSubjects', {
                Authorization: 'Bearer' + JSON.parse(localStorage.getItem("accesstoken"))
            });
            setSelectsubject(ressubjectdata.data)
        }
        gettype();
    }, [])


    const handlechangeSubjectdialog = (e) => {
        setSendsubject(e.target.value)
        setsubjectdialog(e.target.value);
    }

    const [classType, setClassType] = useState('');
    const handleChangeClass = (e) => {
        setSendclass(e.target.value);
        setClassType(e.target.value);
    }


    const titleclick = (e) => {
        setSendtitle(e.target.value)
    }

    const datetimechange =  (e) => {
        setSenddatetime(e.target.value)
    }

    const [assigninsertdata, setAssignmentinsertdata] = useState([]);


    const assignmentassignClick = (async () => {
     
        listdata.map(async (onedata, index) => {
        assigninsertdata.push( { "name": onedata,
                "subject": sendsubject,
                "class": sendclass,
                "title": sendtitle,
                "gradeormark": sendnum,
                "duedate": senddatetime,
                "status":"New"});
        });
        
        await axios.post('http://localhost:3000/api/assignments/insert', {
            assigninsertdata
        }).then((response)=>{
            setAssignmentinsertdata([]);
        });

     

      
    })



    const [checkStudent, setCheckStudent] = useState('teacher');
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openpoper = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        setAnchorEl(null);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    const openLinkInNewTab = (url) => {
        const newTab = window.open(url, '_blank');
        if (newTab) newTab.opener = null;
        setAnchorEl(null);
    };
    const [dialogvalue, setdialogValue] = useState('1');
    const handleChange = (event, newValue) => {
        setdialogValue(newValue);
    };

    const [selectedValue, setSelectedValue] = useState('a');
    const handleChangeradiobutton = (event) => {
        setSelectedValue(event.target.value);
    };

    const Subjectoptions = [
        { key: 'English', value: 'English' },
        { key: 'Maths', value: 'Maths' },
        { key: 'Nature', value: 'Nature' },
        { key: 'Music', value: 'Music' }
    ];
    const Classoptions = [
        { key: 'A1', value: 'A1' },
        { key: 'A2', value: 'A2' },
        { key: 'B1', value: 'B1' },
        { key: 'B2', value: 'B2' },
        { key: 'C1', value: 'C1' },
        { key: 'C2', value: 'C2' }
    ];
    const Classlist = [{ title: '1A' }, { title: '1B' }, { title: '1C' }, { title: '2A' }, { title: '2B' }, { title: '2C' }];
    const [subjectdialog, setsubjectdialog] = useState('');

    const nexttabvalue = () => {
        setdialogValue("2");
    }

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? ['1', '5', '6', '7'] : [],
        );
    };

    const handleSelectClick = () => {
        setSelected((oldSelected) =>
            oldSelected.length === 0 ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'] : [],
        );
    };


    const handleRemoveItem = (oneitem) => {
        setListdata(listdata.filter(item => item !== oneitem));
    };

    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const [listdata, setListdata] = useState([]);

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);

        if ((nodeIds[0] != 1) && (nodeIds[0] != 2) && (nodeIds[0] != 10) && (nodeIds[0] != 14) && (nodeIds[0] != 18) && (nodeIds[0] != 5) && (nodeIds[0] != 8) && (nodeIds[0] != 12)) {
            if (listdata.indexOf(event.target.innerHTML) !== -1) {
                return;
            }
            else {
                setListdata([...listdata, event.target.innerHTML]);
            }
        }


    };

    const handleChangedatetime = () => {

    }

    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()
    const currentYearDate = year + "-" + month + "-" + day;

    const [value, setValue] = useState(
        dayjs(currentYearDate)
    )

    const [textInput, setTextInput] = useState('');

    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };

    const forloop = () => {
        let content = [];
        for (let i = 0; i < textInput; i++) {
            content.push(<div> <h6>Group {i + 1}</h6> <ListViewComponent width="25%" /> </div>);
        }
        return content;
    }


    const drawer = (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    <LogoSection />
                </Box>
            </Box>

            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ height: "85%" }}
            >
                <div style={{ display: "flex", backgroundColor: "#2CC5CE", padding: "10px" }}>
                    <Typography variant="h3" component="h3" sx={{ color: "black", width: "100%", height: "30px", margin: "0px", padding: "0px" }}>

                    </Typography>
                    <IconX style={{ backgroundColor: "#7983FF", color: "white" }} onClick={handleClose} />

                </div>
                <TabContext value={dialogvalue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" indicator={{ backgroundColor: '#e77600' }} >
                            <Tab label="Assignment Info" value="1" />
                            <Tab label="Individual/Group" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '130px' }}>
                                    {/* <Select defaultValue="Subject" items={Subjectoptions} /> */}

                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={subjectdialog}
                                            label="Subject"
                                            onChange={handlechangeSubjectdialog}
                                        >
                                            {selectsubject.map((u, i) => (

                                                <MenuItem value={u} key={i} style={{ fontFamily: "Livicc" }}>
                                                    {u}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div style={{ marginLeft: '20px', width: '100px' }}>
                                    {/* <Select defaultValue="Class" items={Classoptions} /> */}
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={classType}
                                            label="Class"
                                            onChange={handleChangeClass}
                                        >
                                            {selectclass.map((u, i) => (

                                                <MenuItem value={u} key={i} style={{ fontFamily: "Livicc" }}>
                                                    {u}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <form>
                                <div style={{ marginTop: '5px' }}>
                                    <Stack mt={4}>
                                        <TextField id="title" label="Title" variant="outlined" sx={{ width: '100%' }} placeholder="Text Area" onChange={titleclick} />
                                    </Stack>
                                </div>
                                {/* <div>
                                    <Stack mt={4}>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={3}
                                            placeholder="Text Area(Instructions, rubric, links...)"
                                            style={{ width: '100%' }}
                                        />
                                    </Stack>
                                </div> */}
                                <div>
                                    <Stack mt={4}>
                                        <TextField type="number" id="grade" label="Type in the highest mark or grade" variant="outlined" sx={{ width: '100%' }} onChange={(e) => setSendnum(e.target.value)} />
                                    </Stack>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginTop: '25px',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div>
                                        <TextField
                                            id="datetime-local"
                                            label="Due Date & Time:"
                                            type="datetime-local"
                                            defaultValue={senddatetime}
                                            sx={{ width: 398 }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            onChange = {datetimechange}
                                        />


                                    </div>
                                    <div>
                                        {/* <Button variant="contained" onClick={handleClose}>
                                                    Assign
                                                </Button>
                                                <Button variant="contained" onClick={handleClose} style={{ marginLeft: '10px' }}>
                                                    Save as Draft
                                                </Button> */}
                                        <Button variant="contained" onClick={handleClose} style={{ marginLeft: '10px', backgroundColor: "#818181", color: "white" }}>
                                            Cancel
                                        </Button>
                                        <Button variant="contained" onClick={nexttabvalue} style={{ marginLeft: '10px', color: "white", backgroundColor: "#7983FF" }}>
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel value="2" style={{ padding: '0px' }}>
                        <div style={{ padding: '20px' }}>
                            <FormControlLabel
                                value="female"
                                control={
                                    <Radio
                                        checked={selectedValue === 'a'}
                                        onChange={handleChangeradiobutton}
                                        value="a"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                }
                                label="Individual Assignment"
                            />
                            <FormControlLabel
                                value="male"
                                control={
                                    <Radio
                                        checked={selectedValue === 'b'}
                                        onChange={handleChangeradiobutton}
                                        value="b"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'B' }}
                                    />
                                }
                                label="Group Assignment"
                            />
                        </div>
                        {selectedValue == 'a' ? (
                            <div>
                                <div className="body" style={{ display: 'flex' }}>
                                    <div className="sidebar" style={{ width: '30%', borderStyle: "solid", borderColor: "#e3dfdf" }}>
                                        <Box sx={{ height: 464, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
                                            <Box sx={{ mb: 1 }}>
                                                <Button onClick={handleExpandClick}>
                                                    {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                                                </Button>
                                                {/* <Button onClick={handleSelectClick}>
                                               {selected.length === 0 ? 'Select all' : 'Unselect all'}
                                               </Button> */}
                                            </Box>
                                            <TreeView
                                                aria-label="controlled"
                                                defaultCollapseIcon={<ExpandMoreIcon />}
                                                defaultExpandIcon={<ChevronRightIcon />}
                                                expanded={expanded}
                                                selected={selected}
                                                onNodeToggle={handleToggle}
                                                onNodeSelect={handleSelect}
                                                multiSelect
                                            >

                                                <TreeItem nodeId="1" label="All Students">
                                                    <TreeItem nodeId="2" label="1A">
                                                        <TreeItem nodeId="3" label="李大明1" />
                                                        <TreeItem nodeId="4" label="李大明2" />
                                                    </TreeItem>

                                                    <TreeItem nodeId="5" label="1B">
                                                        <TreeItem nodeId="6" label="李大明3" />
                                                        <TreeItem nodeId="7" label="李大明4" />


                                                    </TreeItem>

                                                    <TreeItem nodeId="8" label="2A">
                                                        <TreeItem nodeId="9" label="李大明5" />

                                                    </TreeItem>

                                                    <TreeItem nodeId="10" label="2B">
                                                        <TreeItem nodeId="11" label="李大明6" />

                                                    </TreeItem>

                                                    <TreeItem nodeId="12" label="5A">
                                                        <TreeItem nodeId="13" label="李大明7" />

                                                    </TreeItem>

                                                    <TreeItem nodeId="14" label="5B">
                                                        <TreeItem nodeId="15" label="李大明8" />
                                                        <TreeItem nodeId="16" label="李大明9" />
                                                        <TreeItem nodeId="17" label="李大明10" />

                                                    </TreeItem>
                                                </TreeItem>


                                                <TreeItem nodeId="18" label="All Teachers">
                                                    <TreeItem nodeId="19" label="ZAHO" />

                                                </TreeItem>

                                            </TreeView>
                                        </Box>
                                    </div>

                                    <div
                                        className="flex-container"
                                        style={{ width: '70%', borderStyle: "solid", borderColor: "#e3dfdf" }}

                                    >
                                        <div>
                                            {
                                                listdata.map((oneitem, id) => {

                                                    return (
                                                        <div key={id} style={{ display: "flex", alignItems: "center" }}>
                                                            <div>
                                                                <HighlightOffIcon sx={{ '&:hover': { color: "black" } }} onClick={() => handleRemoveItem(oneitem)} />
                                                            </div>

                                                            <li style={{ listStyleType: "none", marginLeft: "7px" }}>
                                                                {oneitem}
                                                            </li>
                                                        </div>

                                                    )

                                                })
                                            }

                                        </div>

                                    </div>


                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-end", width: "59%" }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            className="transform"
                                            style={{ marginLeft: '5%', position: 'absolute', backgroundColor: "#818181" }}
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>

                                    </div>

                                    <div>
                                        <Button
                                            variant="contained"
                                            className="transform"
                                            style={{ marginLeft: '20%', position: 'absolute', backgroundColor: "#acaded" }}
                                        >
                                            Save As Draft
                                        </Button>

                                    </div>
                                    <div>

                                        <Button
                                            variant="contained"
                                            className="transform"
                                            style={{ marginLeft: '35%', position: 'absolute', backgroundColor: "#7983FF" }}
                                            onClick={assignmentassignClick}
                                        >
                                            Assign
                                        </Button>

                                    </div>



                                </div>

                            </div>


                        ) : (
                            <div>
                                <div>
                                    <div className="body" style={{ display: 'flex' }}>
                                        <div className="sidebar" style={{ width: '25%', backgroundColor: '#b7b4b4' }}>
                                            <div style={{ textAlign: 'center', fontWeight: 'bold', padding: '15px', alignItems: "center" }}>
                                                <span>Number of Groups </span>
                                                {/* <input placeholder="..." style={{ width: '15%', height: '40px', textAlign: 'center' }} /> */}
                                                <TextField

                                                    value={textInput}
                                                    onChange={handleTextInputChange}
                                                    placeholder="..."
                                                    sx={{ width: "35px", height: "0px", marginTop: "-15px" }}
                                                />
                                            </div>
                                            <div style={{ backgroundColor: '#ede6e6' }}>
                                                <Box sx={{ height: 400, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
                                                    <Box sx={{ mb: 1 }}>
                                                        <Button onClick={handleExpandClick}>
                                                            {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                                                        </Button>
                                                        {/* <Button onClick={handleSelectClick}>
                                                        {selected.length === 0 ? 'Select all' : 'Unselect all'}
                                                        </Button> */}
                                                    </Box>
                                                    <TreeView
                                                        aria-label="controlled"
                                                        defaultCollapseIcon={<ExpandMoreIcon />}
                                                        defaultExpandIcon={<ChevronRightIcon />}
                                                        expanded={expanded}
                                                        selected={selected}
                                                        onNodeToggle={handleToggle}
                                                        onNodeSelect={handleSelect}
                                                        multiSelect
                                                    >

                                                        <TreeItem nodeId="1" label="All Students">
                                                            <TreeItem nodeId="2" label="1A">
                                                                <TreeItem nodeId="3" label="李大明1" />
                                                                <TreeItem nodeId="4" label="李大明2" />
                                                            </TreeItem>

                                                            <TreeItem nodeId="5" label="1B">
                                                                <TreeItem nodeId="6" label="李大明3" />
                                                                <TreeItem nodeId="7" label="李大明4" />


                                                            </TreeItem>

                                                            <TreeItem nodeId="8" label="2A">
                                                                <TreeItem nodeId="9" label="李大明5" />

                                                            </TreeItem>

                                                            <TreeItem nodeId="10" label="2B">
                                                                <TreeItem nodeId="11" label="李大明6" />

                                                            </TreeItem>

                                                            <TreeItem nodeId="12" label="5A">
                                                                <TreeItem nodeId="13" label="李大明7" />

                                                            </TreeItem>

                                                            <TreeItem nodeId="14" label="5B">
                                                                <TreeItem nodeId="15" label="李大明8" />
                                                                <TreeItem nodeId="16" label="李大明9" />
                                                                <TreeItem nodeId="17" label="李大明10" />

                                                            </TreeItem>
                                                        </TreeItem>


                                                        <TreeItem nodeId="18" label="All Teachers">
                                                            <TreeItem nodeId="19" label="ZAHO" />

                                                        </TreeItem>

                                                    </TreeView>
                                                </Box>
                                            </div>
                                        </div>
                                        <div
                                            className="flex-container"
                                            style={{ width: '75%', backgroundColor: 'white' }}
                                        >

                                            {forloop()}


                                            {/* <div style={{ width: '30%', height: '40%', backgroundColor: '#ede6e6', textAlign: 'center' }}>
                                                Group 1
                                            </div>
                                            <div style={{ width: '30%', height: '40%', backgroundColor: '#ede6e6', textAlign: 'center' }}>
                                                Group 2
                                            </div>
                                            <div style={{ width: '30%', height: '40%', backgroundColor: '#ede6e6', textAlign: 'center' }}>
                                                Group 3
                                            </div>
                                            <div style={{ width: '30%', height: '40%', backgroundColor: '#ede6e6', textAlign: 'center' }}>
                                                Group 4
                                            </div> */}
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "flex-end", width: "59%" }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                className="transform"
                                                style={{ marginLeft: '5%', position: 'absolute', backgroundColor: "#818181" }}
                                                onClick={handleClose}
                                            >
                                                Cancel
                                            </Button>

                                        </div>

                                        <div>
                                            <Button
                                                variant="contained"
                                                className="transform"
                                                style={{ marginLeft: '20%', position: 'absolute', backgroundColor: "#acaded" }}
                                            >
                                                Save As Draft
                                            </Button>

                                        </div>
                                        <div>

                                            <Button
                                                variant="contained"
                                                className="transform"
                                                style={{ marginLeft: '35%', position: 'absolute', backgroundColor: "#7983FF" }}
                                            >
                                                Assign
                                            </Button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </TabPanel>
                </TabContext>
            </Dialog>

            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        borderRight: "3px solid #DFDFDF",
                    }}
                >
                    {checkStudent == 'teacher' ? (
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: theme.palette.background.primaryColor,
                                borderRadius: '20px',
                                margin: '10px 20px',
                                width: '67%',
                                fontWeight: '500',
                                fontSize: '20px',
                                fontFamily: "Livvic"
                            }}
                            id="fade-button"
                            aria-controls={openpoper ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openpoper ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            + Create
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            style={{ borderRadius: '20px', margin: '10px 20px', width: '67%', fontFamily: "Livvic" }}
                            id="fade-button"
                            aria-haspopup="true"
                            onClick={() => openLinkInNewTab('https://grwth.leoluca.io/?assignments=room1')}
                        >
                            + Create
                        </Button>
                    )}

                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button'
                        }}
                        anchorEl={anchorEl}
                        open={openpoper}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleClickOpen} sx={{ color: theme.palette.background.primaryColor, fontWeight: '500' }}>
                            <CreateNewFolderIcon sx={{ color: '#2CC5CE', mr: "5px" }} /> Create Assignment
                        </MenuItem>
                        <MenuItem
                            onClick={() => openLinkInNewTab('https://grwth.leoluca.io/?assignments=room1')}
                            sx={{ color: theme.palette.background.primaryColor, fontWeight: '500' }}
                        >
                            <AddHomeIcon sx={{ color: '#F7C005', mr: "5px" }} /> Create Room
                        </MenuItem>
                    </Menu>

                    <MenuList />
                    <MenuCard />

                    <Calendarview />
                    <QuestionMarkSharpIcon
                        style={{ position: "absolute", bottom: '0px', color: '#7983FF', borderRadius: '50%', backgroundColor: '#F2F2F2' }}
                    />
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList />
                    <MenuCard />
                </Box>
            </MobileView>
        </>
    );

    const container = windowobject !== undefined ? () => windowobject.document.body : undefined;



    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '50px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    windowobject: PropTypes.object
};

export default Sidebar;
