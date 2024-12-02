import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { FormCreateUpdateProductComponent } from './form-create-update-product/form-create-update-product.component';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [ProductPageComponent, FormCreateUpdateProductComponent],
  imports: [CommonModule, FormsModule, ProductRoutingModule],
  exports: [],
})
export class ProductModule {}
