/**
 * Representa um item básico de orçamento.
 */
export interface IOrcamentoBaseModel {
  IdCategoria: number;
  IdSubCategoria: number;
  Valor: number;
  Descricao?: string;
}

/**
 * Representa um orçamento mensal associado a uma categoria e subcategoria.
 */
export interface IOrcamento extends IOrcamentoBaseModel {
  Id: number;
  NumMes: number;
}

export interface IOrcamentoInsertModel extends IOrcamentoBaseModel {
  NumMeses: Array<number>;
}

export interface IOrcamentoView {
  NumMes: number;
  NOMEMES: string;
  Total: number;
  Items: IOrcamento[];
}
