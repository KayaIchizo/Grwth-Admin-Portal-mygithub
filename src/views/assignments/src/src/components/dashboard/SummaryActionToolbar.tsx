import React, { useRef, useState } from 'react'
import { Stack, Checkbox, Box, IconButton, Tooltip, Popover, List, ListItem, ListItemButton, ListItemText, Button, Modal, alpha, Typography, FormControl, InputLabel, Select, MenuItem, styled } from '@mui/material';
// components
import Iconify from '../Iconify';
import { QATaskState, QAUser } from 'src/@types/qa';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

type Props = {
    isAdmin?: boolean;
    rowCount?: number;
    numSelected?: number;
    qaUsers: QAUser[];
    qaTasksAssigning: boolean;
    qaTasksDistributing: boolean;
    qaTasksPublishing: boolean;
    canPublish: boolean;
    onEditSelectedRows?: () => void;
    onSelectAllRows?: (checked: boolean) => void;
    onSelectRowsByStatus: (checked: boolean, status: string) => void;
    handleQATaskAssign: (email: string) => void;
    handleQATaskDistribute: () => void;
    handleQATasksPublish: () => void;
};

const StyledActionArea = styled(Box)(({ theme }) => ({
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    display: 'flex'
}));

const CancelButton = styled(Button)(({ theme }) => ({
    width: '100%',
    border: '1px solid',
    borderColor: alpha(theme.palette.common.white, 0.2)
}))

const EditButton = styled(LoadingButton)(({ theme }) => ({
    width: '100%',
    border: '1px solid',
    borderColor: alpha(theme.palette.common.white, 0.2),
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.4),
    },
}))

const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    width: '100%',
    backdropFilter: 'blur(10px)',
}))

export default function SummaryActionToolbar({
    isAdmin = false,
    rowCount = 0,
    numSelected = 0,
    qaUsers,
    qaTasksAssigning,
    qaTasksDistributing,
    qaTasksPublishing,
    canPublish,
    onSelectAllRows,
    onSelectRowsByStatus,
    onEditSelectedRows,
    handleQATaskAssign,
    handleQATaskDistribute,
    handleQATasksPublish,
}: Props) {
    const checkBoxRef = useRef<any>(null);
    const [isSelectModalOpen, setIsSelectModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<string>()
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleGroupSelect = (value: string) => {
        const checked: boolean = checkBoxRef.current?.children[0]?.checked || false;
        if (value == "ALL") {
            onSelectAllRows && onSelectAllRows(!checked)
        } else {
            onSelectRowsByStatus(!checked, value)
        }
        handlePopoverClose();
    }

    const selectModalClose = () => {
        setIsSelectModalOpen(false);
        setSelectedUser(undefined);
    }

    const handleAssign = () => {
        if (selectedUser) {
            selectModalClose()
            handleQATaskAssign(selectedUser)
        }
    }

    return (
        <Stack flexDirection="row" sx={{ py: 1, px: 2, bgcolor: 'background.neutral', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
            {onSelectAllRows && (
                <StyledActionArea>
                    <Tooltip title="Select all" placement="top">
                        <>
                            <Checkbox
                                ref={checkBoxRef}
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={rowCount > 0 && numSelected === rowCount}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    onSelectAllRows(event.target.checked)
                                }
                                sx={{ p: .2 }}
                            />
                            <IconButton sx={{ m: 0, p: 0 }} onClick={handlePopoverOpen}>
                                <Iconify icon={'material-symbols:arrow-drop-down-rounded'} />
                            </IconButton>
                            <Popover
                                sx={{
                                    zIndex: 10
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                disableRestoreFocus
                            >
                                <List>
                                    {Object.values({ ALL: "ALL", ...QATaskState, }).map(value =>
                                        <ListItem key={value}>
                                            <ListItemButton onClick={() => handleGroupSelect(value)}>
                                                <ListItemText sx={{ textTransform: 'capitalize' }} primary={value} />
                                            </ListItemButton>
                                        </ListItem>
                                    )}
                                </List>
                            </Popover>
                        </>
                    </Tooltip>
                </StyledActionArea>
            )}
            {isAdmin &&
                <Stack direction="row" justifyContent={'flex-end'} spacing={1}>
                    <Tooltip title="Edit multiple tasks status" placement="top">
                        <span>
                            <Button variant='outlined' size='small' color='inherit' disabled={!(numSelected > 0)} onClick={onEditSelectedRows}>
                                <Iconify icon={'material-symbols:edit'} sx={{ mr: 1 }} />
                                Edit
                            </Button>
                        </span>
                    </Tooltip>
                    <Tooltip title="The distribute will do all pending tasks" placement="top">
                        <LoadingButton loading={qaTasksDistributing} variant='outlined' size='small' color='inherit' onClick={handleQATaskDistribute}>
                            <Iconify icon={'mdi:account-multiple-plus'} sx={{ mr: 1 }} />
                            Distribute Batch Tasks
                        </LoadingButton>
                    </Tooltip>
                    <Tooltip title="Assign multiple tasks to users" placement="top">
                        <span>
                            <LoadingButton loading={qaTasksAssigning} onClick={() => setIsSelectModalOpen(true)} disabled={!(numSelected > 0)} variant='outlined' size='small' color='inherit'>
                                <Iconify icon={'mdi:account-multiple-plus'} sx={{ mr: 1 }} />
                                QA Users Assign
                            </LoadingButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Publish selected QATasks" placement="top">
                        <span>
                            <LoadingButton disabled={!canPublish} loading={qaTasksPublishing} variant='outlined' size='small' color='inherit' onClick={handleQATasksPublish}>
                                <Iconify icon={'material-symbols:keyboard-double-arrow-up-rounded'} sx={{ mr: 1 }} />
                                Publish Tasks
                            </LoadingButton>
                        </span>
                    </Tooltip>
                </Stack>
            }
            <Modal open={isSelectModalOpen} onClose={selectModalClose}>
                <ModalBox>
                    <Box
                        sx={{
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
                            padding: 2,
                        }}
                    >
                        <Typography variant='subtitle1' align='center'>
                            Assign multiple tasks to user
                        </Typography>
                    </Box>
                    <Stack
                        direction="column"
                        flexWrap="wrap"
                        alignItems="center"
                        justifyContent="space-around"
                        sx={{
                            bgcolor: (theme) => alpha(theme.palette.common.black, 0.3),
                            height: 400,
                            padding: 2,
                        }}
                    >
                        {qaUsers.length > 0 &&
                            <FormControl fullWidth sx={{ maxWidth: 600 }}>
                                <InputLabel id="status-select-label">Users</InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    value={selectedUser || ''}
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                >
                                    {qaUsers.map(user => <MenuItem value={user.email} key={user.email}>{user.email}</MenuItem>)}
                                </Select>
                            </FormControl>
                        }
                        <Stack direction="row" spacing={2} sx={{ maxWidth: 600, width: '100%' }}>
                            <CancelButton variant="contained" color="secondary" sx={{ backgroundColor: (theme) => theme.palette.common.black }} onClick={selectModalClose}>Cancel</CancelButton>
                            <EditButton disabled={!selectedUser} onClick={handleAssign}>Assign</EditButton>
                        </Stack>
                    </Stack>
                </ModalBox>
            </Modal>
        </Stack>
    );
}
