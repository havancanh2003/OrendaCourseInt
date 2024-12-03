import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageAddressService {
  _BASEURL: string = 'http://test.nghiencuukhoahoc.com.vn';
  constructor(private http: HttpClient) {}

  getListProvinces(): Observable<any> {
    const url = `${this._BASEURL}/api/master-data/tinh/get-list`;
    const body = {
      filter: null,
      isActive: null,
      skipCount: 0,
      maxResultCount: 10,
    };
    return this.http.post(url, body);
  }

  getListDistricts(paramProvinceCode: string): Observable<any> {
    const body = {
      filter: null,
      isActive: null,
      skipCount: 0,
      maTinh: paramProvinceCode,
      maxResultCount: 10,
    };
    const url = `${this._BASEURL}/api/master-data/huyen/get-list`;
    return this.http.post(url, body);
  }

  getListWards(
    paramProvinceCode: string,
    paramDistrictCode: string
  ): Observable<any> {
    const url = `${this._BASEURL}/api/master-data/xa/get-list`;
    const body = {
      filter: null,
      isActive: null,
      skipCount: 0,
      maTinh: paramProvinceCode,
      maHuyen: paramDistrictCode,
      maxResultCount: 10,
    };
    return this.http.post(url, body);
  }
}
