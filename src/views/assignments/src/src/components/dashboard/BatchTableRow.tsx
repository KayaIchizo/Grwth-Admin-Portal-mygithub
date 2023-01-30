// @mui
import { TableRow, TableCell, Typography, IconButton, styled, alpha, LinearProgress, Stack } from '@mui/material';
import { useMemo } from 'react';
// @types
import { Batch } from 'src/@types/qa';
// components
import Iconify from 'src/components/Iconify';

import { fDate } from 'src/utils/formatTime'

// ----------------------------------------------------------------------

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: alpha(theme.palette.action.hover, .05),
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    'cursor': 'pointer'
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 6,
    borderRadius: 5,
    backgroundColor: theme.palette.grey[800]
}));

type Props = {
    row: Batch;
    isQaAdmin: boolean;
    onViewRow: VoidFunction;
    onDeleteRowReq: VoidFunction;
};

export default function BatchTableRow({
    row,
    isQaAdmin,
    onViewRow,
    onDeleteRowReq
}: Props) {
    const { name, collection, created, qaTasksSummary } = row;

    const percent: number = useMemo(() =>
        qaTasksSummary.totalQATasks > 0 ? Math.round(((qaTasksSummary?.approvedQATasks + qaTasksSummary?.publishedTasks) / qaTasksSummary?.totalQATasks) * 100) : 0
        , [qaTasksSummary])

    return (
        // <StyledTableRow hover onClick={onViewRow}>
        <StyledTableRow hover>
            <TableCell onClick={onViewRow}>{name}</TableCell>
            <TableCell onClick={onViewRow}>
                <Typography variant="subtitle2" noWrap>{collection}</Typography>
            </TableCell >
            <TableCell onClick={onViewRow}>{fDate(parseInt(created))}</TableCell>
            <TableCell onClick={onViewRow} align='center' sx={{ color: 'warning.main' }}>{qaTasksSummary?.pendingQATasks}</TableCell>
            <TableCell onClick={onViewRow} align='center' sx={{ color: 'error.main' }}>{qaTasksSummary?.failedQATasks}</TableCell>
            <TableCell onClick={onViewRow} align='center' sx={{ color: 'success.main' }}>{qaTasksSummary?.approvedQATasks}</TableCell>
            <TableCell onClick={onViewRow} align='center' sx={{ color: 'success.main' }}>{qaTasksSummary?.publishedTasks}</TableCell>
            <TableCell onClick={onViewRow} align='center' sx={{ color: 'error.main' }}>{qaTasksSummary?.unassignedTasks}</TableCell>
            <TableCell onClick={onViewRow} align='center'>
                {percent} %
                <BorderLinearProgress variant="determinate" value={percent} />
            </TableCell>
            <TableCell align="right">
                {isQaAdmin && <IconButton onClick={onDeleteRowReq}>
                    <Iconify icon={'material-symbols:delete-forever'} />
                </IconButton>}
            </TableCell>
        </StyledTableRow >
    );
}
