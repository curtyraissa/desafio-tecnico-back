import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const participantRepository = {
  createParticipant: async (name, balance) => {
    try {
      const createdParticipant = await prisma.participant.create({
        data: {
          name,
          balance,
        },
      });

      const participant = {
        id: createdParticipant.id,
        createdAt: createdParticipant.createdAt.toISOString(),
        updatedAt: createdParticipant.updatedAt.toISOString(),
        name: createdParticipant.name,
        balance: createdParticipant.balance,
      };

      return participant;
    } catch (error) {
      throw new Error(`Erro ao criar participante: ${error.message}`);
    }
  },
  
  getAllParticipants: async () => {
    try {
      const participantsFromPrisma = await prisma.participant.findMany();

      // Converte a lista de objetos do Prisma para a lista de modelos personalizados
      const participants = participantsFromPrisma.map((p) => ({
        id: p.id,
        createdAt: p.createdAt.toISOString(), // Converte a data para uma string
        updatedAt: p.updatedAt.toISOString(), // Converte a data para uma string
        name: p.name,
        balance: p.balance,
      }));

      return participants;
    } catch (error) {
      throw new Error(`Erro ao buscar participantes: ${error.message}`);
    }
  },
};

export default participantRepository;
