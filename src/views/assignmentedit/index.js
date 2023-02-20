import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {useLocation} from 'react-router-dom';





export default function AssignmentEdit() {
     
    const location = useLocation();
    const datevalue = location.state.eachvalue.carbs;
    const datevalue1 = datevalue.replace("PM","");
    const datevalue2 = datevalue1.replace("AM","");
    const datevalue3 = datevalue2.split(" ");
    const datevalue4 = datevalue3[0].split("/");
    const realdatevalue = datevalue4[2] + "-" +  datevalue4[0] + "-" +  datevalue4[1] + " " + datevalue3[1];
    return (
        <Container fixed>
            <Box>
                <Box>
                    <Typography variant="h3" component="h4" sx={{fontFamily:"Livvic"}}>
                        Assignment Edit   
                    </Typography>


                    <Stack spacing={4}>
                        <Typography variant="h4" component="h5" sx={{ marginTop: '70px',fontFamily:"Livvic" }}>
                            Class:
                        </Typography>
                        <TextField
                            id="class"
                            label="Class"
                            type="text"
                            defaultValue={location.state.eachvalue.name}
                            sx={{ width: 250 }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Stack>


                    <Stack spacing={4}>
                        <Typography variant="h4" component="h5" sx={{ marginTop: '20px',fontFamily:"Livvic" }}>
                            Subject:
                        </Typography>
                        <TextField
                            id="subject"
                            label="Subject"
                            type="text"
                            defaultValue={location.state.eachvalue.calories
                            }
                            sx={{ width: 250,fontFamily:"Livvic" }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Stack>

                    <Stack spacing={4}>
                        <Typography variant="h4" component="h5" sx={{ marginTop: '20px',fontFamily:"Livvic" }}>
                            Title:
                        </Typography>
                        <TextField
                            id="datetime-local"
                            label="Title"
                            type="text"
                            defaultValue={location.state.eachvalue.fat}
                            sx={{ width: 250,fontFamily:"Livvic" }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Stack>


         

                    <Stack spacing={4}>
                        <Typography variant="h4" component="h5" sx={{ marginTop: '20px',fontFamily:"Livvic" }}>
                            Due Date:
                        </Typography>
                        <TextField
                            id="datetime-local"
                            label="Due Time"
                            type="datetime-local"
                            defaultValue= {realdatevalue}
                            sx={{ width: 250,fontFamily:"Livvic" }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Stack>

                    <Box sx={{ display: 'flex', position: 'absolute', bottom: '30px' }}>
                        <Link to={'/assignments'} style={{ textDecoration: 'none',fontFamily:"Livvic" }}>
                            <Button variant="contained" sx={{fontFamily:"Livvic"}}>Cancel</Button>
                        </Link>
                        <Button variant="contained" sx={{ marginLeft: '50px',fontFamily:"Livvic" }}>
                            Update
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
