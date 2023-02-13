import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { IconTrash, IconX, IconCheck, IconShare } from '@tabler/icons';
import ShareIcon from '@mui/icons-material/Share';
import { Typography } from '@mui/material';
// import TreeSelect, { TreeNode, SHOW_PARENT } from 'rc-tree-select';
// import 'rc-tree-select/assets/index.css';
import './index.css';
import DropdownTreeSelectHOC from "./HOC";
// import 'react-dropdown-tree-select/dist/styles.css'
import data  from './data.json';
import usericon from 'assets/images/roomimg/Vector.png';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor:  '#FFFFFF',
        color: theme.palette.common.white,
        color:'black',
        fontFamily:"Livvic",
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
        fontFamily:"Livvic"
    },  
    marginTop:30, 
    padding:'3px 94px',
    // paddingBottom: 10,
    // paddingTop: 20,
    // boxShadow: "0 4px 15px -10px;  #ccc",
}));


// using material class custom type:  
// '&.fdasojfdoas': {
//     fd
// }
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    // boxShadow: "0 0 8px 3px rgb(0 0 0 / 25%)"
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.selected,
    //     padding:"20px 30px"
    // },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    borderSpacing: "0 5px !important",
    borderCollapse: "separate !important",
    boxShadow: "0 4px 20px -10px;  #ccc",
   
}));

function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('A1', 'English', 'My Favourite Book Essay', '03/31/2023 06:50 PM', 4.0),
    createData('A2', 'Maths', 'Calculus Assignment', '03/28/2023 04:30 PM', 4.3),
    createData('C2', 'Liberal Studies', 'Reading/Research Proposal', '03/25/2023 10:00 AM', 4.0),
    // createData('Class', 'Nature', 'Beauty of Nature', 'Due Date & Time', 6.0),
    createData('C1', 'English', 'My Village Essay', '03/22/2023 11:30 AM', 4.0),
    createData('B2', 'Maths', 'Transformations', '03/17/2023 02:40 PM', 4.3),
    createData('D1', 'Liberal Studies', 'Importance of Music', '03/14/2023 03:10 PM', 4.3),
    createData('B1', 'English', 'Personal', '03/10/2023 09:20 AM', 4.0),
    createData('D2', 'Maths', 'Matrix Problems', '03/07/2023 08:00 PM', 6.0),
    createData('E2', 'Liberal Studies', 'Grammar and Checking', '03/04/2023 06:00 PM', 6.0),
   
];

const filterrowsEnglish = [
    createData('A1', 'English', 'My Favourite Book Essay', '03/31/2023 06:50 PM', 4.0),
    createData('C1', 'English', 'My Village Essay', '03/22/2023 11:30 AM', 4.3),
    createData('B1', 'English', 'Personal', '03/10/2023 09:20 AM', 6.0),
]

const filterrowsMaths = [
    createData('A2', 'Maths', 'Differential Calculus Assignment', '03/28/2023 04:30 PM', 4.0),
    createData('B2', 'Maths', 'Transformations', '03/17/2023 02:40 PM', 4.3),
    createData('D2', 'Maths', 'Matrix Problems', '03/07/2023 08:00 PM', 6.0),
]

const filterrowsLiberalStudies = [
    createData('C2', 'Liberal Studies', 'Reading/Research Proposal', '03/25/2023 10:00 AM', 4.0),
    createData('D1', 'Liberal Studies', 'Importance of Music', '03/14/2023 03:10 PM', 4.3),
    createData('E2', 'Liberal Studies', 'Grammar and Checking', '03/04/2023 06:00 PM', 6.0),
]

