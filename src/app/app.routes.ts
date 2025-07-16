import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AdminauthComponent } from './component/adminauth/adminauth.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { RoomComponent } from './component/rooms/room/room.component';
import { RoomViewComponent } from './component/rooms/room-view/room-view.component';
import { MoviedetailsComponent } from './component/moviedetails/moviedetails.component';
import { UserauthComponent } from './component/userauth/userauth.component';
import { authGuard } from './authguard/auth.guard';
import { TicketComponent } from './component/ticket/ticket.component';
import { RoomeditComponent } from './component/rooms/roomedit/roomedit.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'adminauth',
    component: AdminauthComponent,
  },
  {
    path: 'userauth',
    component: UserauthComponent,
  },
  {
    path: 'admindashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./component/editmovie/editmovie.component').then(
        (c) => c.EditmovieComponent
      ),
    canActivate: [authGuard],
  },
  { path: 'rooms', component: RoomComponent, canActivate: [authGuard] },
  {
    path: 'room-view/:id',
    component: RoomViewComponent,
  },
  {
    path: 'roomedit/:id',
    component: RoomeditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'roomedit',
    component: RoomeditComponent,
    canActivate: [authGuard],
  },

  {
    path: 'moviedetails/:id',
    component: MoviedetailsComponent,
  },
  {
    path: 'ticket',
    component: TicketComponent,
  },
];
