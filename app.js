import express from "express";
import { logger } from "./middlewares/loggingMiddleware.js";
import clientesRouter from "./routes/clientes.js";
import produtosRouter from "./routes/produtos.js";
import createError from "http-errors";
import { caching, memoryStore } from "cache-manager";

const app = express();
app.use(express.json());

// Middleware de log customizado
app.use(logger);

let cache;
const logKeys = []; // Array para controlar as chaves dos logs

(async () => {
  // Cria cache em memória com expiração de 30 segundos
  cache = await caching(memoryStore({ max: 100, ttl: 30 }));

  // Middleware para destacar logs e armazená-los no cache
  app.use(async (req, res, next) => {
    const logKey = `log:${Date.now()}`;
    const logEntry = `[${new Date().toISOString()}] ${req.method} ${
      req.originalUrl
    }`;
    console.log("\x1b[33m%s\x1b[0m", logEntry);
    await cache.set(logKey, logEntry);
    logKeys.push(logKey);
    next();
  });

  // Rotas principais
  app.use("/clientes", clientesRouter);
  app.use("/produtos", produtosRouter);

  // Endpoint para visualizar logs destacados
  app.get("/logs", async (req, res) => {
    const logs = [];
    // Filtra as chaves que ainda existem no cache
    for (let i = logKeys.length - 1; i >= 0; i--) {
      const entry = await cache.get(logKeys[i]);
      if (entry) {
        logs.push(entry);
      } else {
        // Remove a chave do array se expirou no cache
        logKeys.splice(i, 1);
      }
    }
    res.json({ logs });
  });

  // Middleware para invalidar cache após modificações
  app.use(async (req, res, next) => {
    const methodsToInvalidate = ["POST", "PUT", "DELETE"];
    if (methodsToInvalidate.includes(req.method)) {
      for (const key of logKeys) {
        await cache.del(key);
      }
      logKeys.length = 0; // Limpa o array de chaves
    }
    next();
  });

  // Tratamento de rota não encontrada
  app.use((req, res, next) => {
    next(createError(404, "Endpoint não encontrado"));
  });

  // Tratamento de erros gerais
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})();
