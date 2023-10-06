import { Request, Response, NextFunction } from 'express';

function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error.stack); // Registra o erro no console (você pode personalizar o tratamento do erro)
  res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
}

export default errorMiddleware;
