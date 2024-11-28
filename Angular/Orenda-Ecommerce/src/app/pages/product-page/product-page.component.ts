import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Category, Product } from '../../core/models/product.model';
import { CategoryService } from '../../core/services/category.service';
import { formatDate } from '../../helpers/helpers';

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
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.categories = this.categoryService.getCategories();
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  getCategoryName(categoryId: number): string {
    const c = this.categoryService.getCategoryById(Number(categoryId));
    return c != null ? c.categoryName : '';
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
  getFormattedExpiryDate(date: Date): string {
    return formatDate(date);
  }
  ///
  clearSelectedCategory() {
    this.isActiveCatogory = 0;
    this.loadProducts();
  }
  selectedCategory(categoryId: number, i: number) {
    this.isActiveCatogory = i;
    this.products = this.productService.getProductByCategoryId(categoryId);
  }
}
