"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const prisma_service_1 = require("../prisma/prisma.service");
let SystemService = class SystemService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async login(payload) {
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
    async register(payload) {
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
    async recordHistory(action, detail) {
        await this.prisma.activity_logs.create({
            data: {
                action,
                detail,
            },
        });
    }
    hashPassword(password) {
        return (0, node_crypto_1.createHash)('sha256').update(password).digest('hex');
    }
    async ensureDefaultAdmin() {
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
};
exports.SystemService = SystemService;
exports.SystemService = SystemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SystemService);
//# sourceMappingURL=system.service.js.map