export default function CustomizedTables({ filtercheck, subject, classtype, searchvalue }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [dataRows, setDataRows] = useState(rows);

    useEffect(()=> {
        setDataRows(rows.filter((rowone) => rowone.fat.includes(searchvalue)));
    },[searchvalue])

    useEffect(() => {
        if(subject==""){
            setDataRows(rows);
        }
        else if(subject=="English"){
            setDataRows(rows.filter((rowone) => rowone.calories === subject));
        }
        else if(subject == "Maths"){
            setDataRows(rows.filter((rowone) => rowone.calories === subject));
        }
        else if(subject == "Liberal Studies"){
         
            setDataRows(rows.filter((rowone) => rowone.calories === subject));
        }
    },[subject])

    useEffect(() => {


        if(classtype==""){
        setDataRows(rows);
        }
        else if(classtype=="A1"){
            setDataRows(rows.filter((rowone) => rowone.name === classtype));
        }
        else if(classtype == "A2"){
            setDataRows(rows.filter((rowone) => rowone.name === classtype));
        }
        else if(classtype == "B1"){
         
            setDataRows(rows.filter((rowone) => rowone.name === classtype));
        }
        else if(classtype == "B2"){
       
            setDataRows(rows.filter((rowone) => rowone.name === classtype));
        }
        else if(classtype == "C1"){
         
            setDataRows(rows.filter((rowone) => rowone.name === classtype));
        }
        else if(classtype == "C2"){
       
            setDataRows(rows.filter((rowone) => rowone.name === classtype));
        }

    },[classtype])

    

      




  
    // const [dataFilter,setDataFilter] = useState(filterrows);
    const openpoper = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handelClickShare = (event) => {
        setShareValue(event.currentTarget);
    }
    const [deleteId, setDeleteId] = useState();
    const handleClickOpen = () => {
            navigate('/studentlists');
    };
    const [open, setOpen] = useState(false);
    const handleDeleteOpen = () => {
        setOpen(true);
        setAnchorEl(null);
    };
    
    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    const [shareValue, setShareValue] = React.useState(null);
    const [shareOpen, setShareOpen] = useState(false);
    const openpopershare = Boolean(shareValue);
    const handleshareClose = () => {
        setShareOpen(false);
        setShareValue(null);
    }
    const handleShareOpen = () => {
        setShareOpen(true);
        setAnchorEl(null);

    }

    const navigate = useNavigate();
    const handleDelete = (id) => {
        setDataRows(dataRows.filter((item) => item.calories !== id));
    };

    const [multipleValue, setMultipleValue] = useState([]);
    

    const onMultipleChange = value => {
        setMultipleValue([]);
      };

    const onSelect = (...args) => {
    // use onChange instead
    };

    const [gData, SetgData] = useState([]);

    const onChange = (currentNode, selectedNodes) => {
        console.log("path::", currentNode.path);
      };

    const TableRowonClick = () => {
        navigate('/studentlists');
    }


    const [sharetoEdit,setShareToEdit] = useState('https://grwthx.com/file/d/1awregsdf5/view?usp=sharing');
    const [sharetoPlay,setShareToPlay] = useState('https://grwthx.com/file/d/2awregege3/view?usp=sharing')
    
    const [alertOpen,setAlertOpen] = useState(false);

    const sharetoeditClick = () => {
       setAlertOpen(true);
    }

    const handleCloseAlert = () => { 
        setAlertOpen(false);
    };

    useEffect(() => {
        document.addEventListener('keydown', keyPressHandler, false);
    },[])

    const [alertplayOpen,setAlertPlayOpen] = useState(false);

    const [shareallow2, setShareallow2] = useState(false)
    const  sharetoplayClick =  () => {     
        setAlertPlayOpen(true);
    }

    const handleClosePlayAlert = () => {
     
        setAlertPlayOpen(false);
    };


    const keyPressHandler = (event) => {

        if (event.keyCode === 86) {
            setShareToPlay('https://grwthx.com/file/d/2awregege3/view?usp=sharing')
        }
    }



    return (
    <Box>
   
            <Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                sx={{ width: '20%', height: '28%', position: 'absolute', top: '40%', left: '40%' }}
            >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <IconTrash />
                        <Typography variant="h3" component="h3">
                            {'Are you sure you '} <br />
                            {'want to delete this?'}
                        </Typography>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        {' '}
                        <IconX /> Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleDelete(deleteId);
                            handleClose();
                        }}
                        variant="contained"
                    >
                        <IconCheck /> Delete
                    </Button>
                </DialogActions>
            </Dialog>



            <Dialog
                open={shareOpen}
                onClose={handleshareClose}
                aria-labelledby="alert-dialog-title"
                sx={{ width: '25%', height: '70%', position: 'absolute', top: '10%', left: '40%', }}
            >
             
                <div style={{display:"flex",backgroundColor:"#DFDFDF",padding:"10px"}}>
                    <Typography variant="h3" component="h3" sx={{ color:"black",width:"100%", margin:"0px", padding:"0px" }}>
                                {'Share Link'} <br />
                    </Typography> 
                    <IconX style={{backgroundColor:"#7983FF",color:"white"}} onClick={handleshareClose}/>

                </div>
             
                        
            
                <DialogContent sx={{backgroundColor:"#f3efef"}}>
                 
                        {/* <IconTrash /> */}
                        {/* <Typography variant="h3" component="h3" sx={{backgroundColor:"#2CC5CE", color:"black",width:"100%",textAlign:"center", marginBottom:"10px" }}>
                            {'Share Link'} <br />
                        </Typography> */}
                    

                    <DropdownTreeSelectHOC data={data} onChange={onChange}    />

                    
                    <Stack mt={28}>
                        <Typography variant="h3" component="h3">
                                   Share to Edit
                        </Typography> 
                        <Box sx={{display:"flex", alignItems: 'center'}}>
                     
                            <TextField id="sharetoedit" value = {sharetoEdit} variant="outlined" sx={{ width: '100%',mr:"10px" }} placeholder="URL"/>

                            <CopyToClipboard text={sharetoEdit}>
                          
                              <img src={usericon} alt="UserIcon" width={15} height={15}  onClick={sharetoeditClick} sx={{backgroundColor:"red"}}/>
                            </CopyToClipboard>
                          
                            
                            <Snackbar
                                open={alertOpen}
                                autoHideDuration={1000}
                                message="Link Copied"
                                onClose={handleCloseAlert}
                                sx={{position:"absolute",top:"17%", width: '10%'}}
                            
                            />
                        </Box>
                    </Stack>
                    <Stack mt={2}>
                        <Typography variant="h3" component="h3">
                                   Share to Play only
                        </Typography> 
                        <Box sx={{display:"flex", alignItems: 'center'}}>
                        <TextField id="sharetoplay" value = {sharetoPlay} variant="outlined" sx={{ width: '100%',mr:"10px" }} placeholder="URL"/>

                        
                        <CopyToClipboard text={sharetoPlay}>
                          
                             <img src={usericon} alt="UserIcon"  width={15} height={15} onClick={sharetoplayClick} />
                        </CopyToClipboard>
                           
                           
                       
                         

                            
                            <Snackbar
                                    open={alertplayOpen}
                                    autoHideDuration={1000}
                                    message="Link Copied"
                                    onClose={handleClosePlayAlert}
                                    sx={{position:"absolute",top:"48%",right:"70%", width: '10%'}}
                                
                            />
                        </Box>
                    </Stack>

                    <Box sx={{display:"flex", justifyContent:"flex-end"}}>
                        <Button
                            variant="contained"
                            aria-haspopup="true"
                            sx={{height:"25px", backgroundColor:"#7983FF", color:"white", marginTop: '15px' , marginRight:'10px'}}
                            onClick={handleshareClose}
                        >
                            Done
                        </Button>

                    </Box>

                 
                </DialogContent>

            </Dialog>


            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, marginTop:'50px' }} aria-label="customized table" size='large'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Class</StyledTableCell>
                        <StyledTableCell align="center">Subject</StyledTableCell>
                        <StyledTableCell align="center">Assignment Title</StyledTableCell>
                        <StyledTableCell align="center" style={{fontFamily:"Livvic"}}>Due Date & Time</StyledTableCell>
                        <StyledTableCell align="center">
                          More
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataRows.map((row,id) => (
                        <StyledTableRow key={id}>
                            <StyledTableCell component="th" scope="row" align="center"  onClick={TableRowonClick}>

                            <Box sx={{display:"flex",alignItems:"center"}}>
                            <Stack spacing={2} direction="row">
                                <Typography sx={{backgroundColor:"#2CC5CE", color:"white", borderRadius:"50%", width:"25px", height:"25px",padding:"5px"}}> G </Typography>
                                <Box  align="center" style={{fontFamily:"Livvic"}}> {row.name} </Box>
                            </Stack>
                            </Box>
                            </StyledTableCell>
                            <StyledTableCell align="center"  onClick={TableRowonClick}>{row.calories}</StyledTableCell>
                            <StyledTableCell align="center"  onClick={TableRowonClick}>{row.fat}</StyledTableCell>
                            <StyledTableCell align="center"  onClick={TableRowonClick}>{row.carbs}</StyledTableCell>
                            <StyledTableCell align="center">
                            <Box sx={{display:"flex", alignItems:"center"}}>
                                <Button
                                    variant="contained"
                                    aria-haspopup="true"
                                    sx={{height:"25px", backgroundColor:"#2CC5CE",margin:"10px", color:"white", fontFamily:"Livvic"}}
                                    onClick={()=>navigate('/assignmentedit/:id',{state:{eachvalue:row}})}
                                >
                                Edit
                                </Button>

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

                                <PendingOutlinedIcon 
                                  variant="contained"
                                  aria-haspopup="true"
                                  aria-controls={openpoper ? 'fade-menu' : undefined}
                                  aria-expanded={openpoper ? 'true' : undefined}
                                  onClick={handleClick}
                                  sx={{margin:"10px", color:"#2CC5CE"}}
                                >
                                </PendingOutlinedIcon>
                                
                            </Box> 
                     
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            
        </Box>
  
   
    
    </Box>
    );
}

