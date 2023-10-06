import betRepository from '../repositories/betRepository';
import gameRepository from '../repositories/gameRepository';

const betService = {
  createBet: async (homeTeamScore, awayTeamScore, amountBet, gameId, participantId) => {
    // Verifica se a pontuação é válida
    if (homeTeamScore < 0 || awayTeamScore < 0) {
      throw new Error('A pontuação não pode ser negativa.');
    }

    // Verifica se a quantidade de aposta é válida
    if (amountBet < 1000) {
      throw new Error('A quantidade mínima de aposta é de 1000 centavos (R$ 10,00).');
    }

    // Cria a aposta
    const bet = await betRepository.createBet(homeTeamScore, awayTeamScore, amountBet, gameId, participantId);

    return bet;
  },

  finishBets: async (gameId, homeTeamScore, awayTeamScore) => {
    // Verifica se o jogo já foi finalizado
    const game = await gameRepository.getGameById(gameId);
    if (!game) {
      throw new Error('Jogo não encontrado.');
    }
    if (game.isFinished) {
      throw new Error('O jogo já foi finalizado.');
    }

    // Finaliza as apostas
    await betRepository.finishBets(gameId, homeTeamScore, awayTeamScore);

    // Atualiza o jogo como finalizado
    await gameRepository.finishGame(gameId, homeTeamScore, awayTeamScore);
  },
};

export default betService;
