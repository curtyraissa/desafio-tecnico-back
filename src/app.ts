import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import errorMiddleware from './middlewares/errorMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import requestLoggerMiddleware from './middlewares/requestLoggerMiddleware';
import { participantRouter } from './routers/participantRouters';
import { gameRouter } from './routers/gameRouters';
import { betRouter } from './routers/betRouters';

// instância do Express
const app = express();

// Middleware para lidar com JSON e CORS
app.use(bodyParser.json());
app.use(cors());

app.use(requestLoggerMiddleware);
app.use(authMiddleware);
app.use(errorMiddleware);

// Instância do Prisma Client
const prisma = new PrismaClient();

// Use as rotas
app.use('/participants', participantRouter);
app.use('/games', gameRouter);
app.use('/bets', betRouter);

// Inicialize o servidor
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

// Encerrar o Prisma Client quando o aplicativo for encerrado
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log('Servidor encerrado.');
    process.exit(0);
  });
});
