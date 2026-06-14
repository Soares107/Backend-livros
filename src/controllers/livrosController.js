const db = require('../models/db');

const listarLivros = (req, res) => {
  db.all('SELECT * FROM livros ORDER BY criado_em DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar livros' });
    res.json(rows);
  });
};

const buscarLivroPorId = (req, res) => {
  db.get('SELECT * FROM livros WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar livro' });
    if (!row) return res.status(404).json({ erro: 'Livro não encontrado' });
    res.json(row);
  });
};

const criarLivro = (req, res) => {
  const { titulo, autor, genero, ano_publicacao, paginas, lido } = req.body;
  if (!titulo || !autor) {
    return res.status(400).json({ erro: 'Título e autor são obrigatórios' });
  }
  const sql = 'INSERT INTO livros (titulo, autor, genero, ano_publicacao, paginas, lido) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(sql, [titulo, autor, genero || null, ano_publicacao || null, paginas || null, lido ? 1 : 0], function (err) {
    if (err) return res.status(500).json({ erro: 'Erro ao criar livro' });
    db.get('SELECT * FROM livros WHERE id = ?', [this.lastID], (err, row) => {
      if (err) return res.status(500).json({ erro: 'Erro ao buscar livro criado' });
      res.status(201).json(row);
    });
  });
};

const atualizarLivro = (req, res) => {
  const { titulo, autor, genero, ano_publicacao, paginas, lido } = req.body;
  db.get('SELECT * FROM livros WHERE id = ?', [req.params.id], (err, livro) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar livro' });
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
    const sql = 'UPDATE livros SET titulo = ?, autor = ?, genero = ?, ano_publicacao = ?, paginas = ?, lido = ? WHERE id = ?';
    const valores = [
      titulo ?? livro.titulo,
      autor ?? livro.autor,
      genero ?? livro.genero,
      ano_publicacao ?? livro.ano_publicacao,
      paginas ?? livro.paginas,
      lido !== undefined ? (lido ? 1 : 0) : livro.lido,
      req.params.id,
    ];
    db.run(sql, valores, (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar livro' });
      db.get('SELECT * FROM livros WHERE id = ?', [req.params.id], (err, row) => {
        res.json(row);
      });
    });
  });
};

const deletarLivro = (req, res) => {
  db.get('SELECT * FROM livros WHERE id = ?', [req.params.id], (err, livro) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar livro' });
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
    db.run('DELETE FROM livros WHERE id = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao deletar livro' });
      res.json({ mensagem: 'Livro deletado com sucesso' });
    });
  });
};

module.exports = { listarLivros, buscarLivroPorId, criarLivro, atualizarLivro, deletarLivro };