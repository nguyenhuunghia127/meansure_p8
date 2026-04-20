import { SystemService } from './system.service';
export declare class SystemController {
    private readonly systemService;
    constructor(systemService: SystemService);
    login(body: {
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
    register(body: {
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
}
