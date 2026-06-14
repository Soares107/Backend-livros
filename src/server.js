const express = require('express');
const cors = require('cors');
const livrosRoutes = require('./routes/livros');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Livros funcionando!', versao: '1.0.0' });
});

app.use('/livros', livrosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
