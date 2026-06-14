const express = require('express');
const router = express.Router();
const {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  deletarLivro,
} = require('../controllers/livrosController');

router.get('/', listarLivros);
router.get('/:id', buscarLivroPorId);
router.post('/', criarLivro);
router.put('/:id', atualizarLivro);
router.delete('/:id', deletarLivro);

module.exports = router;
