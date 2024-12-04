import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAddressRoutingModule } from './manage-address-routing.module';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { AddressInfoComponent } from './address-info/address-info.component';
import { FormCreateUpdateAddressComponent } from './form-create-update-address/form-create-update-address.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManageAddressComponent,
    AddressInfoComponent,
    FormCreateUpdateAddressComponent,
  ],
  imports: [CommonModule, ManageAddressRoutingModule, FormsModule],
  exports: [AddressInfoComponent, FormCreateUpdateAddressComponent],
})
export class ManageAddressModule {}
