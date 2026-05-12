import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from '../services/user.service.js';

class UserRoute {
    public readonly router = Router();
    private readonly userRepository = new UserRepository();
    private readonly userService = new UserService(this.userRepository);
    private readonly userController = new UserController(this.userService);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', this.userController.index);
        this.router.get('/:id', this.userController.show);
        this.router.post('/', this.userController.store);
        this.router.put('/:id', this.userController.update);
        this.router.delete('/:id', this.userController.destroy);
    }
}

export default new UserRoute().router;
