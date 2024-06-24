import { Routes } from '@angular/router';

const adminRoutes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('../security/scurity.routes').then(m => m.routes)
    }
];

export const coreRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../landing-layout/landing/landing.component').then(m => m.LandingComponent)
    },
    {
        path: '',
        loadComponent: () => import('../admin-layout/admin/admin.component').then(m => m.AdminComponent),
        children: adminRoutes
    }
];