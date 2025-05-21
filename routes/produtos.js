import express from "express";
import {
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} from "../controllers/produtosController.js";

import { loggerMiddleware } from "../middlewares/logger.js";
import { cacheMiddleware, invalidateCache } from "../middlewares/cache.js";

const router = express.Router();

router.get("/", getProdutos);
router.post("/", createProduto);
router.put("/:id", updateProduto);
router.delete("/:id", deleteProduto);

export default router;
router.get(
  "/",
  loggerMiddleware,
  cacheMiddleware("produtos"),
  async (req, res) => {
    // lógica de listagem de produtos
  }
);
router.post("/", loggerMiddleware, async (req, res) => {
  // lógica de criação de produto
  invalidateCache(["produtos"]);
});
router.put("/:id", loggerMiddleware, async (req, res) => {
  // lógica de atualização de produto
  invalidateCache(["produtos"]);
});
router.delete("/:id", loggerMiddleware, async (req, res) => {
  // lógica de exclusão de produto
  invalidateCache(["produtos"]);
});

// Exemplo de rota GET
router.get("/", (req, res) => {
  res.json([{ id: 1, nome: "Produto Exemplo" }]);
});

// Exemplo de rota POST
router.post("/", (req, res) => {
  res.status(201).json({ message: "Produto criado!" });
});
