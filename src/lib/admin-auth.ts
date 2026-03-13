import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { isAdminEmail } from './admin-emails';

export { isAdminEmail };

export async function requireAdmin() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return userId;
}

export async function requireAdminAccess() {
  const userId = await requireAdmin();
  
  // Qui dovresti implementare il check dell'email dall'utente Clerk
  // Per ora assumo che se sei loggato sei admin (temporaneo)
  return userId;
}
