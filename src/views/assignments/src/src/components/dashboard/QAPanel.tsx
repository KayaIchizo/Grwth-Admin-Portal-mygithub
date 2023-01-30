import React, { useEffect, useMemo, useState } from 'react';
// @mui
import { LoadingButton } from '@mui/lab';
import {
    Grid,
    IconButton,
    styled,
    Typography,
    Checkbox,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    ListItemText,
    SelectChangeEvent,
    alpha,
    Card,
    CardActionArea,
    CardContent,
    Modal,
    Box,
    Menu,
    Stack,
    Tooltip,
    FormControlLabel,
    Switch
} from '@mui/material';
import _ from 'lodash';
import { QATask, QATaskState, TraitIssue } from 'src/@types/qa';
import { ArrowLeftIcon, ArrowRightIcon, SummaryIcon, ResetIcon, ThreeDotIcon } from 'src/assets';
import { pxToRem } from 'src/utils/getFontValue';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

const LargeIconButton = styled(IconButton)(({ theme }) => ({
    height: 75,
    borderRadius: 4,
    width: '100%',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    alignItems: 'center',
    display: 'flex',
    '&:disabled': {
        pointerEvents: 'none',
        backgroundColor: alpha(theme.palette.common.black, 0.5)
    }
}));

const ButtonText = styled(Typography)(({ theme }) => ({
    letterSpacing: 2,
    padding: 2
}));

const DisableLoadingButton = styled(LoadingButton)(({ theme }) => ({
    height: 75,
    borderRadius: 4,
    width: '100%',
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    color: theme.palette.common.white,
    alignItems: 'center',
    display: 'flex',
    '&:disabled': {
        backgroundColor: theme.palette.common.white
    }
}))

const FailedButton = styled(DisableLoadingButton)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.error.dark, 0.4),
    '&:hover': {
        backgroundColor: alpha(theme.palette.error.dark, 0.3),
    }
}))

const StateTextBox = styled(Box)(() => ({
    height: 75,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
}))

const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: alpha(theme.palette.common.black, 0.8),
    backdropFilter: 'blur(10px)',
    border: '1px solid',
    borderColor: alpha(theme.palette.primary.main, 0.5),
    borderRadius: 16,
}))

const TraitIssueRemoveBox = styled(Box)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.error.dark, 0.4),
    color: theme.palette.common.white,
    padding: 0,
    paddingRight: 6,
    paddingLeft: 6,
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    borderRadius: 3,
    height: 35,
    justifyContent: 'center'
}))

const TraitIssueSkeleton = styled(Box)(() => ({
    height: 35,
}))

type Props = {
    data: QATask;
    failing: boolean;
    approving: boolean;
    reseting: boolean;
    isChangeAccess: boolean;
    handleQATaskFail: (mediaIssues: string[], traitIssues: TraitIssue[], comments: string) => void;
    handleQATaskApprove: (comments: string) => void;
    handleQATaskReset: (comments: string) => void;
    handleNavigate: (isNext: boolean, status: string) => void;
    onGoSummary: () => void;
};

type SelectedTraitIssue = {
    id: string;
    name: string;
}

type TraitIssueReason = {
    [value: string]: string[]
}

