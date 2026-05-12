import type { Response } from 'express';
import { AppError } from '../errors/app.error.js';

export class BaseController {
    protected success(res: Response, message: string, data?: unknown, statusCode = 200): void {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    protected fail(res: Response, error: unknown): void {
        const statusCode = error instanceof AppError ? error.statusCode : 500;
        const message = error instanceof Error ? error.message : 'Something went wrong';

        res.status(statusCode).json({
            success: false,
            message,
        });
    }
}
