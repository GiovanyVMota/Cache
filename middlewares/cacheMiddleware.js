import { deleteCache } from '../services/cacheService.js';

// Middleware para invalidar cache após operações de modificação
export const invalidateProdutosCache = (req, res, next) => {
  deleteCache('produtos');
  next();
};

export const invalidateClientesCache = (req, res, next) => {
  deleteCache('clientes');
  next();
};