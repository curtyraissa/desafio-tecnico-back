import gameRepository from '../repositories/gameRepository';

const gameService = {
  createGame: async (homeTeamName, awayTeamName) => {
    try {
      const game = await gameRepository.createGame(homeTeamName, awayTeamName);
      return game;
    } catch (error) {
      throw new Error(`Erro ao criar jogo: ${error.message}`);
    }
  },

  finishGame: async (id, homeTeamScore, awayTeamScore) => {
    try {
      const game = await gameRepository.finishGame(id, homeTeamScore, awayTeamScore);
      return game;
    } catch (error) {
      throw new Error(`Erro ao finalizar jogo: ${error.message}`);
    }
  },

  getGameById: async (id) => {
    try {
      const game = await gameRepository.getGameById(id);
      return game;
    } catch (error) {
      throw new Error(`Erro ao buscar jogo: ${error.message}`);
    }
  },

  getAllGames: async () => {
    try {
      const games = await gameRepository.getAllGames();
      return games;
    } catch (error) {
      throw new Error(`Erro ao buscar jogos: ${error.message}`);
    }
  },
};

export default gameService;
