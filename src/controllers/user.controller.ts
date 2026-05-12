import type { Request, Response } from 'express';
import { BaseController } from './base.controller.js';
import { UserService } from '../services/user.service.js';

export class UserController extends BaseController {
    constructor(private readonly userService: UserService) {
        super();
    }

    index = async (_req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();
            this.success(res, 'Users retrieved successfully', users);
        } catch (error) {
            this.fail(res, error);
        }
    };

    show = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.getUserById(Number(req.params.id));
            this.success(res, 'User retrieved successfully', user);
        } catch (error) {
            this.fail(res, error);
        }
    };

    store = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.createUser(req.body);
            this.success(res, 'User created successfully', user, 201);
        } catch (error) {
            this.fail(res, error);
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.updateUser(Number(req.params.id), req.body);
            this.success(res, 'User updated successfully', user);
        } catch (error) {
            this.fail(res, error);
        }
    };

    destroy = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.userService.deleteUser(Number(req.params.id));
            this.success(res, 'User deleted successfully');
        } catch (error) {
            this.fail(res, error);
        }
    };
}
