import { Routes } from '@angular/router';

export class NomesRotas {
  static readonly CATEGORIAS = 'categorias';
  static readonly TIPOS_TRANSACAO = 'tipostransacao';
  static readonly LANCAMENTOS = 'lancamentos';
}

export const routes: Routes = [
  { path: '', loadComponent: () => import('./categoria/categoria.component').then(m => m.CategoriaComponent) },
  { path: NomesRotas.CATEGORIAS, loadComponent: () => import('./categoria/categoria.component').then(m => m.CategoriaComponent) },
  { path: NomesRotas.TIPOS_TRANSACAO, loadComponent: () => import('./tipo-transacao/tipo-transacao-list.component').then(m => m.TipoTransacaoListComponent) },
  { path: NomesRotas.LANCAMENTOS, loadComponent: () => import('./lancamento/lancamento-view.component').then(m => m.LancamentoViewComponent) },
];
