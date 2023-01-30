import { memo } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

function ArrowLeftIcon({ ...other }: BoxProps) {
  return (
    <Box {...other}>
      <svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.638 22.2806C12.2543 21.608 12.2543 20.5176 11.638 19.845L4.33725 11.8776L11.638 3.91023C12.2543 3.23766 12.2543 2.14721 11.638 1.47464C11.0217 0.802072 10.0225 0.802072 9.40618 1.47464L0.989563 10.6598C0.373271 11.3324 0.373271 12.4229 0.989563 13.0954L9.40618 22.2806C10.0225 22.9532 11.0217 22.9532 11.638 22.2806Z" fill="white" />
      </svg>
    </Box>
  );
}

export default memo(ArrowLeftIcon);
