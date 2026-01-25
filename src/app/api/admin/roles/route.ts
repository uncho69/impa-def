import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, userRoles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { isAdmin, UserRole } from '@/lib/auth/permissions';

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userIsAdmin = await isAdmin(userId);
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const userIdFilter = searchParams.get('userId');

    const baseQuery = db
      .select({
        userId: users.id,
        email: users.email,
        username: users.username,
        walletAddress: users.walletAddress,
        isActive: users.isActive,
        createdAt: users.createdAt,
      })
      .from(users);

    const userList = userIdFilter
      ? await baseQuery.where(eq(users.id, userIdFilter)).limit(limit).offset(offset)
      : await baseQuery.limit(limit).offset(offset);

    const usersWithRoles = await Promise.all(
      userList.map(async (user) => {
        const roles = await db
          .select({ role: userRoles.role })
          .from(userRoles)
          .where(eq(userRoles.userId, user.userId));

        return {
          ...user,
          roles: roles.map((r) => r.role as UserRole),
        };
      })
    );

    return NextResponse.json(
      {
        users: usersWithRoles,
        pagination: {
          limit,
          offset,
          total: userList.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching users with roles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userIsAdmin = await isAdmin(userId);
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { targetUserId, role } = body;

    if (!targetUserId || !role) {
      return NextResponse.json(
        { error: 'userId and role are required' },
        { status: 400 }
      );
    }

    const validRoles: UserRole[] = ['admin', 'moderator', 'participant', 'base_user'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${validRoles.join(', ')}` },
        { status: 400 }
      );
    }

    const targetUser = await db
      .select()
      .from(users)
      .where(eq(users.id, targetUserId))
      .limit(1);

    if (targetUser.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const existingRole = await db
      .select()
      .from(userRoles)
      .where(
        and(
          eq(userRoles.userId, targetUserId),
          eq(userRoles.role, role)
        )
      )
      .limit(1);

    if (existingRole.length > 0) {
      return NextResponse.json(
        { error: 'Role already assigned to user' },
        { status: 409 }
      );
    }

    await db.insert(userRoles).values({
      userId: targetUserId,
      role: role as UserRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: 'Role assigned successfully',
        userId: targetUserId,
        role,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error assigning role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userIsAdmin = await isAdmin(userId);
    if (!userIsAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { targetUserId, role } = body;

    if (!targetUserId || !role) {
      return NextResponse.json(
        { error: 'userId and role are required' },
        { status: 400 }
      );
    }

    const validRoles: UserRole[] = ['admin', 'moderator', 'participant', 'base_user'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${validRoles.join(', ')}` },
        { status: 400 }
      );
    }

    const existingRole = await db
      .select()
      .from(userRoles)
      .where(
        and(
          eq(userRoles.userId, targetUserId),
          eq(userRoles.role, role)
        )
      )
      .limit(1);

    if (existingRole.length === 0) {
      return NextResponse.json(
        { error: 'Role not found for user' },
        { status: 404 }
      );
    }

    await db
      .delete(userRoles)
      .where(
        and(
          eq(userRoles.userId, targetUserId),
          eq(userRoles.role, role)
        )
      );

    return NextResponse.json(
      {
        message: 'Role removed successfully',
        userId: targetUserId,
        role,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

