import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageAddressService } from '../../../core/services/manage-address.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrl: './manage-address.component.scss',
})
export class ManageAddressComponent implements OnInit {
  listAddress: [] = [];
  constructor(
    private route: ActivatedRoute,
    //private router: Router,
    private mAddressService: ManageAddressService
  ) {}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const paramProvinceCode = params.get('provinceCode');
      const paramDistrictCode = params.get('districtCode');
      const paramWardCode = params.get('wardCode');

      if (!paramProvinceCode) {
        this.getAddressList('provinces');
      } else if (!paramDistrictCode) {
        this.getAddressList('districts', paramProvinceCode);
      } else if (!paramWardCode) {
        this.getAddressList('wards', paramProvinceCode, paramDistrictCode);
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
      case 'provinces':
        addressObservable = this.mAddressService.getListProvinces();
        break;
      case 'districts':
        addressObservable = this.mAddressService.getListDistricts(
          provinceCode!
        );
        break;
      case 'wards':
        addressObservable = this.mAddressService.getListWards(
          provinceCode!,
          districtCode!
        );
        break;
    }

    addressObservable?.subscribe((res) => {
      if (res && res.items) {
        this.listAddress = res.items;
        //console.log(this.listAddress);
      }
    });
  }
}
