import { getClientesFromDB, createClienteInDB, updateClienteInDB, deleteClienteInDB } from '../services/clientesService.js';
import { getCache, setCache, deleteCache } from '../services/cacheService.js';

export const getClientes = async (req, res, next) => {
  try {
    const cachedData = getCache('clientes');
    if (cachedData) {
      res.locals.source = 'CACHE';
      return res.json(cachedData);
    }

    const clientes = await getClientesFromDB();
    setCache('clientes', clientes);
    res.locals.source = 'DB';
    res.json(clientes);
  } catch (error) {
    next(error);
  }
};

export const createCliente = async (req, res, next) => {
  try {
    const newCliente = await createClienteInDB(req.body);
    deleteCache('clientes');
    res.status(201).json(newCliente);
  } catch (error) {
    next(error);
  }
};

export const updateCliente = async (req, res, next) => {
  try {
    const updatedCliente = await updateClienteInDB(req.params.id, req.body);
    deleteCache('clientes');
    res.json(updatedCliente);
  } catch (error) {
    next(error);
  }
};

export const deleteCliente = async (req, res, next) => {
  try {
    await deleteClienteInDB(req.params.id);
    deleteCache('clientes');
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};