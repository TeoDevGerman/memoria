import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('\x1b[34m%s\x1b[0m', `${req.method} ${req.originalUrl}`);
        next();
    }
}
