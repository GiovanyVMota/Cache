import express from 'express';
import {
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} from '../controllers/produtosController.js';

const router = express.Router();

router.get('/', getProdutos);
router.post('/', createProduto);
router.put('/:id', updateProduto);
router.delete('/:id', deleteProduto);

export default router;