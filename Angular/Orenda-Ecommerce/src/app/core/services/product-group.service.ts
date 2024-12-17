import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductGroupService {
  _BASEURL: string = 'https://localhost:7227';

  constructor(private http: HttpClient) {}

  getProductGroup(): Observable<any> {
    const url = `${this._BASEURL}/api/product-group`;
    return this.http.get(url);
  }
  // getCategoryById(id: number): Category | null {
  //   const cate = this.categories.find((c) => c.categoryId === id);
  //   return cate ? cate : null;
  // }
}
