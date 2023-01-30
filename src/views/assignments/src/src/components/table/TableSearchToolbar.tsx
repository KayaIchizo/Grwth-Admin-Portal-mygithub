import { Stack, InputAdornment, TextField, alpha } from '@mui/material';
import { debounce } from 'lodash';
// components
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

type Props = {
    filter: string;
    onFilter: (value: string) => void;
};

export default function TableSearchToolbar({
    filter,
    onFilter,
}: Props) {

    return (
        <Stack spacing={2} flexDirection="row" justifyContent={'flex-end'} sx={{ py: .5, bgcolor: (theme) => theme.palette.background.default }}>
            <TextField
                fullWidth
                size='small'
                onChange={debounce((event) => onFilter(event.target.value), 500)}
                placeholder="Search"
                sx={{ width: 200, bgcolor: (theme) => alpha(theme.palette.common.white, 0.1), borderRadius: 1 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify
                                icon={'eva:search-fill'}
                                sx={{ color: 'text.disabled', width: 20, height: 20 }}
                            />
                        </InputAdornment>
                    ),
                }}
            />
        </Stack>
    );
}
