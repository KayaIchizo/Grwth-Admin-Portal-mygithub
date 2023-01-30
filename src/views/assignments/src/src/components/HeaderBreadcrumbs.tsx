// next
import NextLink from 'next/link'
// @mui
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { rgba } from 'polished'

// ----------------------------------------------------------------------

interface LinkInfo {
  name: string;
  src: string
}

interface Props {
  links: LinkInfo[];
}

const ContainBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  width: '100%',
  padding: theme.spacing(2, 3),
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center'
}));

const NextLinkText = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    color: rgba(theme.palette.primary.main, 0.7)
  }
}))

export default function HeaderBreadcrumbs({
  links,
  ...other
}: Props) {
  return (
    <ContainBox {...other}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {links.map((link, i) => <NextLink key={link.name} href={link.src} passHref>
          <NextLinkText variant="body2">
            {link.name} {(i !== links.length - 1) && <>&nbsp;\&nbsp;&nbsp;</>}
          </NextLinkText>
        </NextLink>)}
      </Box>
    </ContainBox>
  );
}
