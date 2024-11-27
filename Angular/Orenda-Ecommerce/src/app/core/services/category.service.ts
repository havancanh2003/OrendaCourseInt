import { Injectable } from '@angular/core';
import { Category } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [
    { categoryId: 1, categoryName: 'Electronics' },
    { categoryId: 2, categoryName: 'Books' },
    { categoryId: 3, categoryName: 'Clothing' },
    { categoryId: 4, categoryName: 'Home Appliances' },
    { categoryId: 5, categoryName: 'Toys' },
  ];
  constructor() {}

  getCategories(): Category[] {
    return this.categories;
  }
  getCategoryById(id: number): Category | null {
    const cate = this.categories.find((c) => c.categoryId === id);
    return cate ? cate : null;
  }
}
