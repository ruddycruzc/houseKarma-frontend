import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

import { PublicLayout } from './layouts/public-layout/public-layout';
import { TenantLayout } from './layouts/tenant-layout/tenant-layout';
import { LandlordLayout } from './layouts/landlord-layout/landlord-layout';

import { Home } from './features/home/pages/home/home';
import { Register } from './features/auth/pages/register/register';
import { Login } from './features/auth/pages/login/login';

import { TenantDashboard } from './features/tenant/pages/tenant-dashboard/tenant-dashboard';
import { LandlordDashboard } from './features/landlord/pages/landlord-dashboard/landlord-dashboard';
import { RateExperience } from './features/experiences/pages/rate-experience/rate-experience';
import { MyExperiences } from './features/experiences/pages/my-experiences/my-experiences';
import { MyProfile } from './features/my-profile/my-profile';
import { UserSearch } from './features/search-user/components/user-search/user-search';
import { UserPublicProfile } from './features/search-user/pages/user-public-profile/user-public-profile';
import { AddExperience } from './features/experiences/components/add-experience/add-experience';

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
      {
        path: 'login',
        component: Login,
      },
    ],
  },
  {
    path: 'inquilino',
    component: TenantLayout,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['INQUILINO'] },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'perfil',
        component: MyProfile,
      },
      {
        path: 'experiencias',
        component: MyExperiences,
      },
      {
        path: 'experiencias/valorar',
        component: RateExperience,
      },
      {
        path: 'dashboard',
        component: TenantDashboard,
      },
      {
        path: 'buscar-usuarios',
        component: UserSearch,
      },
      {
        path: 'usuarios/:id',
        component: UserPublicProfile,
      },
    ],
  },
  {
    path: 'casero',
    component: LandlordLayout,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['CASERO'] },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: LandlordDashboard,
      },
      {
        path: 'perfil',
        component: MyProfile,
      },
      {
        path: 'experiencias/valorar',
        component: RateExperience,
      },
{
  path: 'experiencias/nueva',
  component: AddExperience,
},
      {
        path: 'buscar-usuarios',
        component: UserSearch,
      },
      {
        path: 'usuarios/:id',
        component: UserPublicProfile,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
