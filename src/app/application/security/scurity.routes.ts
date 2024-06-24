import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'hotels',
        loadComponent: () =>
            import('./hotels/hotels.component').then(
                (m) => m.HotelsComponent
            ),
    },
    {
        path: 'rooms',
        loadComponent: () =>
            import('./rooms/rooms.component').then(
                (m) => m.RoomsComponent
            ),
    },
    {
        path: 'reservations',
        loadComponent: () =>
            import('./reservations/reservations.component').then(
                (m) => m.ReservationsComponent
            ),
    },
    {
        path: 'guests',
        loadComponent: () =>
            import('./guests/guests.component').then(
                (m) => m.GuestsComponent
            ),
    },
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full',
    },
];