// src/common/middleware/logger.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;

    // Extract module name (first path segment)
    const moduleName =
      originalUrl.split('/')[1].split('?')[0].toUpperCase() || 'Unknown';

    res.on('finish', () => {
      const message = `${method} ${originalUrl} - ${res.statusCode}`;

      if (res.statusCode >= 400) {
        this.logger.error(message, `API:${moduleName}`);
      } else {
        this.logger.log(message, `API:${moduleName}`);
      }
    });

    next();
  }
}
