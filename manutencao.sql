-- Criação do índice único para o campo Nome na tabela Categoria
CREATE UNIQUE INDEX IF NOT EXISTS UQ_Nome_Categoria ON Categoria (Nome COLLATE NOCASE);

-- Criação do índice único para o campo Nome na tabela SubCategoria
CREATE UNIQUE INDEX IF NOT EXISTS UQ_Nome_SubCategoria ON SubCategoria (IdCategoria, Nome COLLATE NOCASE);

CREATE UNIQUE INDEX IF NOT EXISTS UQ_Nome_TipoTransacao ON Categoria (Nome COLLATE NOCASE);