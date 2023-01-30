// @mui
import { IconButton, MenuItem, Select, Stack, StackProps, SxProps, Typography } from '@mui/material';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

interface Props extends StackProps {
    rowsPerPageOptions: number[];
    value: number;
    pageNum: number;
    onPageChange: (isNext: boolean, size: number) => void;
    onRowsPerPageChange: (size: number) => void;
    sx?: SxProps;
}

export default function TablePagination({ rowsPerPageOptions, value, pageNum, onPageChange, onRowsPerPageChange, sx }: Props) {

    const onMenuClick = (option: number) => {
        onRowsPerPageChange(option)
    }

    const onNextClick = () => {
        onPageChange(true, value)
    }

    const onPrevClick = () => {
        onPageChange(false, value)
    }

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
            padding={1.5}
            sx={{
                ...sx,
            }}
        >
            <Typography variant='body2'>Rows per page:</Typography>
            <Select
                value={value}
                displayEmpty
                size="small"
            >
                {rowsPerPageOptions.map((option) => <MenuItem key={option} value={option} onClick={() => onMenuClick(option)}>{option}</MenuItem>)}
            </Select>
            <Typography variant='body2'>Page:</Typography>
            <Typography variant='body2'>{pageNum}</Typography>
            <IconButton size='small' onClick={onPrevClick}>
                <Iconify icon={'ic:outline-navigate-before'} />
            </IconButton>
            <IconButton size='small' onClick={onNextClick}>
                <Iconify icon={'ic:round-navigate-next'} />
            </IconButton>
        </Stack>
    );
}
