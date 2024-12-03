import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageAddressService } from '../../../core/services/manage-address.service';
import { addressItem, AddressType } from './../../../core/models/address.model';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrl: './manage-address.component.scss',
})
export class ManageAddressComponent implements OnInit {
  addressItem: addressItem = {
    items: [],
    currentType: '',
    totalCount: 0,
    title: '',
  };

  constructor(
    private route: ActivatedRoute,
    private mAddressService: ManageAddressService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const paramProvinceCode = params.get('provinceCode');
      const paramDistrictCode = params.get('districtCode');
      const paramWardCode = params.get('wardCode');

      if (!paramProvinceCode) {
        this.getAddressList(AddressType.Province);
      } else if (!paramDistrictCode) {
        this.getAddressList(AddressType.District, paramProvinceCode);
      } else if (!paramWardCode) {
        this.getAddressList(
          AddressType.Ward,
          paramProvinceCode,
          paramDistrictCode
        );
      }
    });
  }

  private getAddressList(
    type: string,
    provinceCode?: string,
    districtCode?: string
  ): void {
    let addressObservable;
    switch (type) {
      case AddressType.Province:
        this.addressItem.currentType = AddressType.Province;
        this.addressItem.title = 'Danh sách các tỉnh và thành phố';
        addressObservable = this.mAddressService.getListProvinces();
        break;
      case AddressType.District:
        this.addressItem.currentType = AddressType.District;
        this.addressItem.title = `Danh sách các huyện thuộc tỉnh(thành phố) ${provinceCode}`;
        addressObservable = this.mAddressService.getListDistricts(
          provinceCode!
        );
        break;
      case AddressType.Ward:
        this.addressItem.currentType = AddressType.Ward;
        this.addressItem.title = `Danh sách các xã(thị trấn) thuộc huyện(thị xã) ${districtCode} của tỉnh(thành phố) ${provinceCode}`;
        addressObservable = this.mAddressService.getListWards(
          provinceCode!,
          districtCode!
        );
        break;
    }

    addressObservable?.subscribe((res) => {
      if (res && res.items) {
        this.addressItem = {
          items: res.items,
          currentType: this.addressItem.currentType,
          totalCount: res.totalCount,
          title: this.addressItem.title,
        };
        //console.log(this.addressItem);
      }
    });
  }
}
