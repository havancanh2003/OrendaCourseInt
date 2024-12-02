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
}
