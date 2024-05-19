import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
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
