import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { FormCreateUpdateProductComponent } from './form-create-update-product/form-create-update-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductPageComponent,
      },
      {
        path: 'create',
        component: FormCreateUpdateProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
