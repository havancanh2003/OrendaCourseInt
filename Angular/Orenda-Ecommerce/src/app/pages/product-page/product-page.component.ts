import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];
  isPopupVisible: boolean = false;
  productIdActive: number = 0;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  getCategoryName(categoryId: number): string {
    const c = this.categoryService.getCategoryById(Number(categoryId));
    return c != null ? c.categoryName : '';
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`;
    return formattedDate;
  }
  deleteProduct(productId: number) {
    if (productId <= 0) return;
    const isAccept = confirm('Bạn có chắc muốn xoá sản phẩm này không?');
    if (isAccept) {
      this.productService.deleteProduct(productId);
      alert('Xoá thành công ');
      this.loadProducts();
    }
  }

  updateProduct(productId: number) {
    if (productId <= 0) return;
    this.productIdActive = productId;
    this.isPopupVisible = true;
  }
  addProduct() {
    this.productIdActive = 0;
    this.isPopupVisible = true;
  }

  outputAction(result: boolean) {
    if (result) {
      this.loadProducts();
    }
    this.isPopupVisible = false;
  }
}
