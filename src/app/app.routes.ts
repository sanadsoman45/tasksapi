import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { Dashboard } from './features/dashboard/dashboard';
import { UsersList } from './features/users/users-list/users-list';
import { UserEdit } from './features/users/user-edit/user-edit';
import { UserDetail } from './features/users/user-detail/user-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/users/users-list/users-list').then(
            (m) => m.UsersList
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./features/users/user-edit/user-edit').then(
            (m) => m.UserEdit
          ),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('./features/users/user-detail/user-detail').then(
            (m) => m.UserDetail
          ),
      },
    ],
  },
];
