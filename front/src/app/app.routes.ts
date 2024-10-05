import { Routes } from '@angular/router';

export class NomesRotas {
  static readonly CATEGORIAS = 'categorias';
  static readonly TIPOS_TRANSACAO = 'tipostransacao';
}

export const routes: Routes = [
  { path: '', loadComponent: () => import('./categoria/categoria.component').then(m => m.CategoriaComponent) },
  { path: NomesRotas.CATEGORIAS, loadComponent: () => import('./categoria/categoria.component').then(m => m.CategoriaComponent) },
  { path: NomesRotas.TIPOS_TRANSACAO, loadComponent: () => import('./tipo-transacao/tipo-transacao-list.component').then(m => m.TipoTransacaoListComponent) },
];
