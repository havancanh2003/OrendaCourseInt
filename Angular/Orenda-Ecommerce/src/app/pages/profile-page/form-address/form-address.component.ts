import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddressService } from '../../../core/services/address.service';
import { addressInfor } from '../../../core/models/address.model';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrl: './form-address.component.scss',
})
export class FormAddressComponent implements OnInit {
  @Input() currentAddress: addressInfor = {
    provinceCode: '',
    districtCode: '',
    wardCode: '',
  };
  @Output() addressChange = new EventEmitter<addressInfor>();

  TYPE_PROVINCE = 'province';
  TYPE_DISTRICT = 'district';
  TYPE_WARD = 'ward';

  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  selectedProvince: string = '';
  selectedDistrict: string = '';
  selectedWard: string = '';
  detailedAddress: string = '';

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    console.log(this.currentAddress);
    this.getProvinces();
  }

  // Lấy danh sách tỉnh
  getProvinces() {
    this.addressService.getProvinces().subscribe((data) => {
      this.provinces = data;
      if (this.currentAddress) {
        this.selectedProvince = this.currentAddress.provinceCode;
        this.onProvinceChange();
      }
    });
  }

  onProvinceChange() {
    this.addressService
      .getDistricts(this.selectedProvince)
      .subscribe((data) => {
        this.districts = data;
        if (this.currentAddress) {
          this.selectedDistrict = this.currentAddress.districtCode;
          this.onDistrictChange();
        }
      });
  }

  onDistrictChange() {
    this.addressService.getWards(this.selectedDistrict).subscribe((data) => {
      this.wards = data;
      if (this.currentAddress) {
        this.selectedWard = this.currentAddress.wardCode;
      }
    });
  }

  closeModal() {
    this.addressChange.emit();
  }
  saveAddress() {
    const addressChanged: addressInfor = {
      provinceCode: this.selectedProvince,
      districtCode: this.selectedDistrict,
      wardCode: this.selectedWard,
      fullAddress:
        this.getNameAddressByCode(this.selectedWard, this.TYPE_WARD) +
        ' - ' +
        this.getNameAddressByCode(this.selectedProvince, this.TYPE_PROVINCE) +
        ' - ' +
        this.getNameAddressByCode(this.selectedDistrict, this.TYPE_DISTRICT),
    };

    this.addressChange.emit(addressChanged);
  }
  getNameAddressByCode(code: string, typeGet: string): string {
    let nameFilter = '';

    switch (typeGet) {
      case this.TYPE_PROVINCE:
        const province = this.provinces.find((a) => a.value === code);
        if (province) {
          nameFilter = province.displayText;
        }
        break;

      case this.TYPE_DISTRICT:
        const district = this.districts.find((a) => a.value === code);
        if (district) {
          nameFilter = district.displayText;
        }
        break;

      case this.TYPE_WARD:
        const ward = this.wards.find((a) => a.value === code);
        if (ward) {
          nameFilter = ward.displayText;
        }
        break;

      default:
        console.warn('Loại địa chỉ không hợp lệ:', typeGet);
        break;
    }

    return nameFilter;
  }
}
