import { NextRequest, NextResponse } from 'next/server';
import { SiweMessage } from 'siwe';
import { getAddress } from 'ethers';
import { db } from '@/lib/db';
import { users, authAccounts } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, signature } = body;

    if (!message || !signature) {
      return NextResponse.json(
        { error: 'Message and signature are required' },
        { status: 400 }
      );
    }

    let siweMessage: SiweMessage;
    try {
      siweMessage = new SiweMessage(message);
      const verificationResult = await siweMessage.verify({ signature });
      if (!verificationResult.success) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error('SIWE verification error:', error);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const walletAddress = siweMessage.address;

    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'User must be authenticated to link wallet' },
        { status: 401 }
      );
    }

    try {
      getAddress(walletAddress);
    } catch {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    const existingWalletUser = await db
      .select()
      .from(users)
      .where(eq(users.walletAddress, walletAddress))
      .limit(1);

    if (existingWalletUser.length > 0 && existingWalletUser[0].id !== userId) {
      return NextResponse.json(
        { error: 'Wallet is already linked to another user' },
        { status: 409 }
      );
    }

    const existingAuthAccount = await db
      .select()
      .from(authAccounts)
      .where(
        and(
          eq(authAccounts.provider, 'wallet'),
          eq(authAccounts.walletAddress, walletAddress)
        )
      )
      .limit(1);

    if (existingAuthAccount.length > 0 && existingAuthAccount[0].userId !== userId) {
      return NextResponse.json(
        { error: 'Wallet is already linked to another user' },
        { status: 409 }
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user[0].walletAddress || user[0].id === userId) {
      await db
        .update(users)
        .set({
          walletAddress: walletAddress,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));
    }

    if (existingAuthAccount.length > 0) {
      await db
        .update(authAccounts)
        .set({
          userId: userId,
          walletAddress: walletAddress,
          providerAccountId: walletAddress,
          updatedAt: new Date(),
        })
        .where(eq(authAccounts.id, existingAuthAccount[0].id));
    } else {
      await db.insert(authAccounts).values({
        userId: userId,
        provider: 'wallet',
        providerAccountId: walletAddress,
        walletAddress: walletAddress,
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return NextResponse.json(
      {
        message: 'Wallet linked successfully',
        walletAddress,
        userId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error linking wallet:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

