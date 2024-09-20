-- Criação da tabela de categorias de gastos
CREATE TABLE IF NOT EXISTS Categoria (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL
);

-- Criação da tabela de gastos
CREATE TABLE IF NOT EXISTS SubCategoria (
    id INTEGER,
    id_categoria INTEGER,
    descricao TEXT NOT NULL,
    PRIMARY KEY (id, id_categoria),
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id)
);