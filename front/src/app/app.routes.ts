import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'categorias', loadComponent: () => import('./categoria/categoria.component').then(m => m.CategoriaComponent) },
];
