import Joi from 'joi';

// Esquema Joi para validação de entrada para criação de jogo
const createGameSchema = Joi.object({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

// Esquema Joi para validação de entrada para finalização de jogo
const finishGameSchema = Joi.object({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
});

export { createGameSchema, finishGameSchema };

