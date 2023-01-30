import React from 'react';
// @mui
import { Typography, Stack } from '@mui/material';

import Iconify from '../Iconify';
import { QADashboardStatus } from 'src/@types/qa';

// ----------------------------------------------------------------------

type Props = {
    data: QADashboardStatus;
};

export default function DashboardStatus(
    { data }: Props
) {
    const { batchNumber, totalTasks, pendingTasks, failedTasks, approvedTasks, publishedTasks, unassignedTasks } = data;

    return (
        <Stack
            flexDirection='row'
            justifyContent="space-around"
            sx={{ backgroundColor: (theme) => theme.palette.background.default, pb: 1 }}
        >
            {batchNumber !== undefined &&
                <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
                    <Iconify icon='material-symbols:folder-open-rounded' sx={{ mr: 1 }} />
                    <b>{batchNumber}</b>&nbsp;Batches
                </Typography>
            }
            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon='clarity:hard-disk-solid' sx={{ mr: 1 }} />
                <b>{totalTasks}</b>&nbsp;Tasks
            </Typography>
            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon='ic:round-pending' sx={{ mr: 1 }} />
                <b>{pendingTasks}</b>&nbsp;Pending
            </Typography>
            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon='mdi:close-circle' sx={{ mr: 1 }} />
                <b>{failedTasks}</b>&nbsp;Failed
            </Typography>
            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon='mdi:success-circle' sx={{ mr: 1 }} />
                <b>{approvedTasks}</b>&nbsp;Approved
            </Typography>
            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon='ic:baseline-keyboard-double-arrow-up' sx={{ mr: 1 }} />
                <b>{publishedTasks}</b>&nbsp;Published
            </Typography>
            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon='pajamas:unassignee' sx={{ mr: 1 }} />
                <b>{unassignedTasks}</b>&nbsp;Unassigned
            </Typography>
        </Stack>
    );
}