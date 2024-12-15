import { Routes } from '@angular/router';

export class NomesRotas {
  static readonly CATEGORIAS = 'categorias';
  static readonly TIPOS_TRANSACAO = 'tipostransacao';
  static readonly LANCAMENTOS = 'lancamentos';
  static readonly APLICACOES = 'aplicacoes';
  static readonly ORCAMENTO = 'orcamentos';
  static readonly ADMIN = 'admin';
  static readonly RELATORIOS = 'relatorios';
  static readonly RELAT_TotalAplicacoes = `${NomesRotas.RELATORIOS}/totalaplicacoes`;
  static readonly RELAT_LancamentosPorCategoriaMes = `${NomesRotas.RELATORIOS}/lancamentosporcategoriames`;
  static readonly RELAT_PrevistoRealizado = `${NomesRotas.RELATORIOS}/previstorealizado`;
}

export const routes: Routes = [
  { path: '', loadComponent: () => import('./categoria/categoria.component').then(m => m.CategoriaComponent) },
  { path: NomesRotas.CATEGORIAS, loadComponent: () => import('./categoria/categoria.component').then(m => m.CategoriaComponent) },
  { path: NomesRotas.TIPOS_TRANSACAO, loadComponent: () => import('./tipo-transacao/tipo-transacao-list.component').then(m => m.TipoTransacaoListComponent) },
  { path: NomesRotas.LANCAMENTOS, loadComponent: () => import('./lancamento/lancamento-view.component').then(m => m.LancamentoViewComponent) },
  { path: NomesRotas.APLICACOES, loadComponent: () => import('./aplicacao/aplicacao-view.component').then(m => m.AplicacaoViewComponent) },
  { path: NomesRotas.ORCAMENTO, loadComponent: () => import('./orcamento/orcamento-view.component').then(m => m.OrcamentoViewComponent) },
  { path: NomesRotas.ADMIN, loadComponent: () => import('./admin/admin-sql.component').then(m => m.AdminSqlComponent) },
  { path: NomesRotas.RELAT_TotalAplicacoes, loadComponent: () => import('./relatorios/totais-aplicacoes.component').then(m => m.TotaisAplicacoesComponent) },
  { path: NomesRotas.RELAT_LancamentosPorCategoriaMes, loadComponent: () => import('./relatorios/lancamentos-por-categoria-mes.component').then(m => m.LancamentosPorCategoriaMesComponent) },
  { path: NomesRotas.RELAT_PrevistoRealizado, loadComponent: () => import('./relatorios/previsto-realizado.component').then(m => m.PrevistoRealizadoComponent) },
];
