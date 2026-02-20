"use client";

import { useState } from 'react';
import { Button } from './Button';

export function SimpleAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-neutral-600">Utente</span>
        <Button onClick={handleLogout} className="btn btn-outline">
          Logout
        </Button>
      </div>
    );
  }

  if (showLogin) {
    return (
      <div className="flex items-center space-x-4">
        <Button onClick={handleLogin} className="btn btn-primary">
          Conferma Login
        </Button>
        <Button onClick={() => setShowLogin(false)} className="btn btn-outline">
          Annulla
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Button onClick={() => setShowLogin(true)} className="btn btn-primary">
        Accedi
      </Button>
    </div>
  );
}


