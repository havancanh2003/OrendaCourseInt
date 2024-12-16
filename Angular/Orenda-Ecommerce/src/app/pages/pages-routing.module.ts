import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
    ],
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((l) => l.ProductModule),
  },
  {
    path: 'manage-address',
    loadChildren: () =>
      import('./manage-address/manage-address.module').then(
        (m) => m.ManageAddressModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
