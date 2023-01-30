import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NetworkStatus, useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
// @mui
import { LoadingButton } from '@mui/lab';
import { alpha, Box, Button, capitalize, Card, Container, Divider, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, Stack, styled, Tab, Table, TableBody, TableContainer, Tabs, TextField, Typography } from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
import useTable from 'src/hooks/useTable';
import useTabs from 'src/hooks/useTabs';
import useAuth from 'src/hooks/useAuth';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSkeleton, TablePagination, TableSearchToolbar } from 'src/components/table';
import QAToolTableRow from 'src/components/qatool/QAToolTableRow';
import { QAToolActionToolbar } from 'src/components/qatool';
// utils
import { QA_TASK_QUERY } from 'src/apollo/queries';
import { QA_TASK_ACTION_VAR, QA_TASK_VAR } from 'src/apollo/variables';
import { useRouter } from 'next/router';
import { QATask, QATasks, QATaskState, QAFailedReasonModal, QATasksFilter } from 'src/@types/qa';
import { QA_TASK_MUTATION } from 'src/apollo/mutations';
import { PATH_ROUTE } from 'src/routes/paths';
import Iconify from 'src/components/Iconify';
import { NotifyMessages } from 'src/utils/constants';
import useHandleResponse from 'src/hooks/useHandleResponse';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'avatarUrl', label: 'Icon', align: 'left', width: 50 },
    { id: 'tokenId', label: 'Token ID', align: 'left' },
    { id: 'renderId', label: 'Render ID', align: 'left' },
    { id: 'collection', label: 'Collection', align: 'left' },
    { id: 'batch', label: 'Batch', align: 'left' },
    { id: 'state', label: 'Status', align: 'left' },
    { id: '', label: '', align: 'center', width: 50 },
];

const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    width: '100%',
    backdropFilter: 'blur(10px)',
}))

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

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: alpha(theme.palette.common.white, 0.7),
    '&.Mui-selected': {
        color: theme.palette.common.white,
    }
}));

const IssueContentBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#232323',
    padding: 15,
    height: 400,
    marginTop: 10,
    borderRadius: 10
}));
// ----------------------------------------------------------------------

