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

export enum TiposPeriodo {
  EsteMes = 1,
  Ultimos7Dias = 2,
  Ultimos15Dias = 3,
  Ultimos30Dias = 4,
  Ultimos90Dias = 5,
  Todos = 6
}
