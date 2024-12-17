export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  productGroupId: number;
  isActive: boolean;
}
export interface ProductModelCreateAndUpdate {
  product: Product;
  isResult: boolean;
}
export interface ProductGroup {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}
