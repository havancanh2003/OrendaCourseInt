import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  districtDetailModel,
  provinceDetailModel,
  resultAddressModel,
  wardDetailModel,
} from '../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class ManageAddressService {
  _BASEURL: string = 'http://test.nghiencuukhoahoc.com.vn';
  constructor(private http: HttpClient) {}

  getListProvinces(
    status?: boolean,
    pageActive?: number,
    textSearch?: string
  ): Observable<any> {
    const url = `${this._BASEURL}/api/master-data/tinh/get-list`;
    const limit = 10;
    const body = {
      filter: textSearch ? textSearch.trim() : null,
      isActive: status,
      skipCount: pageActive && pageActive > 0 ? (pageActive - 1) * limit : 0,
      maxResultCount: limit,
    };
    return this.http.post(url, body);
  }
  getAllProvinces(): Observable<any> {
    const url = `${this._BASEURL}/api/master-data/tinh/get-list`;
    const body = {
      filter: null,
      isActive: null,
      skipCount: 0,
      maxResultCount: 1000,
    };
    return this.http.post(url, body);
  }

  getListDistrictsByProvinceCode(paramProvinceCode: string): Observable<any> {
    const body = {
      filter: null,
      isActive: null,
      skipCount: 0,
      maTinh: paramProvinceCode,
      maxResultCount: 1000,
    };
    const url = `${this._BASEURL}/api/master-data/huyen/get-list`;
    return this.http.post(url, body);
  }
  getDataDistrictsFilter(
    status?: boolean,
    pageActive?: number,
    textSearch?: string,
    paramProvinceCode?: string
  ): Observable<any> {
    const limit = 10;
    const body = {
      filter: textSearch,
      isActive: status,
      skipCount: pageActive && pageActive > 0 ? (pageActive - 1) * limit : 0,
      maTinh: paramProvinceCode,
      maxResultCount: limit,
    };
    const url = `${this._BASEURL}/api/master-data/huyen/get-list`;
    return this.http.post(url, body);
  }

  getListWards(
    status?: boolean,
    pageActive?: number,
    txtSearch?: string,
    paramProvinceCode?: string,
    paramDistrictCode?: string
  ): Observable<any> {
    const url = `${this._BASEURL}/api/master-data/xa/get-list`;
    const limit = 10;
    const body = {
      filter: txtSearch,
      isActive: status,
      skipCount: pageActive && pageActive > 0 ? (pageActive - 1) * limit : 0,
      maTinh: paramProvinceCode,
      maHuyen: paramDistrictCode,
      maxResultCount: limit,
    };
    return this.http.post(url, body);
  }

  updateOrCreateProvince(
    p: provinceDetailModel
  ): Observable<resultAddressModel> {
    const url = `${this._BASEURL}/api/master-data/tinh/create-or-update`;
    const body = {
      maTinh: p.provinceCode,
      tenTinh: p.provinceName,
      cap: p.cap,
      isActive: p.isActive,
      id: p.id,
    };
    return this.http.post<resultAddressModel>(url, body);
  }

  updateOrCreateDistrict(
    d: districtDetailModel
  ): Observable<resultAddressModel> {
    const url = `${this._BASEURL}/api/master-data/huyen/create-or-update`;
    const body = {
      maTinh: d.provinceCode,
      tenHuyen: d.districtName,
      maHuyen: d.districtCode,
      cap: d.cap,
      isActive: d.isActive,
      id: d.id,
    };
    return this.http.post<resultAddressModel>(url, body);
  }

  updateOrCreateWard(w: wardDetailModel): Observable<resultAddressModel> {
    const url = `${this._BASEURL}/api/master-data/xa/create-or-update`;
    const body = {
      maTinh: w.provinceCode,
      maHuyen: w.districtCode,
      maXa: w.wardCode,
      teXa: w.wardName,
      cap: w.cap,
      isXaNgheo: w.isXaNgheo,
      isXaMienNui: w.isXaMienNui,
      isXaDanToc: w.isXaDanToc,
      isThanhThi: w.isThanhThi,
      isActive: w.isActive,
      id: w.id,
    };
    return this.http.post<resultAddressModel>(url, body);
  }

  deleteProvinceById(id: number): Observable<any> {
    const url = `${this._BASEURL}/api/master-data/tinh/delete-common-result`;
    return this.http.post(`${url}/${id}`, null);
  }
  deleteDistrictById(id: number): Observable<any> {
    const url = `${this._BASEURL}/api/master-data/huyen/delete-common-result`;
    return this.http.post(`${url}/${id}`, null);
  }
  deleteWardById(id: number): Observable<any> {
    const url = `${this._BASEURL}/api/master-data/xa/delete-common-result`;
    return this.http.post(`${url}/${id}`, null);
  }
}