// import React, { useState } from 'react';
// import { DataGrid, GridCellParams } from '@mui/x-data-grid';
// import { userRows } from './dummyData';
// import { Link } from 'react-router-dom';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Box from '@mui/material/Box';
// import Dialog from '@mui/material/Dialog';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Fade from '@mui/material/Fade';
// import { IconTrash, IconX, IconCheck } from '@tabler/icons';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { Typography } from '@mui/material';
// import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import 'react-perfect-scrollbar/dist/css/styles.css';

// const DataGridtable = ({ callbackedit }) => {
//     const icons = { IconTrash };
//     const navigate = useNavigate();
//     const [data, setData] = useState(userRows);
//     const [deleteId, setDeleteId] = useState();
//     const data1 = data.slice().sort((a, b) => b.Duedate.localeCompare(a.Duedate));
//     const handleDelete = (id) => {
//         setData(data.filter((item) => item.id !== id));
//     };

//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const openpoper = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClickOpen = () => {
//         navigate('/studentlists');
//     };

//     const columns = [
//         { field: 'Class', headerName: 'Class', width: 250,align:'center', headerAlign: 'center',
//         renderCell: (params) => {
//             console.log(params);
//             return (
//                 <>
//                 <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-evenly"}}>
//                   <ReplayCircleFilledIcon  sx={{color:"#2CC5CE", fontSize:"25px", cursor:"pointer"}} />
//                   <Box sx={{margin:"60px"}}> {params.row.Class} </Box>
//                 </Box>
//                 </>
//             );
//         }
    