export default function QAPanel(
    {
        data,
        failing,
        reseting,
        approving,
        isChangeAccess,
        handleQATaskFail,
        handleQATaskApprove,
        handleQATaskReset,
        handleNavigate,
        onGoSummary
    }: Props
) {
    const [currentMediaIssues, setCurrentMediaIssues] = useState<string[]>([]);
    const [isTraitModalOpen, setIsTraitModalOpen] = useState<boolean>(false);
    const [selectedTraitIssue, setSelectedTraitIssue] = useState<SelectedTraitIssue>()
    const [currentTraitIssues, setTraitIssueReason] = useState<TraitIssueReason>({})
    const [traitPossibleIssues, setTraitPossibleIssues] = useState<string[]>([])
    const [currentComment, setCurrentComment] = useState<string>('')
    const [taskState, setTaskState] = useState<QATaskState>()
    const [editedState, setEditedState] = useState<QATaskState>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isPublicTrait, setIsPublicTrait] = useState<boolean>(true);
    const [currentNavStatus, setCurrentNavStatus] = useState<string>(data.state);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [navStatusAnchorEl, setNavStatusAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleNavStatusPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setNavStatusAnchorEl(event.currentTarget);
    };

    const handleNavStatusClose = () => {
        setNavStatusAnchorEl(null);
    };

    const openNavStatus = Boolean(navStatusAnchorEl);

    useEffect(() => {
        if (data) {
            setCurrentMediaIssues(data?.reportedIssues || []);
            setTaskState(data?.state)
            setCurrentComment(data?.comments || '')

            if (data.traits?.length > 0) {
                const loadedIssues: TraitIssueReason = {};
                data.traits.map(trait => {
                    if (trait?.reportedIssues?.length) {
                        loadedIssues[trait.name] = trait.reportedIssues
                    }
                })
                setTraitIssueReason(loadedIssues)
            }
        }
    }, [data])

    const handleChange = (event: SelectChangeEvent<typeof currentMediaIssues>) => {
        const { target: { value } } = event;

        setCurrentMediaIssues(typeof value === 'string' ? value.split(',') : value,);
    };

    const handleTraitIssueClick = (traitValue: string, possibleIssues: string[], traitId: string) => {
        setSelectedTraitIssue({ id: traitId, name: traitValue });
        setTraitPossibleIssues(possibleIssues);
        setIsTraitModalOpen(true);
    }

    const handleIssueModalBtnClick = (reason: string) => {
        const current = _.cloneDeep(currentTraitIssues);
        if (!current[selectedTraitIssue!.name]) current[selectedTraitIssue!.name] = [];

        // check array already contained value
        const index = current[selectedTraitIssue!.name].indexOf(reason);
        if (index > -1) current[selectedTraitIssue!.name].splice(index, 1)
        else current[selectedTraitIssue!.name].push(reason)

        setTraitIssueReason(current);
    }

    const handleModalClose = () => setIsTraitModalOpen(false);

    const handleRemoveIssueClick = (key: string, reason: string) => {
        const current = _.cloneDeep(currentTraitIssues);

        // check array already contained value
        const index = current[key].indexOf(reason);
        if (index > -1) {
            current[key].splice(index, 1)
            if (current[key].length == 0) delete current[key]
        }

        setTraitIssueReason(current);
    }

    const canFailed = useMemo(() => {
        if ((Object.values(currentTraitIssues).length > 0 || currentMediaIssues.length > 0) &&
            taskState === QATaskState.PENDING
        )
            return true

        return false
    }, [currentTraitIssues, currentMediaIssues, taskState])


    const onFail = () => {
        if (canFailed) {
            const traitIssues: TraitIssue[] = [];

            Object.keys(currentTraitIssues).map(traitKey => {
                const i = data.traits.findIndex(trait => trait.name === traitKey);
                if (i > -1) {
                    const id = data.traits[i]._id;
                    traitIssues.push({ _id: id, reportedIssues: currentTraitIssues[traitKey] })
                }
            })

            handleQATaskFail(currentMediaIssues, traitIssues, currentComment)
        }
    }

    const onChangeState = (state: QATaskState) => {
        handleClose();
        setEditedState(state);
    }

    const onChangeNavState = (state: string) => {
        handleNavStatusClose();
        setCurrentNavStatus(state);
    }

    const onEditedStateSave = async () => {
        if (editedState !== taskState) {
            try {
                // approving
                if (editedState === QATaskState.APPROVED) {
                    await handleQATaskApprove(currentComment);
                }
                // pending
                else if (editedState === QATaskState.PENDING) {
                    await handleQATaskReset(currentComment);
                }
                // failing
                else {
                    if ((Object.values(currentTraitIssues).length > 0 || currentMediaIssues.length > 0)) {
                        const traitIssues: TraitIssue[] = [];

                        Object.keys(currentTraitIssues).map(traitKey => {
                            const i = data.traits.findIndex(trait => trait.name === traitKey);
                            if (i > -1) {
                                const id = data.traits[i]._id;
                                traitIssues.push({ _id: id, reportedIssues: currentTraitIssues[traitKey] })
                            }
                        })

                        await handleQATaskFail(currentMediaIssues, traitIssues, currentComment)
                    }
                }
            } catch (err) {
                console.error(err)
            } finally {
                setEditedState(undefined);
                setIsEditing(false);
            }

        }
    }

    const onReset = async () => {
        await handleQATaskReset(currentComment);
        setEditedState(undefined);
        setIsEditing(false)
    }

    const canSaveEdited = useMemo(() => {
        if (editedState && editedState !== taskState) {
            if (editedState === QATaskState.FAILED && !(Object.values(currentTraitIssues).length > 0 || currentMediaIssues.length > 0)) return false;

            return true;
        }
        return false;
    }, [editedState, taskState, currentTraitIssues, currentMediaIssues])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <LargeIconButton onClick={handleNavStatusPopoverOpen} >
                                <ButtonText variant='caption' sx={{ fontSize: pxToRem(10) }}>
                                    {currentNavStatus}
                                </ButtonText>
                                <Iconify icon={'material-symbols:arrow-drop-down'} height={20} />
                            </LargeIconButton>
                            <Menu
                                anchorEl={navStatusAnchorEl}
                                open={openNavStatus}
                                onClose={handleNavStatusClose}
                                PaperProps={{
                                    sx: {
                                        borderRadius: 0,
                                        width: 170
                                    }
                                }}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                {["ALL", ...Object.values(QATaskState)].map((state) =>
                                    <MenuItem key={state} onClick={() => onChangeNavState(state)}>{state}</MenuItem>
                                )}
                            </Menu>
                        </Grid>
                        <Grid item xs={3}>
                            <LargeIconButton onClick={() => handleNavigate(false, currentNavStatus)}>
                                <ArrowLeftIcon />
                            </LargeIconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <LargeIconButton onClick={() => handleNavigate(true, currentNavStatus)}>
                                <ArrowRightIcon />
                            </LargeIconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <LargeIconButton onClick={onGoSummary}>
                        <SummaryIcon />
                        <ButtonText variant='body2'>
                            SUMMARY
                        </ButtonText>
                    </LargeIconButton>
                </Grid>
                <Grid item xs={12} md={2}>
                    <LargeIconButton>
                        <ThreeDotIcon />
                    </LargeIconButton>
                </Grid>
                <Grid item xs={12} md={5}>
                    {!(taskState == QATaskState.APPROVED || taskState == QATaskState.FAILED || taskState == QATaskState.PUBLISHED) ?
                        <Tooltip title={canFailed ? "You can't approve this task for now" : "Approve"}>
                            <span>
                                <DisableLoadingButton loading={approving} disabled={!isChangeAccess || canFailed} onClick={() => handleQATaskApprove(currentComment)}>
                                    <ButtonText variant='body2'>
                                        APPROVE
                                    </ButtonText>
                                </DisableLoadingButton>
                            </span>
                        </Tooltip> :
                        isEditing ?
                            <>
                                <LargeIconButton onClick={handlePopoverOpen} >
                                    <ButtonText variant='body2' color={((editedState || taskState) == QATaskState.APPROVED || (editedState || taskState) == QATaskState.PUBLISHED) ? 'success.main' : (editedState || taskState) == QATaskState.FAILED ? "error.main" : 'warning.main'}>
                                        {editedState || taskState}
                                    </ButtonText>
                                    <Iconify icon={'material-symbols:arrow-drop-down'} height={20} />
                                </LargeIconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: 0,
                                            width: 170
                                        }
                                    }}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    {Object.values(QATaskState).map((state) =>
                                        (state !== QATaskState.PUBLISHED && state !== taskState) && <MenuItem key={state} onClick={() => onChangeState(state)}>{state}</MenuItem>
                                    )}
                                </Menu>
                            </> :
                            <StateTextBox>
                                <Typography color={(taskState == QATaskState.APPROVED || taskState == QATaskState.PUBLISHED) ? 'success.main' : 'error.main'}>
                                    {taskState}
                                </Typography>
                            </StateTextBox>
                    }
                </Grid>
                <Grid item xs={12} md={5} paddingBottom={2}>
                    {(taskState == QATaskState.APPROVED || taskState == QATaskState.FAILED || taskState == QATaskState.PUBLISHED) ?
                        isEditing ? <DisableLoadingButton loading={approving || failing || reseting} onClick={onEditedStateSave} disabled={!canSaveEdited}>
                            <ButtonText variant='body2'>
                                SAVE CHANGES
                            </ButtonText>
                        </DisableLoadingButton> :
                            <Tooltip title={isChangeAccess ? "Edit status" : "You don't have permission to do this"}>
                                <span>
                                    <LargeIconButton onClick={() => setIsEditing(true)} disabled={!isChangeAccess}>
                                        <ButtonText variant='body2'>
                                            EDIT
                                        </ButtonText>
                                        <Iconify icon={'material-symbols:edit'} height={20} />
                                    </LargeIconButton>
                                </span>
                            </Tooltip> :
                        <FailedButton loading={failing} disabled={!isChangeAccess || !canFailed} onClick={onFail}>
                            <ButtonText variant='body2'>
                                FAIL
                            </ButtonText>
                        </FailedButton>
                    }
                </Grid>
                <Grid item xs={12} md={2}>
                    <Tooltip title={isChangeAccess ? "Reset" : "You don't have permission to do this"}>
                        <span>
                            <LargeIconButton onClick={onReset} disabled={!isChangeAccess}>
                                <ResetIcon />
                            </LargeIconButton>
                        </span>
                    </Tooltip>
                </Grid>
                {/* Check box issues */}
                <Grid item xs={12} md={12}>
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel>Select media issues</InputLabel>
                        <Select
                            multiple
                            value={currentMediaIssues}
                            fullWidth
                            onChange={handleChange}
                            input={<OutlinedInput label="Select media issues" />}
                            renderValue={(selected) => selected.join(', ')}
                            sx={{
                                bgcolor: (theme) => alpha(theme.palette.common.white, 0.1)
                            }}
                        >
                            {data.possibleIssues?.map((issue) => (
                                <MenuItem key={issue} value={issue}>
                                    <Checkbox checked={currentMediaIssues.indexOf(issue) > -1} />
                                    <ListItemText primary={issue} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                    <FormControlLabel control={<Switch defaultChecked={true} value={isPublicTrait} onChange={(e) => setIsPublicTrait(e.target.checked)} />} label="Public Traits" />
                </Grid>
                {data.traits?.length > 0 &&
                    <Grid item xs={12} md={12}>
                        <Grid
                            container
                            spacing={1}
                            sx={{
                                bgcolor: (theme) => alpha(theme.palette.common.white, 0.1),
                                paddingRight: 1,
                                paddingBottom: 1,
                                margin: 0,
                                borderRadius: 1,
                                width: '100%'
                            }}
                        >
                            {data.traits?.map((trait, i) =>
                                <Grid item md={4} key={trait._id}>
                                    <Card sx={{ bgcolor: (theme) => alpha(theme.palette.common.black, .4), height: '100%' }}>
                                        {currentTraitIssues![trait.name]?.length > 0 ?
                                            <CardContent sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                                                <Typography align='center' gutterBottom variant="subtitle2" color="primary" component="div">
                                                    {trait.name}
                                                </Typography>
                                                <Typography gutterBottom align='center' variant="body2">
                                                    {isPublicTrait ? trait.publicValue : trait.renderValue}
                                                </Typography>
                                                <Stack spacing={0.5}>
                                                    {currentTraitIssues![trait.name].map((reason, index) =>
                                                        <TraitIssueRemoveBox key={index + reason}>
                                                            {reason}
                                                            <IconButton sx={{ padding: 0, zIndex: 10 }} onClick={() => handleRemoveIssueClick(trait.name, reason)}>
                                                                <Iconify icon={'material-symbols:close'} width={15} height={15} color='common.white' />
                                                            </IconButton>
                                                        </TraitIssueRemoveBox>
                                                    )}
                                                </Stack>
                                            </CardContent> :
                                            <CardActionArea onClick={() => handleTraitIssueClick(trait.name, trait.possibleIssues, trait._id)} sx={{ height: '100%' }}>
                                                <CardContent sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                                    <Typography align='center' gutterBottom variant="subtitle2" color="primary" component="div">
                                                        {trait.name}
                                                    </Typography>
                                                    <Typography gutterBottom align='center' variant="body2">
                                                        {isPublicTrait ? trait.publicValue : trait.renderValue}
                                                    </Typography>
                                                    <TraitIssueSkeleton />
                                                </CardContent>
                                            </CardActionArea>
                                        }
                                    </Card>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                }
                <Grid item md={12}>
                    <TextField
                        label="Comment"
                        placeholder='Write comment about this render and what is wrong with it.'
                        multiline
                        minRows={2}
                        sx={{ minWidth: '100%' }}
                        onChange={(e) => setCurrentComment(e.target.value)}
                        value={currentComment}
                    />
                </Grid>
            </Grid>
            <Modal open={isTraitModalOpen} onClose={handleModalClose}>
                <ModalBox>
                    <Box
                        sx={{
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.6),
                            padding: 2,
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12
                        }}
                    >
                        <Typography variant='subtitle1' align='center'>
                            What is wrong with the trait?
                        </Typography>
                    </Box>
                    <Grid container spacing={6} padding={pxToRem(53)}>
                        {traitPossibleIssues?.map((issue) =>
                            <Grid
                                key={issue}
                                item
                                md={6}
                            >
                                <Button
                                    onClick={() => handleIssueModalBtnClick(issue)}
                                    variant='outlined'
                                    fullWidth
                                    color={currentTraitIssues[selectedTraitIssue!.name]?.includes(issue) ? 'primary' : 'inherit'}
                                    size='small'
                                >
                                    {issue}
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </ModalBox>
            </Modal>
        </>
    );
}