import { Request, Response, NextFunction } from 'express';

function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`${req.method} ${req.url}`);
  next();
}

export default requestLoggerMiddleware;
