import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./categoria/categoria.component').then(m => m.CategoriaComponent) },
  { path: 'categorias', loadComponent: () => import('./categoria/categoria.component').then(m => m.CategoriaComponent) },
];
