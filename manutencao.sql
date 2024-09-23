-- 1. Renomear a tabela antiga (opcional, para backup)
ALTER TABLE SubCategoria RENAME TO SubCategoria_old;

-- 2. Criar a nova tabela com a coluna 'Nome' em vez de 'descricao'
CREATE TABLE SubCategoria (
    IdCategoria INTEGER,
    Id INTEGER,
    Nome TEXT NOT NULL,  -- A coluna foi renomeada para 'Nome'
    PRIMARY KEY (IdCategoria, Id),
    FOREIGN KEY (IdCategoria) REFERENCES Categoria(Id)
);

-- 3. Copiar os dados da tabela antiga para a nova
INSERT INTO SubCategoria (IdCategoria, Id, Nome)
SELECT IdCategoria, Id, descricao
FROM SubCategoria_old;

-- 4. Excluir a tabela antiga
DROP TABLE SubCategoria_old;

-- 5. (Opcional) Verificar se tudo foi copiado corretamente
SELECT * FROM SubCategoria;
