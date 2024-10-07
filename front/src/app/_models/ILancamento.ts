export interface ILancamento {
  Id: number;
  Data: Date;
  Titulo: string;
  Comentario: string;
  IdCategoria: number;
  IdSubCategoria: number;
  IdTipoTransacao?: number | null;
  Valor: number;
}