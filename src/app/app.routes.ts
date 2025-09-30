import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AUTH_ROUTES } from './modules/auth/auth.routes';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { USER_ROUTES } from './modules/user/user.routes';
import { isAuthGuard } from './core/guards/is-auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';

export const routes: Routes = [
    {path:'',
        loadChildren:()=>import('./modules/user/user.routes').then((m)=>m.USER_ROUTES),
        canActivate:[isAuthGuard]
    },
    {path:'',
        loadChildren:()=>import('./modules/auth/auth.routes').then((m)=>m.AUTH_ROUTES),
        canActivate:[isLoggedInGuard]
    },
    {
        path:'**',
        loadComponent:()=>import('./shared/components/not-found/not-found.component').then((c)=>c.NotFoundComponent),title:'Not Found'
    }
];
