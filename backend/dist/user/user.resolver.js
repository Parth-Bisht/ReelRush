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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("../auth/auth.service");
const user_service_1 = require("./user.service");
const types_1 = require("../auth/types");
const auth_dto_1 = require("../auth/auth.dto");
const common_1 = require("@nestjs/common");
const custom_exception_1 = require("../filters/custom.exception");
const user_model_1 = require("./user.model");
let UserResolver = class UserResolver {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async register(registerDto, context) {
        if (registerDto.password !== registerDto.confirmPassword) {
            throw new common_1.BadRequestException({
                confirmPassword: 'Password and confirm password are not the same',
            });
        }
        const { user } = await this.authService.register(registerDto, context.res);
        return { user };
    }
    async login(loginDto, context) {
        return this.authService.login(loginDto, context.res);
    }
    async logout(context) {
        return this.authService.logout(context.res);
    }
    async refreshToken(context) {
        try {
            return this.authService.refreshToken(context.req, context.res);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async hello() {
        return 'hello world';
    }
    async getUsers() {
        return this.userService.getUsers();
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, common_1.UseFilters)(custom_exception_1.GraphQLErrorFilter),
    (0, graphql_1.Mutation)(() => types_1.RegisterResponse),
    __param(0, (0, graphql_1.Args)('registerInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, common_1.UseFilters)(custom_exception_1.GraphQLErrorFilter),
    (0, graphql_1.Mutation)(() => types_1.LoginResponse),
    __param(0, (0, graphql_1.Args)('loginInput')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "refreshToken", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "hello", null);
__decorate([
    (0, graphql_1.Query)(() => [user_model_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map