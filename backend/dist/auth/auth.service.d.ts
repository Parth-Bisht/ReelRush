import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly prisma;
    private readonly configService;
    constructor(jwtService: JwtService, prisma: PrismaService, configService: ConfigService);
    refreshToken(req: Request, res: Response): Promise<string>;
    private issueToken;
    validateUser(loginDto: LoginDto): Promise<{
        id: number;
        fullname: string;
        bio: string;
        image: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    register(registerDto: RegisterDto, response: Response): Promise<{
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
    login(loginDto: LoginDto, response: Response): Promise<{
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
    logout(response: Response): Promise<string>;
}
