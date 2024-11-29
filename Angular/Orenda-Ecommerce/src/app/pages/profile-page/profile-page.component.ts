import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { formatDate } from '../../helpers/helpers';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  infoUser: User = {
    id: '',
    userName: '',
    fullName: '',
    birthDay: new Date(),
    location: '',
    email: '',
    phoneNumber: '',
    gender: false,
    imgAvatar: '',
    role: 'customer',
  };

  dateAsString: string = '';

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.getInfo().subscribe((res: any) => {
      if (res) {
        const data = res.userSession;
        if (data) {
          console.log(data);
          this.infoUser = {
            id: data.id,
            userName: data.userName,
            fullName: data.fullName,
            birthDay: data.ngaySinh,
            location: data.address,
            email: data.email,
            phoneNumber: data.phoneNumber,
            gender: data.gioiTinh,
            imgAvatar: '',
            role: data.roleLevel ?? 'customer',
          };
          this.dateAsString = formatDate(new Date(this.infoUser.birthDay));
        }
      }
    });
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.infoUser.birthDay = new Date(input.value);
    }
  }

  onSubmitUpdateInfo() {
    this.auth.updateUser(this.infoUser).subscribe((res: any) => {
      if (res) {
        alert('Update thành công');
        const data = res.userSession;
        if (data) {
          console.log(data);
          this.infoUser = {
            id: data.id,
            userName: data.userName,
            fullName: data.fullName,
            birthDay: data.ngaySinh,
            location: data.address,
            email: data.email,
            phoneNumber: data.phoneNumber,
            gender: data.gioiTinh,
            imgAvatar: '',
            role: data.roleLevel ?? 'customer',
          };
          this.dateAsString = formatDate(new Date(this.infoUser.birthDay));
        }
      }
    });
  }
}
