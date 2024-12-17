import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ProductGroup,
  ProductModelCreateAndUpdate,
} from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
// import { CategoryService } from '../../../core/services/product-group.service';
import { formatDate } from '../../../helpers/helpers';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGroupService } from '../../../core/services/product-group.service';

@Component({
  selector: 'app-form-create-update-product',
  templateUrl: './form-create-update-product.component.html',
  styleUrl: './form-create-update-product.component.scss',
})
export class FormCreateUpdateProductComponent implements OnInit {
  formProduct!: UntypedFormGroup;
  id!: string;
  productGroups!: ProductGroup[];
  titleForm: string = '';
  constructor(
    private toastr: ToastrService,
    private productGroupService: ProductGroupService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'] || null;
      if (this.id) {
        this.titleForm = 'Form Update Product';
      } else {
        this.titleForm = 'Form Add Product';
      }
    });
  }
  initForm(): void {
    this.formProduct = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      quantity: [null, [Validators.required, Validators.min(0)]],
      productGroupId: [null, Validators.required],
      isActive: [true],
    });
  }
  submitForm() {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched(); // Đánh dấu tất cả các trường để hiển thị lỗi
      return;
    }
    // Xử lý khi form hợp lệ
    console.log(this.formProduct.value);
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
  loadDataProduct(): void {}
  // @Input() id: number = 0;
  // @Output() isSubmit = new EventEmitter<boolean>();
  // expiryDateAsString: string = '';
  // pForm: ProductModelCreateAndUpdate = {
  //   product: {
  //     productId: 0,
  //     productName: '',
  //     unitSold: 0,
  //     productStock: 0,
  //     expiryDate: new Date(),
  //     categoryId: 0,
  //   },
  //   isResult: false,
  // };
  // categories: Category[] = [];
  // constructor(
  //   private productService: ProductService,
  //   private categoryService: CategoryService
  // ) {}
  // ngOnInit(): void {
  //   if (this.id != 0) {
  //     const product = this.productService.getProductById(this.id);
  //     if (product) {
  //       this.pForm.product.categoryId = product.categoryId;
  //       this.pForm.product.productName = product.productName;
  //       this.pForm.product.productStock = product.productStock;
  //       this.pForm.product.unitSold = product.unitSold;
  //       this.pForm.product.expiryDate = product.expiryDate;
  //       this.pForm.product.productId = product.productId;
  //       this.expiryDateAsString = formatDate(this.pForm.product.expiryDate);
  //     }
  //     this.titleForm = 'Form Update Product';
  //   } else {
  //     this.titleForm = 'Form Add Product';
  //   }
  //   this.categories = this.categoryService.getCategories();
  // }
  // onDateChange(event: Event): void {
  //     const input = event.target as HTMLInputElement;
  //     if (input.value) {
  //       this.pForm.product.expiryDate = new Date(input.value);
  //     }
  //   }
  //   cancelForm() {
  //     this.pForm.isResult = false;
  //     this.isSubmit.emit(false);
  //   }
  //   submitForm() {
  //     console.log(this.id);
  //     if (this.id !== 0) {
  //       const result = this.productService.updateProduct(
  //         this.pForm.product,
  //         this.id
  //       );
  //       console.log(result);
  //       if (result) this.isSubmit.emit(true);
  //     } else {
  //       const result = this.productService.addProduct(this.pForm.product);
  //       if (result) this.isSubmit.emit(true);
  //     }
  //   }
}