Index.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout variant='dashboard'>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Index() {

    const REASONTABS = [
        { value: 'reason', label: 'Failed reasons' },
        { value: 'comments', label: "Comments" },
    ] as const;

    const { themeStretch } = useSettings();
    const { push } = useRouter();
    const { user } = useAuth();
    const { handleApolloRes } = useHandleResponse();
    const { enqueueSnackbar } = useSnackbar();
    const [filter, setFilter] = useState<string>('');
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [currentEditModalStatus, setCurrentEditModalState] = useState<QATaskState>()
    const [currentComment, setCurrentComment] = useState<string>('')
    const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs(QATaskState.PENDING.toLowerCase());
    const { currentTab: reasonTabStatus, onChangeTab: onReasonTabStatus } = useTabs(REASONTABS[0].value)
    const [isReasonModalOpen, setIsReasonModalOpen] = useState<boolean>(false);
    const [reasonModalData, setReasonModalData] = useState<QAFailedReasonModal>();
    const [reasonModalTitle, setReasonModalTitle] = useState<string>('');

    const defaultQueryVars: QATasksFilter = QA_TASK_VAR.byFilter(
        undefined,
        undefined,
        user?.email || undefined,
        undefined,
        undefined,
        undefined,
        100
    );

    const [prevRefetchingVars, setPrevRefetchingVars] = useState<QATasksFilter>(defaultQueryVars);

    const {
        order,
        orderBy,
        rowsPerPage,
        page,
        setPage,
        selected,
        onSelectRow,
        onSelectAllRows,
        onSort,
        onChangeRowsPerPage,
    } = useTable({ defaultOrderBy: 'id' });

    const { loading, data, refetch, networkStatus } = useQuery<QATasks, QATasksFilter>(QA_TASK_QUERY.get_qa_tasks, {
        variables: defaultQueryVars,
        notifyOnNetworkStatusChange: true
    })

    const [qaTaskApprove] = useMutation(QA_TASK_MUTATION.approve)
    const [qaTaskReset] = useMutation(QA_TASK_MUTATION.reset)
    const [qaBuilkTaskApprove, { loading: builkApproving }] = useMutation(QA_TASK_MUTATION.builkApprove);
    const [qaBuilkTaskReset, { loading: builkReseting }] = useMutation(QA_TASK_MUTATION.builkReset);
    const [qaBuilkTaskFail, { loading: builkFailing }] = useMutation(QA_TASK_MUTATION.builkFail);

    useEffect(() => {
        const vars: QATasksFilter = {
            ...prevRefetchingVars,
            orderBy: { direction: order === "asc" ? 1 : -1, field: orderBy }
        };
        refetch(vars);
        // eslint-disable-next-line
    }, [order, orderBy])

    const dataFiltered = useMemo(() => {
        if (!loading && data && data.qaTasks.length > 0) {
            return applyTabFilter({
                tableData: data.qaTasks,
                filterStatus
            });
        } else {
            return []
        }
    }, [loading, data, filterStatus])

    const isNotFound = useMemo(
        () => Boolean(!loading && !(dataFiltered.length > 0)),
        [loading, dataFiltered]
    )

    const getLengthByStatus = useCallback((status: string) => {
        if (data && data.qaTasks.length > 0) {
            return data.qaTasks.filter((item) => item.state.toLowerCase() === status).length;
        }
        return 0
    }, [data])

    const handleFilter = async (value: string) => {
        const vars = { ...prevRefetchingVars, search: value, offset: 0 };
        setFilter(value);
        setPage(0);
        await refetch(vars);
        setPrevRefetchingVars(vars)
    };

    const handleViewRow = (id: string, tokenId: string, collection: string, batch: string, renderId: string, batchId: string) => {
        push({
            pathname: PATH_ROUTE.qaTool.qaTask,
            query: { collection, tokenId, batchName: batch, taskId: id, renderId, batchId }
        });
    };

    const handleQATaskApprove = (id: string) => {
        qaTaskApprove({
            variables: QA_TASK_ACTION_VAR.approve(id),
            update(cache, result) {
                handleApolloRes(result, NotifyMessages.APPROVED);
            },
        })
    }

    const handleQATaskReset = (id: string) => {
        qaTaskReset({
            variables: QA_TASK_ACTION_VAR.reset(id, ""),
            update(cache, result) {
                handleApolloRes(result, NotifyMessages.RESET);
            },
        })
    }

    const handleQATaskFailed = (id: string, tokenId: string, collection: string, batch: string, renderId: string, batchId: string) => {
        handleViewRow(id, tokenId, collection, batch, renderId, batchId);
    }

    const handleBuilkEditStatus = () => {
        if (selected.length > 0) {
            // builk approve
            if (currentEditModalStatus === QATaskState.APPROVED) {
                qaBuilkTaskApprove({
                    variables: QA_TASK_ACTION_VAR.builkApprove(selected, currentComment),
                    update(cache, result) {
                        handleApolloRes(result, NotifyMessages.BUILK_APPROVE);
                        statusEditModalClose()
                    },
                })
            } else if (currentEditModalStatus === QATaskState.PENDING) {
                qaBuilkTaskReset({
                    variables: QA_TASK_ACTION_VAR.builkReset(selected, currentComment),
                    update(cache, result) {
                        handleApolloRes(result, NotifyMessages.BUILK_RESET);
                        statusEditModalClose()
                    },
                })
            }
            else if (currentEditModalStatus === QATaskState.FAILED) {
                qaBuilkTaskFail({
                    variables: QA_TASK_ACTION_VAR.builkFail(selected, [], currentComment),
                    update(cache, result) {
                        handleApolloRes(result, NotifyMessages.BUILK_FAILED);
                        statusEditModalClose()
                    },
                })
            }
        }
    }

    const onEditSelectedRows = () => {
        if (selected.length > 0) {
            setIsEditModalOpen(true);
        }
    }

    const onNextOrPrevLoading = async (isNext: boolean, size: number) => {
        try {
            const pageNumber = isNext ? page + 1 : page - 1
            if (pageNumber >= 0) {
                const vars = { ...prevRefetchingVars, offset: pageNumber * rowsPerPage };
                const { data: refectedData } = await refetch(vars);

                if (refectedData.qaTasks.length > 0) {
                    setPrevRefetchingVars(vars)
                    setPage(isNext ? page + 1 : page - 1)
                }
                else {
                    enqueueSnackbar(isNext ? "This is last page" : "This is first page", { variant: 'error' })
                    if (prevRefetchingVars) await refetch(prevRefetchingVars)
                    else await refetch(defaultQueryVars)
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const onPagePerChanged = async (num: number) => {
        try {
            const vars: QATasksFilter = { ...prevRefetchingVars, first: num };
            onChangeRowsPerPage(num)

            const { data: refectedData } = await refetch(vars);

            if (refectedData.qaTasks.length > 0) {
                setPrevRefetchingVars(vars)
            }
            else {
                if (prevRefetchingVars) await refetch(prevRefetchingVars);
                else await refetch(defaultQueryVars)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const onOpenReasonModal = async (data: QATask) => {
        const traitIssues: string[] = [];
        setReasonModalTitle(`${data.batch} / Token ID: ${data.tokenId}`)
        data.traits?.map(trait => {
            trait.reportedIssues?.map((issue: string) => traitIssues.push(`${trait.name} - ${issue}`))
        })
        setReasonModalData({
            reason: { media: data?.reportedIssues || [], trait: traitIssues },
            comments: data?.comments || ''
        })
        setIsReasonModalOpen(true);
    }

    const statusEditModalClose = () => {
        setIsEditModalOpen(false);
        setCurrentComment('');
        setCurrentEditModalState(undefined);
    }

    const reasonModalClose = () => {
        setIsReasonModalOpen(false);
        setReasonModalTitle('')
        setReasonModalData(undefined)
    }

    const TABS = [
        { value: 'all', label: 'all', count: data?.qaTasks?.length || 0 },
        { value: QATaskState.PENDING.toLowerCase(), label: QATaskState.PENDING.toLowerCase(), count: getLengthByStatus(QATaskState.PENDING.toLowerCase()) },
        { value: QATaskState.FAILED.toLowerCase(), label: QATaskState.FAILED.toLowerCase(), count: getLengthByStatus(QATaskState.FAILED.toLowerCase()) },
        { value: QATaskState.APPROVED.toLowerCase(), label: QATaskState.APPROVED.toLowerCase(), count: getLengthByStatus(QATaskState.APPROVED.toLowerCase()) },
        { value: QATaskState.PUBLISHED.toLowerCase(), label: QATaskState.PUBLISHED.toLowerCase(), count: getLengthByStatus(QATaskState.PUBLISHED.toLowerCase()) },
    ] as const;

    return (
        <Page title="Futureverse: QA Dashboard">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Card>
                    <TableSearchToolbar
                        filter={filter}
                        onFilter={handleFilter}
                    />
                    <QAToolActionToolbar
                        rowCount={dataFiltered.length}
                        numSelected={selected.length}
                        onEditSelectedRows={onEditSelectedRows}
                        onSelectAllRows={(checked) =>
                            onSelectAllRows(
                                checked,
                                dataFiltered.map((row) => row._id)
                            )
                        }
                        onSelectRowsByStatus={(checked, status) => {
                            onSelectAllRows(
                                checked,
                                dataFiltered.filter((row) => row.state.toLocaleLowerCase() === status.toLocaleLowerCase()).map(row => row._id)
                            )
                        }}
                    />
                    <Tabs
                        allowScrollButtonsMobile
                        variant="scrollable"
                        scrollButtons="auto"
                        value={filterStatus}
                        onChange={onFilterStatus}
                        sx={{ px: 2, bgcolor: 'background.neutral' }}
                    >
                        {TABS.map((tab) => (
                            <Tab
                                sx={{ color: 'common.white' }}
                                disableRipple
                                key={tab.value}
                                value={tab.value}
                                label={`${tab.label} (${tab.count})`}
                            />
                        ))}
                    </Tabs>

                    <Divider />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800, position: 'relative', height: 'calc(100vh - 350px)' }}>
                            <Table size={'small'} stickyHeader>
                                <TableHeadCustom
                                    isCheckBox
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    onSort={onSort}
                                />

                                <TableBody>
                                    {((networkStatus === NetworkStatus.refetch || loading) ? [...Array(rowsPerPage)] : dataFiltered)
                                        .map((row, index) =>
                                            row ? (
                                                <QAToolTableRow
                                                    key={row._id}
                                                    row={row}
                                                    handleQATaskApprove={() => handleQATaskApprove(row._id)}
                                                    handleQATaskReset={() => handleQATaskReset(row._id)}
                                                    handleQATaskFailed={() => handleQATaskFailed(row._id, row.tokenId, row.collection, row.batch, row.renderId, row.batchId)}
                                                    selected={selected.includes(row._id)}
                                                    onSelectRow={() => onSelectRow(row._id)}
                                                    onViewRow={() => handleViewRow(row._id, row.tokenId, row.collection, row.batch, row.renderId, row.batchId)}
                                                    onReasonModalOpen={() => onOpenReasonModal(row)}
                                                />
                                            ) : (
                                                !isNotFound && <TableSkeleton key={index} />
                                            )
                                        )}
                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <Box sx={{ position: 'relative' }}>
                        <Divider />
                        <TablePagination
                            value={rowsPerPage}
                            pageNum={page + 1}
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            onPageChange={onNextOrPrevLoading}
                            onRowsPerPageChange={onPagePerChanged}
                        />
                    </Box>
                    <Modal open={isEditModalOpen} onClose={statusEditModalClose}>
                        <ModalBox>
                            <Box
                                sx={{
                                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
                                    padding: 2,
                                }}
                            >
                                <Typography variant='subtitle1' align='center'>
                                    Edit Status
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
                                <FormControl fullWidth sx={{ maxWidth: 600 }}>
                                    <InputLabel id="status-select-label">Status</InputLabel>
                                    <Select
                                        labelId="status-select-label"
                                        value={currentEditModalStatus || ''}
                                        onChange={(e) => setCurrentEditModalState(e.target.value as QATaskState)}
                                    >
                                        {Object.values(QATaskState).map((state) => state !== QATaskState.PUBLISHED && <MenuItem value={state} key={state}>{state}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                {(currentEditModalStatus === QATaskState.APPROVED || currentEditModalStatus === QATaskState.FAILED) &&
                                    <TextField
                                        label="Comment"
                                        placeholder='Write comment about this render and what is wrong with it.'
                                        multiline
                                        minRows={2}
                                        sx={{ maxWidth: 600, width: '100%' }}
                                        onChange={(e) => setCurrentComment(e.target.value)}
                                        value={currentComment}
                                    />
                                }
                                <Stack direction="row" spacing={2} sx={{ maxWidth: 600, width: '100%' }}>
                                    <CancelButton variant="contained" color='secondary' sx={{ backgroundColor: (theme) => theme.palette.common.black }} onClick={statusEditModalClose}>Cancel</CancelButton>
                                    <EditButton loading={builkApproving || builkReseting || builkFailing} onClick={handleBuilkEditStatus}>Edit Status</EditButton>
                                </Stack>
                            </Stack>
                        </ModalBox>
                    </Modal>
                    <Modal open={isReasonModalOpen} onClose={reasonModalClose}>
                        <ModalBox
                            sx={{
                                bgcolor: (theme) => theme.palette.background.paper,
                                padding: 2,
                            }}
                        >
                            <Stack flexDirection='row' justifyContent='space-between' alignItems='center'>
                                <Typography variant='h5'>
                                    {capitalize(reasonModalTitle)}
                                </Typography>
                                <IconButton onClick={reasonModalClose}>
                                    <Iconify icon={'material-symbols:close'} />
                                </IconButton>
                            </Stack>
                            <Tabs
                                allowScrollButtonsMobile
                                variant="scrollable"
                                scrollButtons="auto"
                                value={reasonTabStatus}
                                onChange={onReasonTabStatus}
                                sx={{ fontSize: 10, borderBottom: 0.5, borderColor: (theme) => alpha(theme.palette.common.white, 0.6) }}
                                indicatorColor="secondary"
                            >
                                {REASONTABS.map((tab) => (
                                    <StyledTab
                                        key={tab.value}
                                        value={tab.value}
                                        label={tab.label}
                                    />
                                ))}
                            </Tabs>
                            <IssueContentBox>
                                {
                                    reasonTabStatus === 'reason' ?
                                        reasonModalData?.reason && (reasonModalData?.reason.media.length > 0 || reasonModalData?.reason.trait.length > 0) ?
                                            <>
                                                {reasonModalData!.reason.media.length > 0 && <Box sx={{ pb: 3 }}>
                                                    <Typography variant='subtitle1'>Media Issues</Typography>
                                                    {reasonModalData?.reason.media.map(issue =>
                                                        <Typography variant='body2' key={issue}>● {capitalize(issue)} Issues</Typography>
                                                    )}
                                                </Box>}
                                                {reasonModalData!.reason.trait.length > 0 && <Box sx={{ pb: 3 }}>
                                                    <Typography variant='subtitle1'>Trait Issues</Typography>
                                                    {reasonModalData?.reason.trait.map(issue =>
                                                        <Typography variant='body2' key={issue}>● {capitalize(issue)} Issues</Typography>
                                                    )}
                                                </Box>}
                                            </>
                                            : <Typography variant='subtitle1'>No issues reported</Typography>
                                        : <Typography variant='subtitle1'>{reasonModalData?.comments || "No comments"}</Typography>
                                }
                            </IssueContentBox>
                        </ModalBox>
                    </Modal>
                </Card>
            </Container>
        </Page>
    );
}

// ----------------------------------------------------------------------

function applyTabFilter({
    tableData,
    filterStatus,
}: {
    tableData: QATask[];
    filterStatus: string;
}) {
    if (filterStatus !== 'all') {
        tableData = tableData.filter((item: QATask) => item.state.toLowerCase() === filterStatus.toLowerCase());
    }

    return tableData;
}