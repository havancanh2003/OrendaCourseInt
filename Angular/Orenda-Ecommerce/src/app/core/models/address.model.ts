export interface addressDetail {
  code: string;
  name: string;
}
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
  id: number;
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
export interface provinceDetailModel extends provinceModel {}
