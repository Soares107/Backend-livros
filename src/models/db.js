const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    genero TEXT,
    ano_publicacao INTEGER,
    paginas INTEGER,
    lido INTEGER DEFAULT 0,
    criado_em TEXT DEFAULT (datetime('now'))
  )
`);

module.exports = db;