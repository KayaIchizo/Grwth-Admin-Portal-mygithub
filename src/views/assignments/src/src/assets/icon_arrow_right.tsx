import { memo } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

function ArrowRightIcon({ ...other }: BoxProps) {
  return (
    <Box {...other}>
      <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1.41331 0.694317C0.797154 1.36674 0.797154 2.45695 1.41331 3.12937L8.71242 11.095L1.41331 19.0606C0.797154 19.7331 0.797154 20.8233 1.41331 21.4957C2.02947 22.1681 3.02845 22.1681 3.64461 21.4957L12.0594 12.3125C12.6755 11.6401 12.6755 10.5499 12.0594 9.87747L3.64461 0.694317C3.02845 0.0218956 2.02947 0.0218956 1.41331 0.694317Z" fill="white" />
      </svg>
    </Box>
  );
}

export default memo(ArrowRightIcon);
