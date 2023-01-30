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

export default function AssignmentEdit() {
    return (
        <Container fixed>
            <Box>
                <Box>
                    <Typography variant="h3" component="h4">
                        Assignment Edit
                    </Typography>

                    <Stack spacing={2}>
                        <Typography variant="h4" component="h5" sx={{ marginTop: '20px' }}>
                            Title:
                        </Typography>
                        <TextField
                            id="datetime-local"
                            label="Title"
                            type="text"
                            defaultValue="English Grammar"
                            sx={{ width: 250 }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Stack>

                    <Stack spacing={2}>
                        <Typography variant="h4" component="h5" sx={{ marginTop: '20px' }}>
                            Description:
                        </Typography>
                        <TextareaAutosize
                            id="datetime-local"
                            minRows={5}
                            label="Description"
                            type="text"
                            defaultValue="This is the chapter 1 assignment."
                        />
                    </Stack>

                    <Stack spacing={2}>
                        <Typography variant="h4" component="h5" sx={{ marginTop: '20px' }}>
                            Grade:
                        </Typography>
                        <TextField
                            id="datetime-local"
                            label="Grade"
                            type="text"
                            defaultValue="100"
                            sx={{ width: 250 }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Stack>

                    <Stack spacing={2}>
                        <Typography variant="h4" component="h5" sx={{ marginTop: '20px' }}>
                            class: A1
                        </Typography>
                    </Stack>

                    <Stack spacing={2}>
                        <Typography variant="h4" component="h5" sx={{ marginTop: '20px' }}>
                            Subject: English
                        </Typography>
                    </Stack>

                    <Stack spacing={2}>
                        <Typography variant="h4" component="h5" sx={{ marginTop: '20px' }}>
                            Due Date:
                        </Typography>
                        <TextField
                            id="datetime-local"
                            label="Due Time"
                            type="datetime-local"
                            defaultValue=""
                            sx={{ width: 250 }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Stack>

                    <Box sx={{ display: 'flex', position: 'absolute', bottom: '30px' }}>
                        <Link to={'/assignments'} style={{ textDecoration: 'none' }}>
                            <Button variant="contained">Cancel</Button>
                        </Link>
                        <Button variant="contained" sx={{ marginLeft: '50px' }}>
                            Update
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
