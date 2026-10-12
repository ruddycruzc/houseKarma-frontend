import { Routes } from '@angular/router';

import { PublicLayout } from './layouts/public-layout/public-layout';
import { Home } from './features/home/pages/home/home';
import { Register } from './features/auth/pages/register/register';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'register',
        component: Register,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
