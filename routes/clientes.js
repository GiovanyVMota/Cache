import express from 'express';
import { 
  getClientes, 
  createCliente, 
  updateCliente, 
  deleteCliente 
} from '../controllers/clientesController.js';
import { loggerMiddleware } from '../middlewares/logger.js';
import { cacheMiddleware, invalidateCache } from '../middlewares/cache.js';
const router = express.Router();

// Exemplo de rota GET
router.get('/', loggerMiddleware, cacheMiddleware('clientes'), async (req, res) => {
  res.json([{ id: 1, nome: 'Cliente Exemplo' }]);
});

// Exemplo de rota POST
router.post('/', loggerMiddleware, async (req, res) => {
  res.status(201).json({ message: 'Cliente criado!' });
  invalidateCache(['clientes']);
});

router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

export default router;
