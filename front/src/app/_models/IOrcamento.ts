import { BaseModel } from "./IBaseModel";

/**
 * Representa um orçamento mensal associado a uma categoria e subcategoria.
 */
export interface IOrcamento extends BaseModel {
  IdCategoria: number;
  IdSubCategoria: number;
  NumMes: number;
  Valor: number;
  Descricao?: string;
}

export interface IOrcamentoView {
  NumMes: number;
  Total: number;
  Items: IOrcamento[];
}
