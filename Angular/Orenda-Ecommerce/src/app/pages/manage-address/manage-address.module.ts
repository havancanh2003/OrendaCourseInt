import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAddressRoutingModule } from './manage-address-routing.module';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { AddressInfoComponent } from './address-info/address-info.component';

@NgModule({
  declarations: [ManageAddressComponent, AddressInfoComponent],
  imports: [CommonModule, ManageAddressRoutingModule],
  exports: [AddressInfoComponent],
})
export class ManageAddressModule {}
