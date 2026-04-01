import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'docs',
    loadComponent: () =>
      import('./pages/docs/docs.component').then(m => m.DocsComponent)
  },
  {
    path: 'docs/:section',
    loadComponent: () =>
      import('./pages/docs/docs.component').then(m => m.DocsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
