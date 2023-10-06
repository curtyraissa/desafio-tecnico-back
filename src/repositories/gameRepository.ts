import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const gameRepository = {
  createGame: async (homeTeamName, awayTeamName) => {
    try {
      const createdGame = await prisma.game.create({
        data: {
          homeTeamName,
          awayTeamName,
          homeTeamScore: 0, // Placar inicial 0x0
          awayTeamScore: 0,
          isFinished: false, // Jogo não finalizado
        },
      });

      const game = {
        id: createdGame.id,
        createdAt: createdGame.createdAt.toISOString(),
        updatedAt: createdGame.updatedAt.toISOString(),
        homeTeamName: createdGame.homeTeamName,
        awayTeamName: createdGame.awayTeamName,
        homeTeamScore: createdGame.homeTeamScore,
        awayTeamScore: createdGame.awayTeamScore,
        isFinished: createdGame.isFinished,
      };

      return game;
    } catch (error) {
      throw new Error(`Erro ao criar jogo: ${error.message}`);
    }
  },

  getGameById: async (id) => {
    try {
      const gameFromPrisma = await prisma.game.findUnique({
        where: {
          id,
        },
      });

      if (!gameFromPrisma) {
        return null;
      }

      const game = {
        id: gameFromPrisma.id,
        createdAt: gameFromPrisma.createdAt.toISOString(),
        updatedAt: gameFromPrisma.updatedAt.toISOString(),
        homeTeamName: gameFromPrisma.homeTeamName,
        awayTeamName: gameFromPrisma.awayTeamName,
        homeTeamScore: gameFromPrisma.homeTeamScore,
        awayTeamScore: gameFromPrisma.awayTeamScore,
        isFinished: gameFromPrisma.isFinished,
      };

      return game;
    } catch (error) {
      throw new Error(`Erro ao buscar jogo: ${error.message}`);
    }
  },

  finishGame: async (id, homeTeamScore, awayTeamScore) => {
    try {
      const updatedGame = await prisma.game.update({
        where: {
          id,
        },
        data: {
          homeTeamScore,
          awayTeamScore,
          isFinished: true, // Marcar o jogo como finalizado
        },
      });

      if (!updatedGame) {
        return null;
      }

      const game = {
        id: updatedGame.id,
        createdAt: updatedGame.createdAt.toISOString(),
        updatedAt: updatedGame.updatedAt.toISOString(),
        homeTeamName: updatedGame.homeTeamName,
        awayTeamName: updatedGame.awayTeamName,
        homeTeamScore: updatedGame.homeTeamScore,
        awayTeamScore: updatedGame.awayTeamScore,
        isFinished: updatedGame.isFinished,
      };

      return game;
    } catch (error) {
      throw new Error(`Erro ao finalizar jogo: ${error.message}`);
    }
  },

  getAllGames: async () => {
    try {
      const gamesFromPrisma = await prisma.game.findMany();

      const games = gamesFromPrisma.map((g) => ({
        id: g.id,
        createdAt: g.createdAt.toISOString(),
        updatedAt: g.updatedAt.toISOString(),
        homeTeamName: g.homeTeamName,
        awayTeamName: g.awayTeamName,
        homeTeamScore: g.homeTeamScore,
        awayTeamScore: g.awayTeamScore,
        isFinished: g.isFinished,
      }));

      return games;
    } catch (error) {
      throw new Error(`Erro ao buscar jogos: ${error.message}`);
    }
  },
};

export default gameRepository;
