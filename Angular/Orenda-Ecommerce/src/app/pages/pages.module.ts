import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [DashboardComponent, LoginComponent],
  imports: [CommonModule, CoreModule, FormsModule, ProductModule],
  exports: [DashboardComponent, LoginComponent, ProductModule],
})
export class PagesModule {}
