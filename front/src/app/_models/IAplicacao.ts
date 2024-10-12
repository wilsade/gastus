import { BaseModel } from "./IBaseModel";

export interface IAplicacao extends BaseModel {
  Nome: string;
  Lancamentos: ILancamentoAplicacao[];
}

export interface ILancamentoAplicacao {
  IdAplicacao: number;
  Id: number;
  Data: Date;
  Valor: number;
}