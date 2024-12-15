export interface ILancamentosPorCategoriaMes {
  NomeMes: string;
  Total: number;
  TOTAL_FORMATADO: string;
  Categorias: IReportCategoria[];
}

export interface IReportCategoria extends ILancamentosPorCategoriaMes {
  Lancamentos: ILancamentoDeCategoria[];
}

export interface ILancamentoDeCategoria {
  Codigo: number;
  Nome: string;
  Valor: number;
  VALOR_FORMATADO: string;
}

export interface IRelatPrevistoRealizado {
  NumMes: number;
  NomeMes: string;
  Previsto: ILancamentoDeCategoria[];
  Realizado: IReportCategoria[];
  TotalPrevisto: number;
  TOTALPREVISTO_FORMATADO: string;
  TotalRealizado: number;
  TOTALREALIZADO_FORMATADO: string;
}
