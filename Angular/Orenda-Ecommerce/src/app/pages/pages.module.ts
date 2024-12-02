import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgModel } from '@angular/forms';
import { ProductModule } from './product/product.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FormAddressComponent } from './profile-page/form-address/form-address.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    ProfilePageComponent,
    FormAddressComponent,
  ],
  imports: [CommonModule, CoreModule, FormsModule, PagesRoutingModule],
  exports: [
    DashboardComponent,
    LoginComponent,
    ProfilePageComponent,
    //ProductModule,
    NgModel,
  ],
})
export class PagesModule {}
