import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FORBIDDEN_MESSAGE } from '@nestjs/core/guards';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleWare.name);
  use(req: Request, res: Response, next: NextFunction) {
    let authorization = req.headers.authorization;
    //TODO - bypassing
    next();
    // if (!authorization) {
    //   this.logger.log(`no Authorization found`);
    //   res.status(403).send({
    //     statusCode: 403,
    //     message: FORBIDDEN_MESSAGE,
    //   });
    // } else {
    //   next();
    // }
  }
}
