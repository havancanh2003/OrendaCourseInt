export interface Product {
  id: Number;
  name: string;
  price: Number;
  quantity: Number;
  productGroupId: Number;
  isActive: boolean;
}
export interface ProductModelCreateAndUpdate {
  product: Product;
  isResult: boolean;
}
export interface Category {
  categoryId: number;
  categoryName: string;
}
