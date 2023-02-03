// material-ui
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
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

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { IconTrash, IconX, IconCheck, IconShare } from '@tabler/icons';

// components imports
import { useState } from 'react';
// import Select from '../../components/select/select';
import DataGrid from '../../components/Datagrid/datagrid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Calendar from 'react-calendar';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { element } from 'prop-types';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Assignmentlistpage() {

    const [subject, setSubject] = useState('');
    const [classType, setClassType] = useState('');


    const [selectedValue, setSelectedValue] = useState('a');
    const handleChangeradiobutton = (event) => {
        setSelectedValue(event.target.value);
    };
    const [checked, setChecked] = useState(true);
    const handleChangecheck = (event) => {
        setChecked(event.target.checked);
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

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [openstudentlist, Setopenstudentlist] = useState(false);
    const handleclickstudentlistopen = () => {
        Setopenstudentlist(true);
    };
    const handleclickstudentlistclose = () => {
        Setopenstudentlist(false);
    };
    const [dialogvalue, setdialogValue] = useState('1');
    const handleChange = (event, newValue) => {
        setdialogValue(newValue);
    };
    const [calendarvalue, setCalendarvalue] = useState(new Date());
    const onChangecalendar = (date) => {
        setCalendarvalue(date);
    };
    const callbackedit = (id) => {
      
    };

    const [data, setData] = useState(userRows);
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const [userCheck, setUserCheck] = useState('teacher');
    const studentlists = [
        { assignmenttitle: 'This is an english chapter 3 assignment.', duedate: '-', status: 'New' },
        { assignmenttitle: 'This is an english chapter 1 assignment.', duedate: 'Edited on 19 Dec 2022 12:16', status: 'A' },
        { assignmenttitle: 'This is an english chapter 2 assignment.', duedate: 'Edited on 15 Dec 2022 11:13', status: 'Submitted' }
    ];
    const studentlistsmaths = [
        { assignmenttitle: 'This is a math chapter 1 assignment.', duedate: 'Edited on 24 Dec 2022 12:33', status: 'Done late' },
        { assignmenttitle: 'This is a math chapter 2 assignment.', duedate: 'Edited on 15 Dec 2022 11:13', status: 'Submitted' }
    ];
    const studentlistsstudies = [
        { assignmenttitle: 'This is  liberal chapter 3 assignment.', duedate: 'Edited on 19 Dec 2022 12:10', status: 'Submitted' },
        { assignmenttitle: 'This is  liberal chapter 1 assignment.', duedate: 'Edited on 23 Dec 2022 17:35', status: 'Missing' }
    ];

    studentlists.sort(function (a, b) {
        return b.duedate.localeCompare(a.duedate);
    });
    const [anchorEl, setAnchorEl] = useState('');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const openpoper = Boolean(anchorEl);
    const id = openpoper ? 'simple-popover' : undefined;
    const handleCloseopenpoper = () => {
        setAnchorEl(null);
    };

    const openLinkInNewTab = (url) => {
        const newTab = window.open(url, '_blank', 'noopener,noreferrer');
        if (newTab) newTab.opener = null;
    };

    const [filterCheck, setFilterCheck] = useState(false);

    
    const [subjectdialog, setsubjectdialog] = useState('');
    const handlechangeSubjectdialog = (e) => {
        setsubjectdialog(e.target.value);
    }
    const handleChangeSubject = (e) => {
        if(e.target.value=== ""){
            setFilterCheck(false);
        }else{
            setFilterCheck(true);
        }
   
        setSubject(e.target.value)
     
    }

    const handleChangeClass =  (e) => {
        setClassType(e.target.value);
    }

    const nexttabvalue = () => {
        setdialogValue("2");
    }
  



    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const [parentcheck, setParentcheck] = useState(false);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const [listdata, setListdata ] = useState([]);

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
      
        if((nodeIds[0] != 1) && (nodeIds[0] != 2) && (nodeIds[0] != 6) && (nodeIds[0] != 10) && (nodeIds[0] != 14) && (nodeIds[0] != 18) ){          
            if(listdata.indexOf(event.target.innerHTML) !== -1) { 
                return;
            }
            else{
                setListdata([...listdata, event.target.innerHTML]);
            }          
        }
     
    };

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

    const handleChangedatetime = () => {
       
    }

    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()
    const currentYearDate = year + "-" + month + "-" + day;
  

    const [value,setValue] = useState( 
        dayjs(currentYearDate)
    )

    const [searchValue, setSearchVaule] = useState("")

    const searchChange = (event) => {
       
        setSearchVaule(event)
    }


    return (
        <div className="Assignmentlist">
            {userCheck == 'teacher' ? (
                <div className="header">
                    <div className="widgetSmallTitle" style={{fontFamily:"Livvic",fontSize:"30px",fontWeight:"700", lineHeight:"37.65px"}}>Assignment List</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div>
                                <SearchComponent onChangeHandle = {searchChange} style={{fontFamily:"Livicc"}}/>
                            </div>
                            <div style={{ marginLeft: '40px', width: '130px' }}>
                                {/* <Select defaultValue="Subject" items={Subjectoptions} sx={{color:"red"}} />  */}
                            <FormControl fullWidth sx={{width:"150px"}}>
                                    <InputLabel id="demo-simple-select-label" style={{fontFamily:"Livicc"}}>Subject</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subject}
                                        label="Subject"
                                        onChange={handleChangeSubject}
                                        >
                                        <MenuItem value="" style={{fontFamily:"Livicc"}}>None</MenuItem>
                                        <MenuItem value="English" style={{fontFamily:"Livicc"}}>English</MenuItem>
                                        <MenuItem value="Maths" style={{fontFamily:"Livicc"}}>Maths</MenuItem>
                                        <MenuItem value="Liberal Studies" style={{fontFamily:"Livicc"}}>Liberal Studies</MenuItem>
                                     
                                    </Select>
                            </FormControl> 
                                    
                              
                            </div>
                            <div style={{ marginLeft: '55px', width: '100px' }}>
                                {/* <Select defaultValue="Class" items={Classoptions} /> */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" style={{fontFamily:"Livicc"}}>Class</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={classType}
                                        label="Class"
                                        onChange={handleChangeClass}
                                        >
                                        <MenuItem value=""  style={{fontFamily:"Livicc"}}>None</MenuItem>
                                        <MenuItem value="A1" style={{fontFamily:"Livicc"}}>A1</MenuItem>
                                        <MenuItem value="A2" style={{fontFamily:"Livicc"}}>A2</MenuItem>
                                        <MenuItem value="B1" style={{fontFamily:"Livicc"}}>B1</MenuItem>
                                        <MenuItem value="B2" style={{fontFamily:"Livicc"}}>B2</MenuItem>
                                        <MenuItem value="C1" style={{fontFamily:"Livicc"}}>C1</MenuItem>
                                        <MenuItem value="C2" style={{fontFamily:"Livicc"}}>C2</MenuItem>
                                    </Select>
                                </FormControl> 
                            </div>
                        </div>
                        <div>
                            <Button variant="contained" onClick={handleClickOpen} sx={{backgroundColor:"#7983FF",borderRadius:"25px", fontFamily:"Livicc", fontSize:"25px", fontWeight:"700"}}>
                                + Assignment
                            </Button>
                        </div>
                    </div>

                    <Dialog
                        open={openstudentlist}
                        onClose={handleclickstudentlistclose}
                        aria-labelledby="alert-dialog-title"
                        le
                        aria-describedby="alert-dialog-description"
                        className="studentlistdialog"
                    >
                        <div style={{ marginTop: '30px', alignSelf: 'center' }}>
                            <Stack spacing={2} sx={{ width: 300 }}>
                                <Autocomplete
                                    multiple
                                    id="free-solo-demo"
                                    options={Classlist.map((option) => option.title)}
                                    renderInput={(params) => <TextField {...params} label="Classlist" />}
                                />
                            </Stack>
                            <Button style={{ position: 'absolute', bottom: '30px', right: '30px' }}>Save</Button>
                        </div>
                    </Dialog>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{height:"85%"}}
                    >

                               <div style={{display:"flex",backgroundColor:"#2CC5CE",padding:"10px"}}>
                                    <Typography variant="h3" component="h3" sx={{ color:"black",width:"100%", height:"30px", margin:"0px", padding:"0px" }}>
                                           
                                    </Typography> 
                                    <IconX style={{backgroundColor:"#7983FF",color:"white"}} onClick={handleClose}/>

                                </div>
                        <TabContext value={dialogvalue}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
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
                                                    <MenuItem value="">None</MenuItem>
                                                    <MenuItem value="English">English</MenuItem>
                                                    <MenuItem value="Maths">Maths</MenuItem>
                                                    <MenuItem value="Nature">Nature</MenuItem>
                                                    <MenuItem value="Music">Music</MenuItem>
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
                                                    <MenuItem value="A1">A1</MenuItem>
                                                    <MenuItem value="A2">A2</MenuItem>
                                                    <MenuItem value="B1">B1</MenuItem>
                                                    <MenuItem value="B2">B2</MenuItem>
                                                    <MenuItem value="C1">C1</MenuItem>
                                                    <MenuItem value="C2">C2</MenuItem>
                                                </Select>
                                            </FormControl> 
                                        </div>
                                    </div>
                                    <form>
                                        <div style={{ marginTop: '5px' }}>
                                            <Stack mt={4}>
                                                <TextField id="title" label="Title" variant="outlined" sx={{ width: '100%' }} placeholder="Text Area" />
                                            </Stack>
                                        </div>
                                        <div>
                                            <Stack mt={4}>
                                                <TextareaAutosize
                                                    aria-label="minimum height"
                                                    minRows={3}
                                                    placeholder="Text Area(Instructions, rubric, links...)"
                                                    style={{ width: '100%' }}
                                                />
                                            </Stack>
                                        </div>
                                        <div>
                                            <Stack mt={4}>
                                                <TextField id="grade" label="Type in the highest mark or grade" variant="outlined" sx={{ width: '100%' }}  />
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
                                                    defaultValue=""
                                                    sx={{ width: 398 }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                />
                                  
                                            </div>
                                            <div>
                                                {/* <Button variant="contained" onClick={handleClose}>
                                                    Assign
                                                </Button>
                                                <Button variant="contained" onClick={handleClose} style={{ marginLeft: '10px' }}>
                                                    Save as Draft
                                                </Button> */}
                                                <Button variant="contained" onClick={handleClose} style={{ marginLeft: '10px',backgroundColor:"#818181", color:"white" }}>
                                                    Cancel
                                                </Button>
                                                <Button variant="contained" onClick={nexttabvalue} style={{ marginLeft: '10px',color:"white",backgroundColor:"#7983FF" }}>
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
                                                <div className="sidebar" style = {{ width: '30%', borderStyle: "solid",  borderColor:"#e3dfdf"}}>
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
                                                                <TreeItem nodeId="3" label="Keith" />
                                                                <TreeItem nodeId="4" label="Alan" />
                                                                <TreeItem nodeId="5" label="Kaya" />
                                                            
                                                            </TreeItem>

                                                            <TreeItem nodeId="6" label="1B">
                                                                <TreeItem nodeId="7" label="Joby" />
                                                                <TreeItem nodeId="8" label="Niki" />
                                                                <TreeItem nodeId="9" label="Sharon" />
                                                            
                                                            </TreeItem>

                                                            <TreeItem nodeId="10" label="1C">
                                                                <TreeItem nodeId="11" label="hhh" />
                                                                <TreeItem nodeId="12" label="ddd" />
                                                                <TreeItem nodeId="13" label="ccc" />
                                                            
                                                            </TreeItem>

                                                            <TreeItem nodeId="14" label="1D">
                                                                <TreeItem nodeId="15" label="aaa" />
                                                                <TreeItem nodeId="16" label="bbb" />
                                                                <TreeItem nodeId="17" label="ccc" />
                                                            
                                                            </TreeItem>
                                                        </TreeItem>

                                                      
                                                        <TreeItem nodeId="18" label="All Teachers">
                                                            <TreeItem nodeId="19" label="Ms K wang" />
                                                            <TreeItem nodeId="20" label="Mr K Chen" />
                                                            <TreeItem nodeId="21" label="Ms K bbbbb" />
                                                            <TreeItem nodeId="22" label="Mr G ggggg" />
                                                            <TreeItem nodeId="23" label="Ms T ttttt" />
                                                       
                                                        </TreeItem>
                                                    
                                                    </TreeView>
                                                    </Box>
                                                </div>

                                                <div
                                                    className="flex-container"
                                                    style={{ width: '70%', borderStyle: "solid",  borderColor:"#e3dfdf" }}

                                                >
                                                    <div>
                                                        {
                                                            listdata.map((oneitem,id) => {

                                                                return(
                                                                    <div key={id} style={{display:"flex", alignItems:"center"}}>
                                                                        <div>
                                                                         <HighlightOffIcon sx={{'&:hover': {color: "black"  }}}  onClick={() => handleRemoveItem(oneitem)}/>
                                                                        </div>
                                                                       
                                                                        <li  style={{listStyleType:"none", marginLeft:"7px"}}>
                                                                        { oneitem }
                                                                        </li>
                                                                    </div>
                                                                  
                                                                )

                                                            })  
                                                        }
                                                       
                                                    </div>
                                                     
                                                </div>
                                                
                                            
                                            </div>
                                            <div style={{display:"flex",justifyContent:"flex-end",width:"59%"}}>
                                            <div>
                                            <Button
                                                variant="contained"
                                                className="transform"
                                                style={{ marginLeft: '5%', position: 'absolute',backgroundColor:"#818181" }}
                                                onClick={handleClose}
                                            >
                                                Cancel
                                            </Button>

                                            </div>
                                         
                                            <div>
                                            <Button
                                                variant="contained"
                                                className="transform"
                                                style={{ marginLeft: '20%', position: 'absolute', backgroundColor:"#acaded" }}
                                            >
                                                Save As Draft
                                            </Button>
                                                
                                            </div>            
                                           <div>
                                            
                                           <Button
                                                variant="contained"
                                                className="transform"
                                                style={{ marginLeft: '35%', position: 'absolute', backgroundColor:"#7983FF" }}
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
                                                <div className="sidebar" style={{ width: '30%', backgroundColor: '#b7b4b4' }}>
                                                    <div style={{ textAlign: 'center', fontWeight: 'bold', padding: '15px' }}>
                                                        <span>Number of Groups </span>
                                                        <input
                                                            placeholder="..."
                                                            style={{ width: '15%', height: '40px', textAlign: 'center' }}
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
                                                                <TreeItem nodeId="3" label="Keith" />
                                                                <TreeItem nodeId="4" label="Alan" />
                                                                <TreeItem nodeId="5" label="Kaya" />
                                                            
                                                            </TreeItem>

                                                            <TreeItem nodeId="6" label="1B">
                                                                <TreeItem nodeId="7" label="Joby" />
                                                                <TreeItem nodeId="8" label="Niki" />
                                                                <TreeItem nodeId="9" label="Sharon" />
                                                            
                                                            </TreeItem>

                                                            <TreeItem nodeId="10" label="1C">
                                                                <TreeItem nodeId="11" label="Keith" />
                                                                <TreeItem nodeId="12" label="Alan" />
                                                                <TreeItem nodeId="13" label="Kaya" />
                                                            
                                                            </TreeItem>

                                                            <TreeItem nodeId="14" label="1D">
                                                                <TreeItem nodeId="15" label="aaa" />
                                                                <TreeItem nodeId="16" label="bbb" />
                                                                <TreeItem nodeId="17" label="ccc" />
                                                            
                                                            </TreeItem>
                                                        </TreeItem>

                                                      
                                                        <TreeItem nodeId="18" label="All Teachers">
                                                            <TreeItem nodeId="19" label="Ms K wang" />
                                                            <TreeItem nodeId="20" label="Mr K Chen" />
                                                            <TreeItem nodeId="21" label="Ms K bbbbb" />
                                                            <TreeItem nodeId="22" label="Mr G ggggg" />
                                                            <TreeItem nodeId="23" label="Ms T ttttt" />
                                                       
                                                        </TreeItem>
                                                    
                                                    </TreeView>
                                                    </Box>
                                                    </div>
                                                </div>
                                                <div
                                                    className="flex-container"
                                                    style={{ width: '70%', backgroundColor: 'white', marginTop: '20%' }}
                                                >
                                                    <div
                                                        style={{
                                                            width: '30%',
                                                            height: '40%',
                                                            backgroundColor: '#ede6e6',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        Group 1
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '30%',
                                                            height: '40%',
                                                            backgroundColor: '#ede6e6',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        Group 2
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '30%',
                                                            height: '40%',
                                                            backgroundColor: '#ede6e6',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        Group 3
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: '30%',
                                                            height: '40%',
                                                            backgroundColor: '#ede6e6',
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        Group 4
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{display:"flex",justifyContent:"flex-end",width:"59%"}}>
                                            <div>
                                            <Button
                                                variant="contained"
                                                className="transform"
                                                style={{ marginLeft: '5%', position: 'absolute',backgroundColor:"#818181" }}
                                                onClick={handleClose}
                                            >
                                                Cancel
                                            </Button>

                                            </div>
                                         
                                            <div>
                                            <Button
                                                variant="contained"
                                                className="transform"
                                                style={{ marginLeft: '20%', position: 'absolute', backgroundColor:"#acaded" }}
                                            >
                                                Save As Draft
                                            </Button>
                                                
                                            </div>            
                                           <div>
                                            
                                           <Button
                                                variant="contained"
                                                className="transform"
                                                style={{ marginLeft: '35%', position: 'absolute', backgroundColor:"#7983FF" }}
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
                    <DataGrid callbackedit={callbackedit} filtercheck={filterCheck} subject={subject} classtype={classType}  searchvalue={searchValue} />
                </div>
            ) : (
                <div className="header">
                    <div className="widgetSmallTitle">Student Assignment List</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div>
                                <SearchComponent />
                            </div>
                            <div style={{ marginLeft: '40px', width: '130px' }}>
                                <Select defaultValue="Subject" items={Subjectoptions} />
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '5px 0px', fontWeight: 'bold' }}> English </div>
                    {studentlists.map((userlist) => {
                        return (
                            <Box
                                key={userlist.assignmenttitle}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    marginTop: '10px',
                                    backgroundColor: '#94dbbc',
                                    alignItems: 'center',
                                    height: '60px'
                                }}
                            >
                                <Typography variant="h3" component="h4" sx={{ width: '30%' }}>
                                    {userlist.assignmenttitle}
                                </Typography>

                                {/* <Select defaultValue="Filter by Status" items={filterstatus} /> */}

                                <Typography variant="h2" component="h3" sx={{ width: '15%' }}>
                                    {userlist.duedate}
                                </Typography>

                                <Typography variant="h2" component="h3" sx={{ width: '10%' }}>
                                    {userlist.status}
                                </Typography>

                                <PendingOutlinedIcon aria-describedby={id} variant="contained" onClick={handleClick}></PendingOutlinedIcon>
                                {
                                    <Popover
                                        id={id}
                                        open={openpoper}
                                        anchorEl={anchorEl}
                                        onClose={handleCloseopenpoper}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left'
                                        }}
                                        sx={{ textAlign: 'center', width: '250px' }}
                                    >
                                        <Button variant="contained" sx={{ width: '75px' }}>
                                            {' '}
                                            Edit{' '}
                                        </Button>
                                        <Button variant="contained" sx={{ marginTop: '15px' }} onClick={handleCloseopenpoper}>
                                            {' '}
                                            Cancel{' '}
                                        </Button>
                                    </Popover>
                                }
                            </Box>
                        );
                    })}
                    <div style={{ padding: '5px 0px', fontWeight: 'bold' }}> Maths </div>
                    {studentlistsmaths.map((userlist) => {
                        return (
                            <Box
                                key={userlist.assignmenttitle}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    marginTop: '10px',
                                    backgroundColor: '#94dbbc',
                                    alignItems: 'center',
                                    height: '60px'
                                }}
                            >
                                <Typography variant="h3" component="h4" sx={{ width: '30%' }}>
                                    {userlist.assignmenttitle}
                                </Typography>
                                <Typography variant="h2" component="h3" sx={{ width: '15%' }}>
                                    {userlist.duedate}
                                </Typography>

                                <Typography variant="h2" component="h3" sx={{ width: '10%' }}>
                                    {userlist.status}
                                </Typography>
                                <PendingOutlinedIcon aria-describedby={id} variant="contained" onClick={handleClick}></PendingOutlinedIcon>

                                {
                                    <Popover
                                        id={id}
                                        open={openpoper}
                                        anchorEl={anchorEl}
                                        onClose={handleCloseopenpoper}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left'
                                        }}
                                        sx={{ textAlign: 'center', width: '250px' }}
                                    >
                                        <Button variant="contained" sx={{ width: '75px' }}>
                                            {' '}
                                            Edit{' '}
                                        </Button>
                                        <Button variant="contained" sx={{ marginTop: '15px' }} onClick={handleCloseopenpoper}>
                                            {' '}
                                            Cancel{' '}
                                        </Button>
                                    </Popover>
                                }
                            </Box>
                        );
                    })}

                    <div style={{ padding: '5px 0px', fontWeight: 'bold' }}> Liberal Studies </div>
                    {studentlistsstudies.map((userlist) => {
                        return (
                            <Box
                                key={userlist.assignmenttitle}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    marginTop: '10px',
                                    backgroundColor: '#94dbbc',
                                    alignItems: 'center',
                                    height: '60px'
                                }}
                            >
                                <Typography variant="h3" component="h4" sx={{ width: '30%' }}>
                                    {userlist.assignmenttitle}
                                </Typography>
                                <Typography variant="h2" component="h3" sx={{ width: '15%' }}>
                                    {userlist.duedate}
                                </Typography>

                                <Typography variant="h2" component="h3" sx={{ width: '10%' }}>
                                    {userlist.status}
                                </Typography>

                                <PendingOutlinedIcon aria-describedby={id} variant="contained" onClick={handleClick}></PendingOutlinedIcon>
                                {
                                    <Popover
                                        id={id}
                                        open={openpoper}
                                        anchorEl={anchorEl}
                                        onClose={handleCloseopenpoper}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left'
                                        }}
                                        sx={{ textAlign: 'center', width: '250px' }}
                                    >
                                        {/* <Link to={'/assignmentedit/'+"english1"} style={{textDecoration:"none"}}> */}
                                        <Button
                                            variant="contained"
                                            sx={{ width: '75px' }}
                                            onClick={() => openLinkInNewTab('https://grwth.leoluca.io/?assignments=room1')}
                                        >
                                            {' '}
                                            Edit{' '}
                                        </Button>
                                        {/* </Link> */}

                                        <Button variant="contained" sx={{ marginTop: '15px' }} onClick={handleCloseopenpoper}>
                                            {' '}
                                            Cancel{' '}
                                        </Button>
                                    </Popover>
                                }
                            </Box>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
