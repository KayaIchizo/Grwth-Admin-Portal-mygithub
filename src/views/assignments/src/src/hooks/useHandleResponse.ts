import { ApolloError } from '@apollo/client';
import { useSnackbar } from 'notistack';
import useAuth from './useAuth';

// ----------------------------------------------------------------------

export default function useHandleResponse() {
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleApolloRes = (result: any, successMsg: string) => {
    if (result.errors) {
      if (result.errors.networkError?.message.includes('status code 401')) {
        enqueueSnackbar('Session timeout', { variant: 'error' });
        logout();
      } else {
        result.errors.map((err: ApolloError) => enqueueSnackbar(err.message, { variant: 'error' }));
      }
    } else {
      enqueueSnackbar(successMsg);
    }
  };

  return {
    handleApolloRes,
  };
}
