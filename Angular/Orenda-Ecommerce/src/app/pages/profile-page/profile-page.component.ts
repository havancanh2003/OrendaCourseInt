import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserUpdate } from '../../core/models/user.model';
import { concatenate, formatDateToYYYYMMDD } from '../../helpers/helpers';
import { addressInfor } from '../../core/models/address.model';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  userForm!: UntypedFormGroup;
  isPopupAddressVisible: boolean = false;
  idInfoAddress: addressInfor = {
    districtCode: '',
    provinceCode: '',
    wardCode: '',
  };

  constructor(private auth: AuthService, private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchUserInfo();
  }

  // validator form
  initForm(): void {
    this.userForm = this.fb.group({
      id: [''],
      userName: ['', [Validators.required]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^\\d{10,12}$')],
      ],
      birthDay: [''],
      location: [''],
      gender: [''],
      imgAvatar: [''],
      provincesId: [''],
      provincesName: [''],
      districtsId: [''],
      districtsName: [''],
      wardsId: [''],
      wardsName: [''],
      role: [''],
    });
  }

  // call data apply form
  fetchUserInfo(): void {
    this.auth.getInfo().subscribe((res: any) => {
      if (res) {
        const data = res.userSession;
        if (data) {
          console.log(data);
          const location = concatenate(data.tenXa, data.tenHuyen, data.tenTinh);

          this.userForm.patchValue({
            id: data.id,
            userName: data.userName?.trim(),
            fullName: data.fullName?.trim(),
            birthDay: formatDateToYYYYMMDD(data.ngaySinh),
            location: location,
            email: data.email?.trim(),
            phoneNumber: data.phoneNumber?.trim(),
            gender: data.gioiTinh,
            imgAvatar: data.imgAvatar,
            role: data.role ?? 'customer',
            provincesId: data.maTinh,
            provincesName: data.tenTinh,
            districtsId: data.maHuyen,
            districtsName: data.tenHuyen,
            wardsId: data.maXa,
            wardsName: data.tenXa,
          });
        }
      }
    });
  }

  getFormData(): UserUpdate {
    const data = { ...this.userForm.value };
    const userUpdate: UserUpdate = {
      userId: data.id,
      email: data.email?.trim(),
      name: data.fullName?.trim(),
      phoneNumber: data.phoneNumber?.trim(),
      ngaySinh: new Date(data.birthDay),
      gioiTinh: data.gender,
      diaChi: data.location,
      maTinh: data.provincesId,
      maHuyen: data.districtsId,
      maXa: data.wardsId,
    };
    return userUpdate;
  }

  changeAddress() {
    this.idInfoAddress = {
      provinceCode: this.userForm.controls['provincesId'].value,
      districtCode: this.userForm.controls['districtsId'].value,
      wardCode: this.userForm.controls['wardsId'].value,
    };
    this.isPopupAddressVisible = true;
  }

  showChangedAddress(addressChanged?: addressInfor) {
    if (addressChanged != null || addressChanged != undefined) {
      this.userForm.controls['provincesId'].setValue(
        addressChanged.provinceCode
      );
      this.userForm.controls['districtsId'].setValue(
        addressChanged.districtCode
      );
      this.userForm.controls['wardsId'].setValue(addressChanged.wardCode);

      this.userForm.controls['location'].setValue(
        addressChanged.fullAddress != undefined
          ? addressChanged.fullAddress
          : ''
      );
    }
    this.isPopupAddressVisible = false;
  }

  onSubmitUpdateInfo() {
    const userUpdate = this.getFormData();
    // console.log(userUpdate);
    // return;
    this.auth.updateUser(userUpdate).subscribe((res: any) => {
      if (res) {
        alert('Update thành công');
        window.location.reload();
      }
    });
  }
}
