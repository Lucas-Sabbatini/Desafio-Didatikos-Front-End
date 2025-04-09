import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'users', component: UserManagementComponent },
  { path: 'products', component: ProductManagementComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
