import { BaseModel } from "./IBaseModel";

/**
 * Representa um orçamento mensal associado a uma categoria e subcategoria.
 */
export interface IOrcamento extends BaseModel {
  IdCategoria: number;
  IdSubCategoria: number;
  NumMes: number;
  NomeMes: string;
  Valor: number;
  Descricao?: string;
}
