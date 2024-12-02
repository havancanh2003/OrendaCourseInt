import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  _BASEURL: string = 'http://test.nghiencuukhoahoc.com.vn';
  url = `${this._BASEURL}/api/master-data/select-data-source/get-combo-data-source`;

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any> {
    return this.http.post(this.url, { type: 1, cascader: '' });
  }

  getDistricts(provinceId: string): Observable<any> {
    return this.http.post(this.url, { type: 2, cascader: provinceId });
  }

  getWards(districtId: string): Observable<any> {
    return this.http.post(this.url, { type: 3, cascader: districtId });
  }
}
