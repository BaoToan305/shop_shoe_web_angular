import { Routes } from '@angular/router';
import { Login } from '../app/features/auth/login-component/login';
import { HomeComponent } from './pages/home-component/home-component';
import { authGuard } from './core/guards/auth.guard';
import { ShopComponent } from './layouts/shop-component/shop-component';
export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'home',
        component: ShopComponent,
        children: [
            {path: '', component: HomeComponent}

        ],
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**', 
        redirectTo: 'login'
    }
];
