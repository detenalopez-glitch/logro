import express from 'express';
import cors from 'cors';
import { config } from '../config/env';
import gameRoutes from '../routes/game.routes';
import { errorHandler } from '../middleware/error.middleware';

const app = express();

// Middlewares globales
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API Logros funcionando 🚀' });
});

app.use('/api/v1/games', gameRoutes);

// Manejo de errores centralizado
app.use(errorHandler);

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  app.listen(config.port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
  });
}

// Para Vercel (Serverless Functions)
export default app;