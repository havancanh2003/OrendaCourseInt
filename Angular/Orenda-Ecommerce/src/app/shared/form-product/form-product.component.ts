import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Category,
  ProductModelCreateAndUpdate,
} from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { formatDate } from '../../helpers/helpers';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss',
})
export class FormProductComponent implements OnInit {
  @Input() id: number = 0;
  @Output() isSubmit = new EventEmitter<boolean>();
  titleForm: string = '';
  expiryDateAsString: string = '';
  pForm: ProductModelCreateAndUpdate = {
    product: {
      productId: 0,
      productName: '',
      unitSold: 0,
      productStock: 0,
      expiryDate: new Date(),
      categoryId: 0,
    },
    isResult: false,
  };
  categories: Category[] = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    if (this.id != 0) {
      const product = this.productService.getProductById(this.id);
      if (product) {
        this.pForm.product.categoryId = product.categoryId;
        this.pForm.product.productName = product.productName;
        this.pForm.product.productStock = product.productStock;
        this.pForm.product.unitSold = product.unitSold;
        this.pForm.product.expiryDate = product.expiryDate;
        this.pForm.product.productId = product.productId;
        this.expiryDateAsString = formatDate(this.pForm.product.expiryDate);
      }
      this.titleForm = 'Form Update Product';
    } else {
      this.titleForm = 'Form Add Product';
    }
    this.categories = this.categoryService.getCategories();
  }
  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.pForm.product.expiryDate = new Date(input.value);
    }
  }
  cancelForm() {
    this.pForm.isResult = false;
    this.isSubmit.emit(false);
  }
  submitForm() {
    console.log(this.id);
    if (this.id !== 0) {
      const result = this.productService.updateProduct(
        this.pForm.product,
        this.id
      );
      console.log(result);
      if (result) this.isSubmit.emit(true);
    } else {
      const result = this.productService.addProduct(this.pForm.product);
      if (result) this.isSubmit.emit(true);
    }
  }
}
