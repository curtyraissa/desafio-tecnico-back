import betService from '../service/betService';

const betController = {
  createBet: async (req, res) => {
    try {
      const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } = req.body;
      const bet = await betService.createBet(homeTeamScore, awayTeamScore, amountBet, gameId, participantId);
      res.status(201).json(bet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  finishBets: async (req, res) => {
    try {
      const { id } = req.params;
      const { homeTeamScore, awayTeamScore } = req.body;
      await betService.finishBets(id, homeTeamScore, awayTeamScore);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default betController;
