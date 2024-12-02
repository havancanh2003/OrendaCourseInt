import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { FormCreateUpdateProductComponent } from './form-create-update-product/form-create-update-product.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductPageComponent, FormCreateUpdateProductComponent],
  imports: [CommonModule, FormsModule],
  exports: [ProductPageComponent, FormCreateUpdateProductComponent],
})
export class ProductModule {}
