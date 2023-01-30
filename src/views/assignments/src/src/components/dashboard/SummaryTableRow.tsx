import React, { useCallback, useMemo } from 'react';
// @mui
import { Checkbox, TableRow, TableCell, Popover, List, ListItem, ListItemButton, ListItemText, IconButton, Stack, styled, alpha, Tooltip, Typography, Box } from '@mui/material';
// components
import Label from 'src/components/Label';
import Avatar from 'src/components/Avatar';
import Iconify from 'src/components/Iconify';
import { QATask, QATaskState, QAUser, RenderedAssetType } from 'src/@types/qa';
import { pxToRem } from 'src/utils/getFontValue';

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
  isAdmin?: boolean;
  row: QATask;
  selected: boolean;
  qaUsers: QAUser[];
  traitKeys: string[];
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  handleQATaskApprove: VoidFunction;
  handleQATaskReset: VoidFunction;
  handleQATaskFailed: VoidFunction;
  onReasonModalOpen: VoidFunction;
  handleSingleQATaskAssign: (email: string) => void;
};

export default function SummaryTableRow({
  isAdmin = false,
  row,
  selected,
  qaUsers,
  traitKeys,
  onSelectRow,
  onViewRow,
  handleQATaskApprove,
  handleQATaskReset,
  handleQATaskFailed,
  handleSingleQATaskAssign,
  onReasonModalOpen
}: Props) {
  const { _id, assignedTo, renderedAssets, state, tokenId, renderId, traits } = row;
  const [statusAnchorEl, setStatusAnchorEl] = React.useState<HTMLElement | null>(null);
  const [assignAnchorEl, setAssignAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleStatusPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setStatusAnchorEl(event.currentTarget);
  };

  const handleStatusPopoverClose = () => {
    setStatusAnchorEl(null);
  };

  const handleAssignPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAssignAnchorEl(event.currentTarget);
  };

  const handleAssignPopoverClose = () => {
    setAssignAnchorEl(null);
  };

  const statusOpen = Boolean(statusAnchorEl);
  const assignOpen = Boolean(assignAnchorEl);

  const handleAction = (state: QATaskState) => {
    if (state === QATaskState.APPROVED) handleQATaskApprove()
    else if (state === QATaskState.FAILED) handleQATaskFailed()
    else if (state === QATaskState.PENDING) handleQATaskReset()

    handleStatusPopoverClose()
  }

  const avatarImage = useMemo(() => {
    const index = renderedAssets?.findIndex(asset => asset.renderedAssetType === RenderedAssetType.PNG);

    if (index >= 0) {
      return renderedAssets[index].url;
    }

    return ""
  }, [renderedAssets])

  const getPublicTrait = useCallback((name) => {
    const i = traits.findIndex(t => t.name === name);
    if (i >= 0) return traits[i].publicValue;

    return ''
  }, [traits])

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
      <TableCell align="left" sx={{ fontSize: pxToRem(10) }}>
        {assignedTo ? assignedTo : "Unassigned"}
        {(isAdmin && !assignedTo) &&
          <>
            <IconButton sx={{ m: 0, p: 0 }} onClick={handleAssignPopoverOpen}>
              <Iconify icon={'material-symbols:arrow-drop-down-rounded'} />
            </IconButton>
            <Popover
              sx={{
                zIndex: 20
              }}
              open={assignOpen}
              anchorEl={assignAnchorEl}
              onClose={handleAssignPopoverClose}
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
              <List sx={{ maxHeight: 300 }}>
                {qaUsers.map(user =>
                  <ListItem key={user.email}>
                    <ListItemButton onClick={() => {
                      handleAssignPopoverClose();
                      handleSingleQATaskAssign(user.email)
                    }}>
                      <ListItemText primary={user.email} />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
            </Popover>
          </>
        }
      </TableCell>
      {traitKeys.map((name) =>
        <TableCell key={name} sx={{ cursor: 'pointer' }} onClick={onViewRow} align="left">
          {getPublicTrait(name)}
        </TableCell>
      )}
      <TableCell align="center">
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
          {(isAdmin) &&
            <>
              <IconButton sx={{ m: 0, p: 0 }} onClick={handleStatusPopoverOpen}>
                <Iconify icon={'material-symbols:arrow-drop-down-rounded'} />
              </IconButton>
              <Popover
                sx={{
                  zIndex: 20
                }}
                open={statusOpen}
                anchorEl={statusAnchorEl}
                onClose={handleStatusPopoverClose}
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
            </>
          }
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