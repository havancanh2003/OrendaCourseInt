import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FormAddressComponent } from './profile-page/form-address/form-address.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ManageAddressModule } from './manage-address/manage-address.module';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    ProfilePageComponent,
    FormAddressComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    ManageAddressModule,
  ],
  exports: [
    DashboardComponent,
    LoginComponent,
    ProfilePageComponent,
    //ProductModule,
    NgModel,
  ],
})
export class PagesModule {}
