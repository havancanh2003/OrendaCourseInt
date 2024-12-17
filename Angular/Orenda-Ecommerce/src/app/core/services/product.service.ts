import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _BASEURL: string = 'https://localhost:7227';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    const url = `${this._BASEURL}/api/products`;
    return this.http.get(url);
  }
  getProductByFilter(
    page: number,
    productGroupId?: number,
    productName?: string,
    isActive?: boolean
  ): Observable<any> {
    const url = `${this._BASEURL}/api/products/filter`;
    let params = new HttpParams().set('page', page);

    if (productGroupId !== undefined && productGroupId !== null) {
      params = params.set('productGroupId', productGroupId);
    }
    if (productName) {
      params = params.set('productName', productName);
    }
    if (isActive !== undefined && isActive !== null) {
      params = params.set('isActve', isActive);
    }

    return this.http.post(url, {}, { params });
  }

  // getProductById(id: number): Product | null {
  //   const product = this.products.find((p) => p.productId === id);
  //   return product ? product : null;
  // }

  // getProductByCategoryId(id: number): Product[] {
  //   return this.products.filter((product) => product.categoryId === id);
  // }

  // addProduct(product: Product): boolean {
  //   console.log(product);
  //   const lengthProduct = this.products.length;
  //   product.productId =
  //     lengthProduct === 0 ? 1 : this.products[lengthProduct - 1].productId + 1;

  //   const validCategory = this.categoryService.getCategoryById(
  //     Number(product.categoryId)
  //   );
  //   console.log(validCategory);

  //   if (validCategory) {
  //     this.products = [...this.products, product];
  //     console.log('Product added:', product);
  //     return true;
  //   }

  //   return false;
  // }

  // updateProduct(productUpate: Product, productId: number): boolean {
  //   let product = this.getProductById(productId);
  //   if (product === null) return false;
  //   if (
  //     productUpate.categoryId <= 0 ||
  //     !this.categoryService.getCategoryById(Number(productUpate.categoryId))
  //   )
  //     return false;

  //   product.productName = productUpate.productName;
  //   product.categoryId = productUpate.categoryId;
  //   product.expiryDate = productUpate.expiryDate;
  //   product.productStock = productUpate.productStock;
  //   product.unitSold = productUpate.unitSold;

  //   return true;
  // }
  deleteProduct(id: number): Observable<any> {
    const url = `${this._BASEURL}/api/products/filter`;
    let params = new HttpParams().set('id', id);
    return this.http.post(url, {}, { params });
  }
}
