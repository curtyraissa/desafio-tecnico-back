import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

// Função de middleware para validar o corpo da solicitação com um esquema Joi
export function validateBody(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    next();
  };
}
