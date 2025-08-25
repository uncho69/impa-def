"use client";

import { usePrivy } from '@privy-io/react-auth';
import { Button } from './Button';

export function PrivyAuthStatus() {
  const { login, logout, authenticated, user, ready } = usePrivy();

  if (!ready) {
    return (
      <div className="flex items-center space-x-4">
        <div className="animate-pulse bg-neutral-200 rounded-full w-8 h-8"></div>
        <div className="animate-pulse bg-neutral-200 rounded-full w-20 h-4"></div>
      </div>
    );
  }

  if (authenticated && user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-neutral-600">
            {user.email?.address || user.wallet?.address?.slice(0, 6) + '...' || 'User'}
          </span>
        </div>
        <Button onClick={logout} className="btn btn-outline">
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Button onClick={login} className="btn btn-primary">
        Accedi
      </Button>
    </div>
  );
}

