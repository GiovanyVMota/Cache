import express from 'express';
import { logger } from './middlewares/loggingMiddleware.js';
import clientesRouter from './routes/clientes.js';
import produtosRouter from './routes/produtos.js';
import createError from 'http-errors';

const app = express();
app.use(express.json());
app.use(logger);

app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);

// Tratamento de erros
app.use((req, res, next) => {
  next(createError(404, 'Endpoint não encontrado'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});