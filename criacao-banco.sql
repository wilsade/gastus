-- Criação da tabela de categorias de gastos
CREATE TABLE IF NOT EXISTS Categoria (
    Id INTEGER PRIMARY KEY,
    Nome TEXT NOT NULL,
    CONSTRAINT UQ_Nome_Categoria UNIQUE (Nome COLLATE NOCASE)
);

-- Criação da tabela de gastos
CREATE TABLE IF NOT EXISTS SubCategoria (
    IdCategoria INTEGER,
    Id INTEGER,
    Nome TEXT NOT NULL,
    PRIMARY KEY (IdCategoria, Id),
    FOREIGN KEY (IdCategoria) REFERENCES Categoria(Id),
    CONSTRAINT UQ_Nome_SubCategoria UNIQUE (IdCategoria, Nome COLLATE NOCASE)
);

-- Criação da tabela de TipoTransacao
CREATE TABLE IF NOT EXISTS TipoTransacao (
    Id INTEGER PRIMARY KEY,
    Nome TEXT NOT NULL,
    CONSTRAINT UQ_Nome_TipoTransacao UNIQUE (Nome COLLATE NOCASE)
);