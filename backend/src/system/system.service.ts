import { Injectable } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SystemService {
  constructor(private readonly prisma: PrismaService) {}

  async login(payload: { username?: string; password?: string }) {
    await this.ensureDefaultAdmin();

    const username = payload.username?.trim();
    const password = payload.password?.trim();
    if (!username || !password) {
      return {
        success: false,
        message: 'Username and password are required.',
      };
    }

    const user = await this.prisma.users.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password_hash: true,
        role: true,
        created_at: true,
      },
    });

    if (!user || user.password_hash !== this.hashPassword(password)) {
      await this.recordHistory('login', `Failed login for ${username}`);
      return {
        success: false,
        message: 'Invalid username or password.',
      };
    }

    await this.recordHistory('login', `User ${user.username} logged in`);
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.created_at,
      },
    };
  }

  async register(payload: {
    username?: string;
    password?: string;
    role?: string;
  }) {
    await this.ensureDefaultAdmin();

    const username = payload.username?.trim();
    const password = payload.password?.trim();

    if (!username || !password) {
      return {
        success: false,
        message: 'Username and password are required.',
      };
    }

    const exists = await this.prisma.users.findUnique({
      where: { username },
      select: { id: true },
    });

    if (exists) {
      return {
        success: false,
        message: 'Username already exists.',
      };
    }

    const user = await this.prisma.users.create({
      data: {
        username,
        password_hash: this.hashPassword(password),
        role: payload.role?.trim() || 'viewer',
      },
      select: {
        id: true,
        username: true,
        role: true,
        created_at: true,
      },
    });

    await this.recordHistory('register', `Registered user ${user.username}`);

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.created_at,
      },
    };
  }

  async manageUsers() {
    await this.ensureDefaultAdmin();
    return this.prisma.users.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        created_at: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async viewHistory() {
    return this.prisma.activity_logs.findMany({
      select: {
        id: true,
        action: true,
        detail: true,
        created_at: true,
      },
      orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
      take: 100,
    });
  }

  async recordHistory(action: string, detail: string) {
    await this.prisma.activity_logs.create({
      data: {
        action,
        detail,
      },
    });
  }

  private hashPassword(password: string) {
    return createHash('sha256').update(password).digest('hex');
  }

  private async ensureDefaultAdmin() {
    const count = await this.prisma.users.count();
    if (count > 0) {
      return;
    }

    await this.prisma.users.create({
      data: {
        username: 'admin',
        password_hash: this.hashPassword('admin123'),
        role: 'admin',
      },
    });

    await this.recordHistory('system', 'Created default admin account');
  }
}
