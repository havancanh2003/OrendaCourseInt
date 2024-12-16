import { Component, OnInit } from '@angular/core';
import { Category, Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { formatDate } from '../../../helpers/helpers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isActiveCatogory: number = 0;
  isPopupVisible: boolean = false;
  productIdActive: number = 0;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.categories = this.categoryService.getCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        if (res) {
          this.products = res.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            quantity: p.quantity,
            productGroupId: p.productGroupId,
            isActive: p.isActive,
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.toastr.error('Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      },
    });
  }

  // getCategoryName(categoryId: number): string {
  //   const c = this.categoryService.getCategoryById(Number(categoryId));
  //   return c != null ? c.categoryName : '';
  // }

  // deleteProduct(productId: number) {
  //   if (productId <= 0) return;
  //   const isAccept = confirm('Bạn có chắc muốn xoá sản phẩm này không?');
  //   if (isAccept) {
  //     // this.productService.deleteProduct(productId);
  //     alert('Xoá thành công ');
  //     this.loadProducts();
  //   }
  // }

  // updateProduct(productId: number) {
  //   if (productId <= 0) return;
  //   this.productIdActive = productId;
  //   this.isPopupVisible = true;
  // }
  // addProduct() {
  //   this.productIdActive = 0;
  //   this.isPopupVisible = true;
  // }

  outputAction(result: boolean) {
    if (result) {
      this.loadProducts();
    }
    this.isPopupVisible = false;
  }
  // getFormattedExpiryDate(date: Date): string {
  //   return formatDate(date);
  // }
  // ///
  // clearSelectedCategory() {
  //   this.isActiveCatogory = 0;
  //   this.loadProducts();
  // }
  // selectedCategory(categoryId: number, i: number) {
  //   this.isActiveCatogory = i;
  //   this.products = this.productService.getProductByCategoryId(categoryId);
  // }
}
