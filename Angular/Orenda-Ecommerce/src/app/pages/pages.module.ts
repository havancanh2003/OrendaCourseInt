import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, ProductPageComponent],
  imports: [CommonModule, CoreModule, SharedModule],
  exports: [DashboardComponent, ProductPageComponent],
})
export class PagesModule {}
