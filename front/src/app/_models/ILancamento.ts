export interface ILancamento {
  Id: number;
  Data: Date;
  Titulo: string;
  Comentario: string;
  IdCategoria: number;
  IdSubCategoria: number;
  IdTipoTransacao?: number | null;
  Valor: number;
  SALDO: number;
}

export interface ILancamentoView extends ILancamento {
  NomeCategoria: string;
  NomeSubCategoria: string;
  NomeTipoTranscao: string;
}

export interface ILookupLancamento {
  Titulo: string;
  NomeCategoria: string;
  NomeSubCategoria: string;
  Comentario: string;
  NomeTipoTransacao: string;
}

export interface IImportarLancamento {
  Data: string;
  Titulo: string;
  Valor: string;
  NomeCategoria: string;
  NomeSubCategoria: string;
  Comentario: string;
  NomeTipoTransacao: string;
}

export enum TiposPeriodo {
  EsteMes = 1,
  Ultimos7Dias = 2,
  Ultimos15Dias = 3,
  Ultimos30Dias = 4,
  Ultimos90Dias = 5,
  Todos = 6
}
