import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormProductComponent } from './form-product/form-product.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormProductComponent],
  imports: [CommonModule, FormsModule],
  exports: [FormProductComponent],
})
export class SharedModule {}
