import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { FormCreateUpdateProductComponent } from './form-create-update-product/form-create-update-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ProductPageComponent, FormCreateUpdateProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class ProductModule {}
