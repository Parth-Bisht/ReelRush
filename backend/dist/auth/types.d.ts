import { User } from 'src/user/user.model';
export declare class ErrorType {
    message: string;
    code?: string;
}
export declare class RegisterResponse {
    user?: User;
    error?: ErrorType;
}
export declare class LoginResponse {
    user: User;
    error?: ErrorType;
}
