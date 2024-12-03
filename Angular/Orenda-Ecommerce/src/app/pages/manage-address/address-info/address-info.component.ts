import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  addressItem,
  AddressType,
  districtModel,
  wardModel,
} from '../../../core/models/address.model';
import { provinceModel } from './../../../core/models/address.model';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
})
export class AddressInfoComponent implements OnInit, OnChanges {
  @Input() lAddress!: addressItem;
  list: any[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.lAddress?.items?.length > 0) {
      this.list = this.lAddress.items.map((i: any) => {
        switch (this.lAddress.currentType) {
          case AddressType.Province:
            return {
              cap: i.cap,
              id: i.id,
              isActive: i.isActive,
              provinceCode: i.maTinh,
              provinceName: i.tenTinh,
            };
          case AddressType.District:
            return {
              cap: i.cap,
              id: i.id,
              isActive: i.isActive,
              provinceCode: i.maTinh,
              districtCode: i.maHuyen,
              districtName: i.tenHuyen,
            };
          case AddressType.Ward:
            return {
              cap: i.cap,
              id: i.id,
              isActive: i.isActive,
              provinceCode: i.maTinh,
              districtCode: i.maHuyen,
              wardCode: i.maXa,
              wardName: i.tenXa,
            };
          default:
            return {};
        }
      });
    }
  }

  selectedAddress(p: any) {
    this.router.navigate([], {
      queryParams: {
        provinceCode: p.provinceCode,
        districtCode: p.districtCode,
      },
    });
  }
}
// if (changes['lAddress'] && changes['lAddress'].currentValue) {
//   console.log('AddressItem updated:', changes['lAddress'].currentValue);
// }
