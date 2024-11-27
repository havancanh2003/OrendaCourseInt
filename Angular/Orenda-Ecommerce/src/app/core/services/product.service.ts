import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      productId: 1,
      productName: 'Smartphone',
      unitSold: 500,
      productStock: 50,
      expiryDate: new Date(2025, 0, 15),
      categoryId: 1,
    },
    // {
    //   productId: 2,
    //   productName: 'Laptop',
    //   unitSold: 200,
    //   productStock: 30,
    //   expiryDate: new Date(2026, 4, 20),
    //   categoryId: 1,
    // },
    // {
    //   productId: 3,
    //   productName: 'Refrigerator',
    //   unitSold: 150,
    //   productStock: 20,
    //   expiryDate: new Date(2030, 6, 10),
    //   categoryId: 4,
    // },
    // {
    //   productId: 4,
    //   productName: 'Washing Machine',
    //   unitSold: 100,
    //   productStock: 15,
    //   expiryDate: new Date(2031, 3, 18),
    //   categoryId: 4,
    // },
    // {
    //   productId: 5,
    //   productName: 'Novel Book',
    //   unitSold: 800,
    //   productStock: 100,
    //   expiryDate: new Date(2030, 11, 31),
    //   categoryId: 2,
    // },
    // {
    //   productId: 6,
    //   productName: 'Children Toy',
    //   unitSold: 300,
    //   productStock: 40,
    //   expiryDate: new Date(2030, 9, 22),
    //   categoryId: 5,
    // },
    // {
    //   productId: 7,
    //   productName: 'T-Shirt',
    //   unitSold: 700,
    //   productStock: 60,
    //   expiryDate: new Date(2030, 2, 10),
    //   categoryId: 3,
    // },
    // {
    //   productId: 8,
    //   productName: 'Microwave',
    //   unitSold: 120,
    //   productStock: 25,
    //   expiryDate: new Date(2030, 7, 15),
    //   categoryId: 4,
    // },
    // {
    //   productId: 9,
    //   productName: 'Tablet',
    //   unitSold: 250,
    //   productStock: 35,
    //   expiryDate: new Date(2027, 5, 5),
    //   categoryId: 1,
    // },
    // {
    //   productId: 10,
    //   productName: 'Jeans',
    //   unitSold: 400,
    //   productStock: 70,
    //   expiryDate: new Date(2030, 8, 28),
    //   categoryId: 3,
    // },
  ];
  constructor(private categoryService: CategoryService) {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | null {
    const product = this.products.find((p) => p.productId === id);
    return product ? product : null;
  }

  addProduct(product: Product): boolean {
    console.log(product);
    const lengthProduct = this.products.length;
    product.productId =
      lengthProduct === 0 ? 1 : this.products[lengthProduct - 1].productId + 1;

    const validCategory = this.categoryService.getCategoryById(
      Number(product.categoryId)
    );
    console.log(validCategory);

    if (validCategory) {
      this.products = [...this.products, product];
      console.log('Product added:', product);
      return true;
    }

    return false;
  }

  updateProduct(productUpate: Product, productId: number): boolean {
    let product = this.getProductById(productId);
    if (product === null) return false;
    if (
      productUpate.categoryId <= 0 ||
      !this.categoryService.getCategoryById(Number(productUpate.categoryId))
    )
      return false;

    product.productName = productUpate.productName;
    product.categoryId = productUpate.categoryId;
    product.expiryDate = productUpate.expiryDate;
    product.productStock = productUpate.productStock;
    product.unitSold = productUpate.unitSold;

    return true;
  }
  deleteProduct(id: number): void {
    this.products = this.products.filter((p) => p.productId !== id);
  }
}
