import { BaseModel } from "./IBaseModel";

export interface IAplicacao extends BaseModel {
  Nome: string;
  Lancamentos: ILancamentoAplicacao[];
}

export interface ILancamentoAplicacao {
  Id: number;
  Data: Date;
  Valor: number;
  IdAplicacao: number;
}