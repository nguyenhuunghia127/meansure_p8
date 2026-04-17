import { PrismaService } from '../prisma/prisma.service';
export declare class SystemService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    login(payload: {
        username?: string;
        password?: string;
    }): Promise<{
        success: boolean;
        message: string;
        user?: undefined;
    } | {
        success: boolean;
        user: {
            id: number;
            username: string;
            role: string;
            createdAt: Date | null;
        };
        message?: undefined;
    }>;
    register(payload: {
        username?: string;
        password?: string;
        role?: string;
    }): Promise<{
        success: boolean;
        message: string;
        user?: undefined;
    } | {
        success: boolean;
        user: {
            id: number;
            username: string;
            role: string;
            createdAt: Date | null;
        };
        message?: undefined;
    }>;
    manageUsers(): Promise<{
        id: number;
        username: string;
        role: string;
        created_at: Date | null;
    }[]>;
    viewHistory(): Promise<{
        id: number;
        created_at: Date | null;
        action: string;
        detail: string;
    }[]>;
    recordHistory(action: string, detail: string): Promise<void>;
    private hashPassword;
    private ensureDefaultAdmin;
}
