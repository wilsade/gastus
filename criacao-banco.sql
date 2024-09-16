-- Criação da tabela de categorias de gastos
CREATE TABLE IF NOT EXISTS Categoria (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL
);

-- Criação da tabela de gastos
CREATE TABLE IF NOT EXISTS SubCategoria (
    id INTEGER,
    descricao TEXT NOT NULL,
    valor REAL NOT NULL,
    data TEXT NOT NULL,
    categoria_id INTEGER,
    PRIMARY KEY (id, categoria_id),
    FOREIGN KEY (categoria_id) REFERENCES Categoria(id)
);