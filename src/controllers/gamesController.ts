import gameService from '../service/gameService';

const gameController = {
  createGame: async (req, res) => {
    try {
      const { homeTeamName, awayTeamName } = req.body;
      const game = await gameService.createGame(homeTeamName, awayTeamName);
      res.status(201).json(game);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  finishGame: async (req, res) => {
    try {
      const { id } = req.params;
      const { homeTeamScore, awayTeamScore } = req.body;
      await gameService.finishGame(id, homeTeamScore, awayTeamScore);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllGames: async (req, res) => {
    try {
      const games = await gameService.getAllGames();
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar jogos.' });
    }
  },
};

export default gameController;
