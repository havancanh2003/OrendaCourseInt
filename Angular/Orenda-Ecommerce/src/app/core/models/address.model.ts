export interface addressInfor {
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  fullAddress?: string;
}

export interface addressItem {
  items: [];
  totalCount: number;
  currentType: string;
  title: string;
}
export enum AddressType {
  Province = 'Province',
  District = 'District',
  Ward = 'Ward',
}
export interface addModel {
  cap: string;
  id: number | null;
  isActive: boolean;
}

export interface provinceModel extends addModel {
  provinceCode: string;
  provinceName: string;
}
export interface districtModel extends addModel {
  provinceCode: string;
  districtCode: string;
  districtName: string;
}
export interface wardModel extends addModel {
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  wardName: string;
}
export interface provinceDetailModel extends provinceModel {
  strVungSinhThai: string | null;
  strVungDiaLy: string | null;
  strVungMien: string | null;
  vungMien: string | null;
  vungDiaLy: string | null;
  vungSinhThai: string | null;
}
export interface districtDetailModel extends districtModel {}
export interface wardDetailModel extends wardModel {
  isXaNgheo: boolean | null;
  isXaMienNui: boolean | null;
  isXaDanToc: boolean | null;
  isThanhThi: boolean | null;
}

export interface resultAddressModel {
  dataResult: {};
  returnValueAddition: null;
  isSuccessful: boolean;
  errorCode: string;
  errorMessage: string;
  dataError: any;
}
