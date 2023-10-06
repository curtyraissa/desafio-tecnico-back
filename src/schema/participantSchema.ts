import Joi from 'joi';

// Esquema Joi para validação de entrada para criação de participante
export const createParticipantSchema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().min(1000).required(), // Mínimo de 1000 centavos (R$ 10,00)
});

// Esquema Joi para validação de entrada para atualização de participante (opcional)
export const updateParticipantSchema = Joi.object({
  name: Joi.string(),
  balance: Joi.number().min(1000), // Mínimo de 1000 centavos (R$ 10,00)
});


