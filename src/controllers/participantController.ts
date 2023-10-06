import participantService from '../service/participantService';

const participantController = {
  createParticipant: async (req, res) => {
    try {
      const { name, balance } = req.body;
      const participant = await participantService.createParticipant(name, balance);
      res.status(201).json(participant);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllParticipants: async (req, res) => {
    try {
      const participants = await participantService.getAllParticipants();
      res.status(200).json(participants);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar participantes.' });
    }
  },
};

export default participantController;
