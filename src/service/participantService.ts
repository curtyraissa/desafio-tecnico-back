import participantRepository from '../repositories/participantRepository';

const participantService = {
  createParticipant: async (name, balance) => {
    try {
      const participant = await participantRepository.createParticipant(name, balance);
      return participant;
    } catch (error) {
      throw new Error(`Erro ao criar participante: ${error.message}`);
    }
  },

  getAllParticipants: async () => {
    try {
      const participants = await participantRepository.getAllParticipants();
      return participants;
    } catch (error) {
      throw new Error(`Erro ao buscar participantes: ${error.message}`);
    }
  },
};

export default participantService;
