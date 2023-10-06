import Joi from 'joi';

// Esquema Joi para validação de entrada para criação de aposta
const createBetSchema = Joi.object({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
  amountBet: Joi.number().min(1000).required(), // Mínimo de 1000 centavos (R$ 10,00)
  gameId: Joi.number().required(),
  participantId: Joi.number().required(),
});

export { createBetSchema };
