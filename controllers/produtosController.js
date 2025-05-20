import { getProdutosFromDB, createProdutoInDB, updateProdutoInDB, deleteProdutoInDB } from '../services/produtosService.js';
import { getCache, setCache, deleteCache } from '../services/cacheService.js';

export const getProdutos = async (req, res, next) => {
  try {
    const cachedData = getCache('produtos');
    if (cachedData) {
      res.locals.source = 'CACHE';
      return res.json(cachedData);
    }

    const produtos = await getProdutosFromDB();
    setCache('produtos', produtos);
    res.locals.source = 'DB';
    res.json(produtos);
  } catch (error) {
    next(error);
  }
};

export const createProduto = async (req, res, next) => {
  try {
    const newProduto = await createProdutoInDB(req.body);
    deleteCache('produtos'); // Invalida cache após modificação
    res.status(201).json(newProduto);
  } catch (error) {
    next(error);
  }
};

export const updateProduto = async (req, res, next) => {
  try {
    const updatedProduto = await updateProdutoInDB(req.params.id, req.body);
    deleteCache('produtos'); // Invalida cache após modificação
    res.json(updatedProduto);
  } catch (error) {
    next(error);
  }
};

export const deleteProduto = async (req, res, next) => {
  try {
    await deleteProdutoInDB(req.params.id);
    deleteCache('produtos'); // Invalida cache após modificação
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};