-- Relatório com o saldo de cada aplicação
SELECT 
    'Conta corrente' AS NomeAplicacao, SUM(L.Valor) AS Valor, 0 AS Ordem
FROM Lancamento L

UNION

SELECT A.Nome AS NomeAplicacao, LA.Valor AS Valor, 1 AS Ordem
FROM Aplicacao A
JOIN 
    LancamentoAplicacao LA ON A.Id = LA.IdAplicacao
WHERE 
    LA.Data = (SELECT MAX(LA2.Data)
        FROM LancamentoAplicacao LA2
        WHERE LA2.IdAplicacao = LA.IdAplicacao)
ORDER BY  Ordem,  NomeAplicacao;

-- Total de orçamento por mês
SELECT NumMes, SUM(Valor) AS TotalOrcamento
FROM Orcamento
GROUP BY  NumMes
ORDER BY NumMes;

-- Total de orçamento por mês/categoria
SELECT 
    CASE NumMes
        WHEN 1 THEN 'Janeiro'
        WHEN 2 THEN 'Fevereiro'
        WHEN 3 THEN 'Março'
        WHEN 4 THEN 'Abril'
        WHEN 5 THEN 'Maio'
        WHEN 6 THEN 'Junho'
        WHEN 7 THEN 'Julho'
        WHEN 8 THEN 'Agosto'
        WHEN 9 THEN 'Setembro'
        WHEN 10 THEN 'Outubro'
        WHEN 11 THEN 'Novembro'
        WHEN 12 THEN 'Dezembro'
    END AS NomeMes,
    C.Nome AS NomeCategoria, SUM(O.Valor) AS TotalOrcamento
FROM 
    Orcamento O
JOIN 
    Categoria C ON O.IdCategoria = C.Id
GROUP BY NumMes, NomeCategoria
ORDER BY NumMes, NomeCategoria;

-- Total de lançamento por mês/categoria
SELECT 
    STRFTIME('%m', L.Data) AS Mes,
    C.Nome AS NomeCategoria,
    CAST(ROUND(SUM(L.Valor), 2) AS REAL) AS TotalGasto
FROM 
    Lancamento L
JOIN 
    Categoria C ON L.IdCategoria = C.Id
WHERE 
    C.IndicaReceita = 0 AND C.SaiNoRelatorio = 1
GROUP BY 
    STRFTIME('%m', L.Data), C.Nome
ORDER BY 
    Mes, NomeCategoria;
