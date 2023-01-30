import React, { useRef } from 'react'
import styled from '@emotion/styled';
import { Stack, Checkbox, Box, IconButton, Tooltip, Popover, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
// components
import Iconify from '../Iconify';
import { QATaskState } from 'src/@types/qa';

// ----------------------------------------------------------------------

type Props = {
    rowCount?: number;
    numSelected?: number;
    onEditSelectedRows?: () => void;
    onSelectAllRows?: (checked: boolean) => void;
    onSelectRowsByStatus: (checked: boolean, status: string) => void;
};

const StyledActionArea = styled(Box)(({ theme }) => ({
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    display: 'flex'
}));

export default function QAToolActionToolbar({
    rowCount = 0,
    numSelected = 0,
    onSelectAllRows,
    onSelectRowsByStatus,
    onEditSelectedRows
}: Props) {
    const checkBoxRef = useRef<any>(null);

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleGroupSelect = (value: string) => {
        const checked: boolean = checkBoxRef.current?.children[0]?.checked || false;
        if (value == "ALL") {
            onSelectAllRows && onSelectAllRows(!checked)
        } else {
            onSelectRowsByStatus(!checked, value)
        }
        handlePopoverClose();
    }

    return (
        <Stack flexDirection="row" sx={{ py: 1, px: 2, bgcolor: 'background.neutral', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
            {onSelectAllRows && (
                <StyledActionArea>
                    <Tooltip title="Select all" placement="top">
                        <>
                            <Checkbox
                                ref={checkBoxRef}
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={rowCount > 0 && numSelected === rowCount}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    onSelectAllRows(event.target.checked)
                                }
                                sx={{ p: .2 }}
                            />
                            <IconButton sx={{ m: 0, p: 0 }} onClick={handlePopoverOpen}>
                                <Iconify icon={'material-symbols:arrow-drop-down-rounded'} />
                            </IconButton>
                            <Popover
                                sx={{
                                    zIndex: 10
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
                                    {Object.values({ ALL: "ALL", ...QATaskState, }).map(value =>
                                        <ListItem key={value}>
                                            <ListItemButton onClick={() => handleGroupSelect(value)}>
                                                <ListItemText sx={{ textTransform: 'capitalize' }} primary={value} />
                                            </ListItemButton>
                                        </ListItem>
                                    )}
                                </List>
                            </Popover>
                        </>
                    </Tooltip>
                </StyledActionArea>
            )}
            <StyledActionArea>
                <Tooltip title="Edit status" placement="top">
                    <span>
                        <IconButton sx={{ m: 0 }} onClick={onEditSelectedRows} disabled={!(numSelected > 0)}>
                            <Iconify icon={'material-symbols:edit'} />
                        </IconButton>
                    </span>
                </Tooltip>
            </StyledActionArea>
        </Stack>
    );
}
