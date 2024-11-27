export interface Product {
  productId: number;
  productName: string;
  unitSold: number;
  productStock: number;
  expiryDate: Date;
  categoryId: number;
}
export interface ProductModelCreateAndUpdate {
  product: Product;
  isResult: boolean;
}
export interface Category {
  categoryId: number;
  categoryName: string;
}
