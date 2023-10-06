import { PrismaClient } from '@prisma/client';
import { BetStatus } from '@prisma/client';

const prisma = new PrismaClient();

// Repositório de apostas
const betRepository = {
  // Função para criar uma nova aposta
  createBet: async (homeTeamScore, awayTeamScore, amountBet, gameId, participantId) => {
    try {
      const bet = await prisma.bet.create({
        data: {
          homeTeamScore,
          awayTeamScore,
          amountBet,
          gameId,
          participantId,
          status: BetStatus.PENDING, // Define o status como PENDENTE por padrão
        },
      });

      return bet;
    } catch (error) {
      throw new Error(`Erro ao criar aposta: ${error.message}`);
    }
  },

  // Função para finalizar as apostas com base no resultado do jogo
  finishBets: async (gameId, homeTeamScore, awayTeamScore) => {
    try {
      const bets = await prisma.bet.findMany({
        where: {
          gameId,
          status: BetStatus.PENDING, // Somente apostas pendentes serão processadas
        },
      });

      for (const bet of bets) {
        // Calcula o valor ganho com base no resultado do jogo
        const amountWon = homeTeamScore === awayTeamScore ? Math.floor((bet.amountBet / 0.7) * (homeTeamScore + awayTeamScore)) : 0;

        await prisma.bet.update({
          where: {
            id: bet.id,
          },
          data: {
            status: homeTeamScore === awayTeamScore ? BetStatus.WON : BetStatus.LOST, // Define o status com base no resultado
            amountWon,
          },
        });
      }
    } catch (error) {
      throw new Error(`Erro ao finalizar apostas: ${error.message}`);
    }
  },
};

export default betRepository;
