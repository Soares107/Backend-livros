# 📚 Backend — API de Livros

API REST desenvolvida com **Node.js + Express + SQLite** para gerenciamento de livros.

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js >= 18

### Passos

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd backend-livros

# Instale as dependências
npm install

# Inicie o servidor
npm start
```

O servidor estará disponível em: `http://localhost:3000`

---

## 📡 Endpoints da API

| Método | Rota        | Descrição             |
|--------|-------------|-----------------------|
| GET    | /livros     | Lista todos os livros |
| GET    | /livros/:id | Busca livro por ID    |
| POST   | /livros     | Cadastra novo livro   |
| PUT    | /livros/:id | Atualiza um livro     |
| DELETE | /livros/:id | Remove um livro       |

### Exemplo de body (POST / PUT)

```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "genero": "Romance",
  "ano_publicacao": 1899,
  "paginas": 256,
  "lido": false
}
```

---

## 🗂️ Estrutura do Projeto

```
backend-livros/
├── src/
│   ├── controllers/
│   │   └── livrosController.js
│   ├── models/
│   │   └── db.js
│   ├── routes/
│   │   └── livros.js
│   └── server.js
├── package.json
└── README.md
```