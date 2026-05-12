import { AppError } from '../errors/app.error.js';
import type { UserModel, UserPayload } from '../models/user.model.js';
import { UserRepository } from '../repositories/user.repository.js';

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getAllUsers(): Promise<UserModel[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: number): Promise<UserModel> {
        this.validateId(id);

        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }

    async createUser(data: Partial<UserPayload>): Promise<UserModel> {
        const userData = this.validatePayload(data);
        await this.ensureEmailIsAvailable(userData.email);

        return this.userRepository.create(userData);
    }

    async updateUser(id: number, data: Partial<UserPayload>): Promise<UserModel> {
        this.validateId(id);
        const userData = this.validatePayload(data);
        const currentUser = await this.getUserById(id);
        const userWithEmail = await this.userRepository.findByEmail(userData.email);

        if (userWithEmail && userWithEmail.id !== currentUser.id) {
            throw new AppError('Email is already used', 409);
        }

        const updatedUser = await this.userRepository.update(id, userData);

        if (!updatedUser) {
            throw new AppError('User not found', 404);
        }

        return updatedUser;
    }

    async deleteUser(id: number): Promise<void> {
        this.validateId(id);
        const deleted = await this.userRepository.delete(id);

        if (!deleted) {
            throw new AppError('User not found', 404);
        }
    }

    private validateId(id: number): void {
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError('Invalid user id', 400);
        }
    }

    private validatePayload(data: Partial<UserPayload>): UserPayload {
        const name = data.name?.trim();
        const email = data.email?.trim().toLowerCase();

        if (!name || !email) {
            throw new AppError('Name and email are required', 400);
        }

        if (!this.isValidEmail(email)) {
            throw new AppError('Email is invalid', 400);
        }

        return { name, email };
    }

    private async ensureEmailIsAvailable(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if (user) {
            throw new AppError('Email is already used', 409);
        }
    }

    private isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
