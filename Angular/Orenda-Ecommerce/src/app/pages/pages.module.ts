import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgModel } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, ProductPageComponent, LoginComponent],
  imports: [CommonModule, CoreModule, SharedModule, FormsModule],
  exports: [DashboardComponent, ProductPageComponent, LoginComponent],
})
export class PagesModule {}
