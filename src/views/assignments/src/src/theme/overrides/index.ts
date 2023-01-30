import { Theme } from '@mui/material/styles';
//
import Lists from './List';
import Table from './Table';
import Drawer from './Drawer';
import Button from './Button';
import Popover from './Popover';
import Stepper from './Stepper';
import Skeleton from './Skeleton';
import Progress from './Progress';
import Checkbox from './Checkbox';
import Typography from './Typography';
import ButtonGroup from './ButtonGroup';
import LoadingButton from './LoadingButton';
import Paper from'./Paper';
import SvgIcon from'./SvgIcon'

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Lists(theme),
    Table(theme),
    Paper(theme),
    Button(theme),
    Drawer(theme),
    Stepper(theme),
    Popover(theme),
    SvgIcon(theme),
    Checkbox(theme),
    Skeleton(theme),
    Progress(theme),
    Typography(theme),
    ButtonGroup(theme),
    LoadingButton(theme)
  );
}
