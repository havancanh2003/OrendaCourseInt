import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductPageComponent } from './product-page/product-page.component';

@NgModule({
  declarations: [DashboardComponent, ProductPageComponent],
  imports: [CommonModule],
  exports: [DashboardComponent, ProductPageComponent],
})
export class PagesModule {}
