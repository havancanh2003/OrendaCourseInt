export interface User {
  id: string;
  userName: string;
  fullName: string;
  birthDay: Date;
  location: string;
  email: string;
  phoneNumber: string;
  imgAvatar?: string;
  gender: boolean;
  role: string;
  provincesId: string;
  districtsId: string;
  provincesName: string;
  districtsName: string;
  wardsId: string;
  wardsName: string;
}
export interface UserUpdate {
  userId: string;
  email: string;
  name: string;
  avatarDocumentId?: string;
  phoneNumber: string;
  ngaySinh: Date;
  gioiTinh: boolean;
  diaChi: string;
  maTinh: string;
  maHuyen: string;
  maXa: string;
}
