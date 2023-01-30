import { format} from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date: Date | string | number) {
  return format(new Date(date), 'dd MMMM yyyy');
}