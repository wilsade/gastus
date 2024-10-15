-- Iniciar uma transação para garantir integridade
BEGIN TRANSACTION;

-- Criar uma nova tabela Orcamento sem a coluna NomeMes
CREATE TABLE IF NOT EXISTS Orcamento_New (
    Id INTEGER PRIMARY KEY,
    IdCategoria INTEGER NOT NULL,
    IdSubCategoria INTEGER NOT NULL,
    NumMes INTEGER NOT NULL,
    Valor REAL NOT NULL,
    Descricao TEXT,
    FOREIGN KEY (IdCategoria, IdSubCategoria) REFERENCES SubCategoria(IdCategoria, Id)
);

-- Copiar os dados da tabela original para a nova (exceto NomeMes)
INSERT INTO Orcamento_New (Id, IdCategoria, IdSubCategoria, NumMes, Valor, Descricao)
SELECT Id, IdCategoria, IdSubCategoria, NumMes, Valor, Descricao
FROM Orcamento;

-- Apagar a tabela original
DROP TABLE Orcamento;

-- Renomear a nova tabela para Orcamento
ALTER TABLE Orcamento_New RENAME TO Orcamento;

-- Finalizar a transação
COMMIT;
