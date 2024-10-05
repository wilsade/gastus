import { BaseModel } from "./IBaseModel";

/**
 * Representa um Tipo de transação
 */
export interface ITipoTransacao extends BaseModel {
  /**
   * Nome do Tipo de transação
   */
  Nome: string;
}