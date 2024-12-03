import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAddressComponent } from './manage-address/manage-address.component';

const routes: Routes = [
  {
    path: '',
    component: ManageAddressComponent,
  },
  // {
  //   path: ':provinceCode',
  //   component: ManageAddressComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAddressRoutingModule {}
