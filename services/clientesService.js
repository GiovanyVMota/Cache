import pool from '../configs/db.js';

export const getClientesFromDB = async () => {
  const [rows] = await pool.query('SELECT * FROM clientes');
  return rows;
};

export const createClienteInDB = async (clienteData) => {
  const [result] = await pool.query(
    'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
    [clienteData.nome, clienteData.sobrenome, clienteData.email, clienteData.idade]
  );
  return { id: result.insertId, ...clienteData };
};

export const updateClienteInDB = async (id, clienteData) => {
  await pool.query(
    'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
    [clienteData.nome, clienteData.sobrenome, clienteData.email, clienteData.idade, id]
  );
  return { id, ...clienteData };
};

export const deleteClienteInDB = async (id) => {
  await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
};