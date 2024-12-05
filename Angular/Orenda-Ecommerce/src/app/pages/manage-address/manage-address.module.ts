import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAddressRoutingModule } from './manage-address-routing.module';
import { FormCreateUpdateAddressComponent } from './form-create-update-address/form-create-update-address.component';
import { FormsModule } from '@angular/forms';
import { ProvinceComponent } from './province/province.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { WardComponent } from './ward/ward.component';
import { DistrictComponent } from './district/district.component';

@NgModule({
  declarations: [
    FormCreateUpdateAddressComponent,
    ProvinceComponent,
    WardComponent,
    DistrictComponent,
  ],
  imports: [
    CommonModule,
    ManageAddressRoutingModule,
    FormsModule,
    NgxPaginationModule,
  ],
  exports: [FormCreateUpdateAddressComponent],
})
export class ManageAddressModule {}
