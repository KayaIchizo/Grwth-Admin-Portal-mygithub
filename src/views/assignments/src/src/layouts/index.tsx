import { ReactNode } from 'react';
// guards
import AuthGuard from '../guards/AuthGuard';

import DashboardLayout from './dashboard';
import LogoOnlyLayout from './LogoOnlyLayout';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  variant?: 'dashboard' | 'logoOnly';
};

export default function Layout({ variant = 'dashboard', children }: Props) {
  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  return (
    <AuthGuard>
      <DashboardLayout> {children} </DashboardLayout>
    </AuthGuard>
  );
}
