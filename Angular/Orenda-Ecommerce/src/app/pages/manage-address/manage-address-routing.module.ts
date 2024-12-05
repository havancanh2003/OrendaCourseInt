import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinceComponent } from './province/province.component';
import { WardComponent } from './ward/ward.component';
import { DistrictComponent } from './district/district.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tỉnh',
    pathMatch: 'full',
  },
  {
    path: 'tỉnh',
    component: ProvinceComponent,
  },
  {
    path: 'huyện-thành-phố',
    component: DistrictComponent,
  },
  {
    path: 'xã-phường',
    component: WardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAddressRoutingModule {}
