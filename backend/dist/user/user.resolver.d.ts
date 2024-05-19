import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';
import { RegisterResponse } from 'src/auth/types';
import { LoginDto, RegisterDto } from 'src/auth/auth.dto';
import { Request, Response } from 'express';
export declare class UserResolver {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(registerDto: RegisterDto, context: {
        res: Response;
    }): Promise<RegisterResponse>;
    login(loginDto: LoginDto, context: {
        res: Response;
    }): Promise<{
        user: {
            id: number;
            fullname: string;
            bio: string;
            image: string;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    logout(context: {
        res: Response;
    }): Promise<string>;
    refreshToken(context: {
        req: Request;
        res: Response;
    }): Promise<string>;
    hello(): Promise<string>;
    getUsers(): Promise<({
        posts: {
            id: number;
            userId: number;
            text: string;
            video: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: number;
        fullname: string;
        bio: string;
        image: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
