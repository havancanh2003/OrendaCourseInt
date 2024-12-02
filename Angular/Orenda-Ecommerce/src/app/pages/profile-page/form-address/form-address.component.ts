import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { AddressService } from '../../../core/services/address.service';
import { cutConcatenate } from '../../../helpers/helpers';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrl: './form-address.component.scss',
})
export class FormAddressComponent implements OnInit {
  @Input() currentAddress: any;
  @Output() addressChange = new EventEmitter<{}>();

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
        this.selectedProvince = this.currentAddress.provinceId;
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
          this.selectedDistrict = this.currentAddress.districtId;
          this.onDistrictChange();
        }
      });
  }

  onDistrictChange() {
    this.addressService.getWards(this.selectedDistrict).subscribe((data) => {
      this.wards = data;
      if (this.currentAddress) {
        this.selectedWard = this.currentAddress.wardId;
      }
    });
  }

  closeModal() {
    this.addressChange.emit({});
  }
  saveAddress() {
    const addressChanged = {
      selectedProvince: this.selectedProvince,
      selectedDistrict: this.selectedDistrict,
      selectedWard: this.selectedWard,
    };
  }
}
