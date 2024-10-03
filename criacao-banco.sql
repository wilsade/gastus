-- Criação da tabela de categorias de gastos
CREATE TABLE IF NOT EXISTS Categoria (
    Id INTEGER PRIMARY KEY,
    Nome TEXT NOT NULL
);

-- Criação da tabela de gastos
CREATE TABLE IF NOT EXISTS SubCategoria (
    IdCategoria INTEGER,
    Id INTEGER,
    descricao TEXT NOT NULL,
    PRIMARY KEY (IdCategoria, Id),
    FOREIGN KEY (IdCategoria) REFERENCES Categoria(Id)
);

-- Criação da tabela de TipoTransacao
CREATE TABLE IF NOT EXISTS TipoTransacao (
    Id INTEGER PRIMARY KEY,
    Nome TEXT NOT NULL
);