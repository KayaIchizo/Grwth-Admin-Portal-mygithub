import { ReactNode, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_ROUTE } from '../routes/paths';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const { push } = useRouter();

  const { isAuthenticated, isQaAdmin } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      if (isQaAdmin)
        push(PATH_ROUTE.root);
      else
        push(PATH_ROUTE.qaTool.root);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <>{children}</>;
}
