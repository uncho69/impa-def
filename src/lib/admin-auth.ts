import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// Lista degli admin autorizzati - AGGIORNA CON LE TUE EMAIL REALI
const ADMIN_EMAILS = [
  "jeffben69zos@gmail.com",    // La tua email per testing
  "admin@imparodefi.com",      // Email admin principale
  "cofounder@imparodefi.com"   // Email cofounder
];

export async function requireAdmin() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // In un ambiente reale dovresti prendere l'email dall'utente Clerk
  // Per ora uso un check semplificato
  return userId;
}

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function requireAdminAccess() {
  const userId = await requireAdmin();
  
  // Qui dovresti implementare il check dell'email dall'utente Clerk
  // Per ora assumo che se sei loggato sei admin (temporaneo)
  return userId;
}
