import { Component, OnInit } from '@angular/core';
import { ProductGroup, Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { ProductGroupService } from '../../../core/services/product-group.service';

import { formatDate } from '../../../helpers/helpers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  products: Product[] = []; // danh sách sản phẩm
  productGroups: ProductGroup[] = []; // danh sách loại sản phẩm

  currentPage: number = 1; // page mặc định
  itemsPerPage: number = 10; //
  totalItems: number = 0; //
  textSearch!: string; //
  itemSelectedStatus!: boolean; // trạng thái sản phẩm
  isActiveProductG!: number;

  productGroupId!: number | undefined;
  productIdActive!: number;
  isPopupVisible: boolean = false; // biến quản lí form cập nhật và tạo mới sản phẩm
  constructor(
    private productService: ProductService,
    private productGroupService: ProductGroupService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.productGroupId);
    this.loadProducts();
    this.loadProductGroup();
  }

  loadProductGroup(): void {
    this.productGroupService.getProductGroup().subscribe({
      next: (res: any) => {
        if (res) {
          this.productGroups = res.map((pg: any) => ({
            id: pg.id,
            name: pg.name,
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.toastr.error('Đã xảy ra lỗi trong quá trình lấy dữ liệu');
      },
    });
  }

  loadProducts(): void {
    this.productService
      .getProductByFilter(
        this.currentPage,
        this.productGroupId,
        this.textSearch,
        this.itemSelectedStatus
      )
      .subscribe({
        next: (res: { items: any[]; totalRecords: number }) => {
          if (res && res.items) {
            this.products = res.items.map((p: any) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              quantity: p.quantity,
              productGroupId: p.productGroupId,
              isActive: p.isActive,
            }));
            this.totalItems = res.totalRecords;
          }
        },
        error: (err) => {
          console.error('Error fetching products:', err);
          this.toastr.error('Đã xảy ra lỗi trong quá trình lấy dữ liệu');
        },
      });
  }

  selectedStatus() {
    this.loadProducts();
  }
  updateOrCreateAddress() {}
  searchNameProduct() {
    this.currentPage = 1;
    this.loadProducts();
  }

  getNameProductG(id: number): string {
    const c = this.productGroups.find((pg) => pg.id === id);
    return c != null ? c.name : '';
  }

  deleteProduct(productId: number) {
    if (productId <= 0) return;
    const isAccept = confirm('Bạn có chắc muốn xoá sản phẩm này không?');
    if (isAccept) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error fetching products:', err);
          this.toastr.error('Đã xảy ra lỗi trong quá trình xoá dữ liệu');
        },
      });
    }
  }

  // updateProduct(productId: number) {
  //   if (productId <= 0) return;
  //   this.productIdActive = productId;
  //   this.isPopupVisible = true;
  // }
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
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }
  clearSelectedCategory() {
    this.isActiveProductG = 0;
    this.productGroupId = undefined;
    this.currentPage = 1;
    this.loadProducts();
  }
  selectedProductGroup(pgId: number, i: number) {
    this.isActiveProductG = i;
    this.productGroupId = pgId;
    this.currentPage = 1;
    this.loadProducts();
  }
}
