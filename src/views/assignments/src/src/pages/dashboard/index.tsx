import React, { useState, useMemo, useEffect } from 'react';
// @mui
import {
  Box,
  Card,
  Container,
  Modal,
  styled,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
  alpha,
  Stack,
  Button
} from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
// layouts
import Layout from 'src/layouts';
// components
import Page from 'src/components/Page';
// constants
import { PATH_ROUTE } from 'src/routes/paths';
import { useRouter } from 'next/router';
import useTable, { getComparator } from 'src/hooks/useTable';
import Scrollbar from 'src/components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSearchToolbar, TableSkeleton } from 'src/components/table';
import { BatchTableRow, DashboardStatus } from 'src/components/dashboard';
import { useMutation, useQuery } from '@apollo/client';
import { BATCH_QUERY } from 'src/apollo/queries';
import { BATCH_ACTION_VAR, BATCH_QUERY_VAR } from 'src/apollo/variables';
import { Batch, Batches, BatchFilter, QADashboardStatus, QATasksSummary } from 'src/@types/qa';
import { BATCH_MUTATION } from 'src/apollo/mutations';
import { LoadingButton } from '@mui/lab';
import { NotifyMessages } from 'src/utils/constants';
import useHandleResponse from 'src/hooks/useHandleResponse';
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Batch ID', align: 'left' },
  { id: 'collection', label: 'Collection', align: 'left' },
  { id: 'created', label: 'Creation Date', align: 'left' },
  { id: 'pendingQATasks', label: 'Pending', align: 'left' },
  { id: 'failedQATasks', label: 'Failed', align: 'left' },
  { id: 'approvedQATasks', label: 'Approved', align: 'left' },
  { id: 'publishedTasks', label: 'Published', align: 'left' },
  { id: 'unassignedTasks', label: 'Non assigned', align: 'left' },
  { id: 'completion', label: 'Completion', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '100%',
  backgroundColor: theme.palette.common.black,
  backdropFilter: 'blur(10px)',
  padding: 10,
  borderRadius: 5
}))

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 100,
  border: '1px solid',
  borderColor: alpha(theme.palette.common.white, 0.2),
  backgroundColor: alpha(theme.palette.primary.main, 0.2),
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.4),
  },
}))

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant='dashboard'>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Index() {
  const { themeStretch } = useSettings();
  const { push } = useRouter();
  const { handleApolloRes } = useHandleResponse();
  const { isQaAdmin } = useAuth();
  const [filter, setFilter] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteSelctedId, setDeleteSelectedId] = useState<string>()

  const { loading, error, data, refetch } = useQuery<Batches, BatchFilter>(BATCH_QUERY.get_batches, {
    variables: BATCH_QUERY_VAR.all,
  });

  const [deleteBatch, { loading: deleteBatching }] = useMutation(BATCH_MUTATION.deleteBatch, { refetchQueries: ['Batches'] });

  useEffect(() => {
    refetch()
  }, [refetch])

  const flattenedData: (Batch & QATasksSummary)[] = useMemo(() =>
    data?.batches.map((batch) => (
      {
        ...batch,
        ...batch.qaTasksSummary,
        completion: batch.qaTasksSummary?.totalQATasks > 0 ?
          Math.round(((batch.qaTasksSummary?.approvedQATasks + batch.qaTasksSummary?.publishedTasks) / batch.qaTasksSummary?.totalQATasks) * 100)
          : 0
      }
    )) || []
    , [data])

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'name',
  });

  const handleFilter = (filterValue: string) => {
    setFilter(filterValue);
    setPage(0);
  };

  const handleViewRow = (id: string, name: string, collection: string) => {
    push({
      pathname: PATH_ROUTE.dashboard.batchList,
      query: { collection, batchName: name, batchId: id }
    })
  };

  const handleBatchDelete = () => {
    if (deleteSelctedId) {
      deleteBatch({
        variables: BATCH_ACTION_VAR.delete(deleteSelctedId),
        update(cache, result) {
          handleApolloRes(result, NotifyMessages.DELETE_BATCH)
          refetch()
          onDeleteModalClose()
        }
      })
    }
  }

  const dataFiltered = useMemo(() => {
    if (!loading && !error && flattenedData && flattenedData.length > 0) {
      return applySortFilter({
        tableData: flattenedData,
        comparator: getComparator(order, orderBy),
        filter,
      });
    } else {
      return [];
    }
  }, [loading, flattenedData, order, orderBy, filter, error]);

  const dashboardStatusData = useMemo(() => {
    const initialValue: QADashboardStatus = {
      batchNumber: 0,
      totalTasks: 0,
      pendingTasks: 0,
      failedTasks: 0,
      approvedTasks: 0,
      publishedTasks: 0,
      unassignedTasks: 0
    };

    flattenedData.map(d => {
      if (initialValue.batchNumber !== undefined) initialValue.batchNumber++;
      initialValue.totalTasks += d.totalQATasks;
      initialValue.pendingTasks += d.pendingQATasks;
      initialValue.failedTasks += d.failedQATasks;
      initialValue.approvedTasks += d.approvedQATasks;
      initialValue.publishedTasks += d.publishedTasks;
      initialValue.unassignedTasks += d.unassignedTasks;
    })

    return initialValue;
  }, [flattenedData])

  const isNotFound = useMemo(
    () => (!dataFiltered.length && !!filter) || (!loading && !dataFiltered.length),
    [dataFiltered, filter, loading]
  );

  const onBatchDeleteRequest = (batchId: string) => {
    setIsDeleteModalOpen(true);
    setDeleteSelectedId(batchId)
  }

  const onDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteSelectedId(undefined)
  }

  return (
    <Page title="Futureverse: QA Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
          <DashboardStatus data={dashboardStatusData} />
          <TableSearchToolbar filter={filter} onFilter={handleFilter} />
          <Box sx={{ bgcolor: 'background.neutral', height: 50, borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
          <Scrollbar>
            <TableContainer
              sx={{ minWidth: 800, position: 'relative', height: 'calc(100vh - 310px)' }}
            >
              <Table size={'small'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onSort={onSort}
                  sx={{ borderBottom: "1px solid", borderColor: 'background.neutral' }}
                />
                <TableBody>
                  {(loading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <BatchTableRow
                          key={row._id}
                          row={row}
                          isQaAdmin={isQaAdmin}
                          onViewRow={() => handleViewRow(row._id, row.name, row.collection)}
                          onDeleteRowReq={() => onBatchDeleteRequest(row._id)}
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={(e) => onChangeRowsPerPage(parseInt(e.target.value, 10))}
            />
          </Box>
        </Card>
        <Modal open={isDeleteModalOpen}>
          <ModalBox>
            <Typography sx={{ padding: 2 }} variant='subtitle1' align='center'>
              Are you sure you want to delete this batch?
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <StyledLoadingButton loading={deleteBatching} onClick={handleBatchDelete}>Yes</StyledLoadingButton>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  width: 100,
                }}
                onClick={onDeleteModalClose}
              >
                No
              </Button>
            </Stack>
          </ModalBox>
        </Modal>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filter,
}: {
  tableData: (Batch & QATasksSummary)[];
  comparator: (a: any, b: any) => number;
  filter: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filter) {
    tableData = tableData.filter(
      (item: Record<string, any>) => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        item.collection.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  }

  return tableData;
}