//         },
//         {
//             field: 'Subject',
//             headerName: 'Subject',
//             width: 250
//         },
//         {
//             field: 'Assignment',
//             headerName: 'Assignment Title',
//             width: 300
//         },
//         {
//             field: 'Duedate',
//             headerName: 'Due Date+ Time',
//             width: 300
//         },
//         // {
//         //     field: 'Studentlist',
//         //     headerName: 'Student List',
//         //     width: 250,
//         //     renderCell: (params) => {
//         //         return (
//         //             <>
//         //                 <p style={{ width: '23%' }}> {params.formattedValue} </p>
//         //                 {/* <Link to={'/user/'+params.row.id} />
//         //                  <Link to={'/studentlists'}>
//         //                     <button className="StudentListEditBtn" >Student List</button>
//         //                 </Link>  */}
//         //             </>
//         //         );
//         //     }
//         // },
//         {
//             field: 'Action',
//             headerName: 'More',
//             width: 200,
//             renderCell: (params) => {
//                 return (
//                     <>
//                         <Button
//                           aria-describedby={params.row.id}
//                           variant="contained"
//                           aria-controls={openpoper ? 'fade-menu' : undefined}
//                           aria-haspopup="true"
//                           aria-expanded={openpoper ? 'true' : undefined}
//                           onClick={handleClick}
//                           sx={{height:"25px", width:"20px", backgroundColor:"#2CC5CE"}}
//                         >
//                             Edit
//                         </Button>
//                         {/* <Link to={'/assignmentedit/'+params.row.id}>
//                             <button className="UserListEditBtn" onClick={() => callbackedit(params.row.id)}>Edit</button>
//                         </Link>
//                         <IconTrash className="UserListDelete" onClick={() => {
//                             handleClickOpen();
//                             setDeleteId(params.row.id);
//                         }} /> */}

