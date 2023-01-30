import React, { useMemo } from 'react';
// @mui
import { Checkbox, TableRow, TableCell, Popover, List, ListItem, ListItemButton, ListItemText, IconButton, Stack, styled, alpha, Tooltip } from '@mui/material';
// components
import Label from 'src/components/Label';
import Avatar from 'src/components/Avatar';
import Iconify from 'src/components/Iconify';
import { QATask, QATaskState, RenderedAssetType } from 'src/@types/qa';

// ----------------------------------------------------------------------

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: alpha(theme.palette.action.hover, .05),
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  }
}));

type Props = {
  row: QATask;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  handleQATaskApprove: VoidFunction;
  handleQATaskReset: VoidFunction;
  handleQATaskFailed: VoidFunction;
  onReasonModalOpen: VoidFunction;
};

export default function SummaryTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  handleQATaskApprove,
  handleQATaskReset,
  handleQATaskFailed,
  onReasonModalOpen
}: Props) {
  const { _id, renderedAssets, state, tokenId, batch, collection, renderId } = row;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleAction = (state: QATaskState) => {
    if (state === QATaskState.APPROVED) handleQATaskApprove()
    else if (state === QATaskState.FAILED) handleQATaskFailed()
    else if (state === QATaskState.PENDING) handleQATaskReset()

    handlePopoverClose()
  }

  const avatarImage = useMemo(() => {
    const index = renderedAssets?.findIndex(asset => asset.renderedAssetType === RenderedAssetType.PNG);

    if (index >= 0) {
      return renderedAssets[index].url;
    }

    return ""
  }, [renderedAssets])

  return (
    <StyledTableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={onViewRow}>
        <Avatar alt={_id} sx={{ mr: 2 }} src={avatarImage} />
      </TableCell>

      <TableCell sx={{ cursor: 'pointer' }} onClick={onViewRow} align="left">{tokenId}</TableCell>
      <TableCell sx={{ cursor: 'pointer' }} onClick={onViewRow} align="left">{renderId}</TableCell>

      <TableCell align="left">{collection}</TableCell>
      <TableCell align="left">{batch}</TableCell>
      <TableCell align="left">
        <Stack direction="row" spacing={0.5}>
          <Label
            sx={{
              p: 1,
              textTransform: 'capitalize',
              border: 1,
              background: 'none',
              borderColor: ((state === QATaskState.APPROVED || state === QATaskState.PUBLISHED) && 'success.main') ||
                (state === QATaskState.PENDING && 'warning.main') ||
                (state === QATaskState.FAILED && 'error.main') ||
                'default'
            }}
          >
            <Iconify
              icon={(state === QATaskState.APPROVED && 'mdi:success-circle') ||
                (state === QATaskState.PENDING && 'ic:round-pending') ||
                (state === QATaskState.PENDING && 'ic:round-pending') ||
                (state === QATaskState.PUBLISHED && 'ic:baseline-publish') ||
                'mdi:success-circle'}
              color={((state === QATaskState.APPROVED || state === QATaskState.PUBLISHED) && 'success.main') ||
                (state === QATaskState.PENDING && 'warning.main') ||
                (state === QATaskState.FAILED && 'error.main') ||
                'default'}
              width={16}
              height={16}
              marginRight={.5}
            />
            {state.toString()}
          </Label>
          <IconButton sx={{ m: 0, p: 0 }} onClick={handlePopoverOpen}>
            <Iconify icon={'material-symbols:arrow-drop-down-rounded'} />
          </IconButton>
          <Popover
            sx={{
              zIndex: 20
            }}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            disableRestoreFocus
          >
            <List>
              {Object.values(QATaskState).map(value => {
                if (value !== QATaskState.PUBLISHED && value !== state) {
                  return (
                    <ListItem key={value}>
                      <ListItemButton onClick={() => handleAction(value)}>
                        <ListItemText sx={{ textTransform: 'capitalize' }} primary={value} />
                      </ListItemButton>
                    </ListItem>
                  )
                }
              }
              )}
            </List>
          </Popover>
        </Stack>
      </TableCell>
      <TableCell>
        {state === QATaskState.FAILED &&
          <Tooltip title="View task's failed reason">
            <IconButton sx={{ m: 0, p: .3 }} onClick={onReasonModalOpen}>
              <Iconify icon={'fluent:apps-list-detail-20-filled'} />
            </IconButton>
          </Tooltip>
        }
      </TableCell>
    </StyledTableRow>
  );
}