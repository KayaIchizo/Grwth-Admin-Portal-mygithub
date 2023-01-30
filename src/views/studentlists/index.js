import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { IconUserCircle } from '@tabler/icons';
import ImageListItem from '@mui/material/ImageListItem';
import room1 from '../../assets/images/roomimg/room1.png';
import Select from '../../components/select/select';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DialogContent from '@mui/material/DialogContent';

export default function Studentlists() {
    const filterstatus = [
        { key: 'new', value: 'new' },
        { key: 'submitted', value: 'submitted' },
        { key: 'missing', value: 'missing' },
        { key: 'done late', value: 'done late' },
        { key: 'grade', value: 'grade' }
    ];

    const userlists = [
        { name: 'Kaya Ichizo',status:"status",grademark:"Grade/Mark", duedate: 'Edited on 28 Dec 06:16', status: 'New' },
        { name: 'Joby Wong', status:"status",grademark:"Grade/Mark", duedate: 'Edited on 19 Dec 12:16', status: 'New' },
        { name: 'NiKi Fung',status:"status",grademark:"Grade/Mark", duedate: 'Edited on 15 Dec  11:13', status: 'Submitted' },
        { name: 'Noah Lau',status:"status", grademark:"Grade/Mark",duedate: 'Edited on 20 Dec  10:30', status: 'Done late', scoreable: true },
        { name: 'Leo',status:"status",grademark:"Grade/Mark", duedate: 'Edited on 12 Dec  9:00', status: 'Submitted' },
        { name: 'Yung',status:"status",grademark:"Grade/Mark", duedate: 'Edited on 18 Dec  7:20', status: 'Missing' }
    ];

    const sortedUserList = useMemo(() => userlists.sort((a, b) => b.duedate.localeCompare(a.duedate)), [userlists]);

    const [anchorEl, setAnchorEl] = useState('');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [textpopover, setTextpopover] = useState(false);
    const handleClose = () => {
        setAnchorEl(null);
        setTextpopover(!textpopover);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const Markfunc = () => {};

    const Classlist = [{ title: '1A' }, { title: '1B' }, { title: '1C' }, { title: '2A' }, { title: '2B' }, { title: '2C' }];
    const [openstudentlist, Setopenstudentlist] = useState(false);
    const handleclickstudentlistopen = () => {
        Setopenstudentlist(true);
    };
    const handleclickstudentlistclose = () => {
        Setopenstudentlist(false);
    };
    const handleClickOpen = () => {
        Setopenstudentlist(true);
        setAnchorEl(null);
    };

    const onChangeText = (value, index) => {};

    const [textFileValue, setTextFieldValue] = useState(null);

    return (
        <Box>
            <Box sx={{ display: 'flex',justifyContent:"space-between", marginTop: '10px' }}>
              
              <Box sx={{display:"flex", alignItems:"center"}}>
                 
                  <Typography variant="h3" component="h4" sx={{ color:"#7983FF" }}>
                      Assignment Title
                  </Typography>
              </Box>


               <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    <Box sx={{marginRight:"100px"}}>
                            Subject:Maths
                    </Box>
                    <Box>
                            Class:1A
                    </Box>

               </Box>
               
             

      
         
          </Box>


            <Box sx={{ display: 'flex',justifyContent:"space-around", marginTop: '40px' }}>
              
                <Box sx={{display:"flex", alignItems:"center"}}>
                    <Stack spacing={4} direction="row">
                    <Typography variant="h3" component="h4" sx={{ borderRadius:"5%", backgroundColor:"#2CC5CE", color:"white" }}>
                        2 Submitted 
                    </Typography>
                    
                
                    <Typography variant="h3" component="h4" sx={{ borderRadius:"5%", backgroundColor:"grey", color:"white"}}>
                        24 Assigned
                    </Typography>
                    </Stack>

                </Box>
                
                <Box>

                <Select defaultValue="Filter by Status" items={filterstatus} />
                </Box>
           
            </Box>

            <Dialog
                open={openstudentlist}
                onClose={handleclickstudentlistclose}
                aria-labelledby="alert-dialog-title"
                className="studentlistdialog"
             
            >
                <Box sx={{display:"flex",backgroundColor:"#2CC5CE", padding:"10px"}}>
                    <Typography variant="h3" component="h3" sx={{color:"white",width:"100%", margin:"0px"}}>
                                {'Comment'} <br />
                    </Typography> 
                 
                    <CloseIcon onClick={handleclickstudentlistclose} sx={{color:"white"}} />
             
                  
                
                </Box>

                <DialogContent>
                        <Box sx={{textAlign:"center", fontSize:"20px"}}>
                           
                                 2022. 12.01 15:15
                           
                        </Box>

                       
                            <Box sx={{display:"flex",fontSize:'20px', alignItems:"center", marginTop:"20px"}}>
                        
                                  <Typography variant="h3" component="h3"  sx={{borderRadius:'50%',width:"40px",height:"40px", backgroundColor:"yellow",padding:"13px",fontWeight:"800",fontWeight:"bold"}}>
                                      T
                                   </Typography>
                               
                                   <Box sx={{marginLeft:"20px"}}>
                                   You did a great job!
                                   </Box>
                               
                            </Box>
                   


                        <Box sx={{textAlign:"center", fontSize:"20px", marginTop:'30px'}}>
                           
                                 2022. 12.02 20:10
                           
                        </Box>

                        <Stack spacing={8} sx={{ width: 300 }} direction="row">
                            <Box sx={{display:"flex",fontSize:'20px', alignItems:"center", marginTop:"20px"}}>
                                   <Typography variant="h3" component="h3"  sx={{borderRadius:'50%',width:"40px",height:"40px", backgroundColor:"pink",padding:"13px",fontWeight:"800",fontWeight:"bold"}}>
                                      V
                                   </Typography>
                               
                                   <Box sx={{marginLeft:"20px"}}>
                                      Thanks!
                                   </Box>
                                 
                            </Box>
                        </Stack>


                        <TextField
                            id="datetime-local"
                            label="Comment"
                            type="text"
                            defaultValue=""
                            sx={{ width: 220, position: 'absolute', bottom: '30px' }}
                            InputLabelProps={{
                                shrink: true
                            }}
                          
                        />
                        <Button variant="contained" style={{ position: 'absolute', bottom: '30px', right: '30px', backgroundColor:"#7983FF", borderRadius:"8px" }}>
                            Send
                        </Button>

                </DialogContent>
                   
              
            </Dialog>
            {sortedUserList.map((userlist, index) => {
                return (
                    <Box
                        key={userlist.name}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            marginTop: '40px',
                            backgroundColor: 'white',
                            alignItems: 'center',
                            boxShadow: "10px 8px 10px -10px;  #ccc",
                            padding:"10px"
                        }}
                    >
                        <ImageListItem sx={{ width: 100, height: 100 }}>
                            <img src={room1} alt="room1" loading="lazy" />
                        </ImageListItem>

                        <Box sx={{alignItems:"center", justifyContent:"center", width:"50px"}}>
                            <Typography variant="h5" component="h6" sx={{borderRadius:"50%",height:"30px", width:"30px",backgroundColor:"#9cdd73", color:"black",padding:"8px"}}>
                                {userlist.name[0]}
                            
                            </Typography>
                        <Box sx={{width:"50px"}}>
                        {userlist.name}
                        </Box>
                        </Box>

                        <Box sx={{width:"60px"}}>
                            {userlist.status}
                        </Box>
                        <Box sx={{width:"60px"}}>
                            {userlist.grademark}
                        </Box>
                   

                        {/* <Typography variant="h2" component="h3" sx={{ width: '15%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                {textFileValue === null ? userlist.status : 'Grade'}
                                {userlist.scoreable && (
                                    <TextField
                                        id="filled-search"
                                        type="text"
                                        variant="filled"
                                        size="small"
                                        style={{ width: '65px', fontWeight: 'bold' }}
                                        inputProps={{ style: { fontSize: 50 } }}
                                        onChange={(e) => setTextFieldValue(e.target.value, index)}
                                    />
                                )}
                            </div>
                        </Typography> */}

                        <Box  sx={{ width: '15%' }}>
                            {userlist.duedate}
                        </Box>

                        <PendingOutlinedIcon  
                         variant="contained"
                         aria-haspopup="true"
                         sx={{height:"25px", color:"#2CC5CE"}}  
                         onClick={handleClick}
                     
                         ></PendingOutlinedIcon>

                        {
                            <Menu
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                }}
                                sx={{ textAlign: 'center', width: '250px' }}
                            >
                                <MenuItem variant="contained" sx={{ "&:hover": { color: "white",backgroundColor:"#2CC5CE"}, color:"#2CC5CE" }} onClick={handleClickOpen}>
                                    Comment
                                </MenuItem>
                                <MenuItem variant="contained" sx={{"&:hover": { color: "white",backgroundColor:"#2CC5CE"},  color:"#2CC5CE" }}>
                                    Delete
                                </MenuItem>
                                <MenuItem variant="contained" sx={{ "&:hover": { color: "white",backgroundColor:"#2CC5CE"}, color:"#2CC5CE" }}>
                                    Download
                                </MenuItem> 
                                {/* <Button variant="contained" sx={{marginTop:"15px"}} onClick={handleClose}> Mark </Button>  */}
                            </Menu>
                        }
                    </Box>
                );
            })}
        </Box>
    );
}