//                         <Menu
//                             id="fade-menu"
//                             MenuListProps={{
//                                 'aria-labelledby': 'fade-button'
//                             }}
//                             anchorEl={anchorEl}
//                             open={openpoper}
//                             onClose={handleClose}
//                             TransitionComponent={Fade}
//                             sx={{width:"130px"}}  
//                         >
//                             <MenuItem onClick={handleClickOpen} >Edit</MenuItem>
//                             <MenuItem
//                                 onClick={() => {
//                                     handleDeleteOpen();
//                                     setDeleteId(params.row.id);
//                                 }}
//                             >
//                                 Delete
//                             </MenuItem>
//                             <MenuItem>Download</MenuItem>
//                             {/* <MenuItem  onClick={ () => openLinkInNewTab('https://grwth.leoluca.io/?assignments=room1')}>Delete</MenuItem> */}
//                         </Menu>
//                         <PendingOutlinedIcon 
//                          sx={{margin:"10px"}}
//                         ></PendingOutlinedIcon>
//                     </>
//                 );
//             }
//         }
//     ];

//     const [open, setOpen] = useState(false);
//     const handleDeleteOpen = () => {
//         setOpen(true);
//         setAnchorEl(null);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleOnCellClick = (params) => {
//         const value = params.colDef.field;
//         console.log(value);
//         if (value === 'Action') {
//             return;
//         }
//         navigate('/studentlists');
//     };

//     return (
//         <>
        
//             <Box>
//                 <Dialog
//                     open={open}
//                     onClose={handleClose}
//                     aria-labelledby="alert-dialog-title"
//                     sx={{ width: '20%', height: '28%', position: 'absolute', top: '40%', left: '40%' }}
//                 >
//                     <DialogTitle id="alert-dialog-title"></DialogTitle>
//                     <DialogContent>
//                         <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
//                             <IconTrash />
//                             <Typography variant="h3" component="h3">
//                                 {'Are you sure you '} <br />
//                                 {'want to delete this?'}
//                             </Typography>
//                         </div>
//                     </DialogContent>

//                     <DialogActions>
//                         <Button onClick={handleClose} variant="outlined">
//                             {' '}
//                             <IconX /> Cancel
//                         </Button>
//                         <Button
//                             onClick={() => {
//                                 handleDelete(deleteId);
//                                 handleClose();
//                             }}
//                             variant="contained"
//                         >
//                             <IconCheck /> Delete
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//                 <PerfectScrollbar>
//                 <DataGrid
//                     sx={{ height: '100%', width: '100%', marginTop: '30px' }}
//                     autoHeight
//                     rows={data}
//                     columns={columns}
//                     pageSize={20}
//                     rowsPerPageOptions={[20]}
//                     onCellClick={handleOnCellClick}
//                     // checkboxSelection
//                     // disableSelectionOnClick
//                 />
//                  </PerfectScrollbar>
//             </Box>
       
//         </>
//     );
// };

// export default DataGridtable;
