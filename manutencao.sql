-- Iniciar uma transa��o para garantir integridade
BEGIN TRANSACTION;

-- Adicionar a coluna IndicaReceita com valor padr�o false para registros existentes
ALTER TABLE Categoria
ADD COLUMN IndicaReceita BOOLEAN NOT NULL DEFAULT 0;

-- Adicionar a coluna SaiNoRelatorio com valor padr�o true para registros existentes
ALTER TABLE Categoria
ADD COLUMN SaiNoRelatorio BOOLEAN NOT NULL DEFAULT 1;

-- Atualizar registros existentes para garantir os valores padr�es, caso necess�rio
UPDATE Categoria
SET IndicaReceita = 0, -- False
    SaiNoRelatorio = 1; -- True

-- Finalizar a transa��o
COMMIT;
