import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';

export const usePrivyReady = () => {
  const { ready, authenticated, user } = usePrivy();
  const [isFullyReady, setIsFullyReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!ready) {
      setIsFullyReady(false);
      setRetryCount(0);
      return;
    }

    // Privy è ready, ma aspettiamo che sia completamente funzionale
    const readyTimer = setTimeout(() => {
      setIsFullyReady(true);
    }, 1500); // 1.5 secondi extra per sicurezza

    return () => clearTimeout(readyTimer);
  }, [ready]);

  // Reset quando ready cambia
  useEffect(() => {
    if (!ready) {
      setIsFullyReady(false);
      setRetryCount(0);
    }
  }, [ready]);

  // Funzione per forzare il reset se necessario
  const forceReset = () => {
    setIsFullyReady(false);
    setRetryCount(prev => prev + 1);
    
    // Reset dopo un breve delay
    setTimeout(() => {
      if (ready) {
        setIsFullyReady(true);
      }
    }, 500);
  };

  return {
    ready,
    isFullyReady,
    authenticated,
    user,
    retryCount,
    forceReset
  };
};
