import pool from '../configs/db.js';

export const getProdutosFromDB = async () => {
  const [rows] = await pool.query('SELECT * FROM produtos');
  return rows;
};

export const createProdutoInDB = async (produtoData) => {
  const [result] = await pool.query(
    'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, NOW())',
    [produtoData.nome, produtoData.descricao, produtoData.preco]
  );
  return { id: result.insertId, ...produtoData };
};

export const updateProdutoInDB = async (id, produtoData) => {
  await pool.query(
    'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = NOW() WHERE id = ?',
    [produtoData.nome, produtoData.descricao, produtoData.preco, id]
  );
  return { id, ...produtoData };
};

export const deleteProdutoInDB = async (id) => {
  await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
};