import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  addressItem,
  AddressType,
  districtDetailModel,
  provinceDetailModel,
  wardDetailModel,
} from '../../../core/models/address.model';
import { ManageAddressService } from '../../../core/services/manage-address.service';
import { FormCreateUpdateAddressComponent } from '../form-create-update-address/form-create-update-address.component';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
})
export class AddressInfoComponent implements OnInit, OnChanges {
  @Input() lAddress!: addressItem;
  @ViewChild('child') childComponent!: FormCreateUpdateAddressComponent;
  currentModel!: provinceDetailModel | districtDetailModel | wardDetailModel;
  list: any[] = [];
  isShowOrHiddenForm: boolean = false;

  constructor(
    private router: Router,
    private manageAddressService: ManageAddressService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['lAddress'] && changes['lAddress'].currentValue) {
    //   console.log('AddressItem updated:', changes['lAddress'].currentValue);
    // }
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
              isXaNgheo: i.isXaNgheo,
              isXaMienNui: i.isXaMienNui,
              isXaDanToc: i.isXaDanToc,
              isThanhThi: i.isThanhThi,
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
  updateOrCreateAddress(address?: any) {
    this.isShowOrHiddenForm = true;
    if (address) {
      switch (this.lAddress?.currentType) {
        case AddressType.Province:
          this.currentModel = address as provinceDetailModel;
          break;
        case AddressType.District:
          this.currentModel = address as districtDetailModel;
          break;
        case AddressType.Ward:
          this.currentModel = address as wardDetailModel;
          break;
        default:
          break;
      }
      return;
    }
    switch (this.lAddress?.currentType) {
      case AddressType.Province:
        this.currentModel = {
          id: null,
          isActive: true,
          cap: '',
          provinceCode: '',
          provinceName: '',
        } as provinceDetailModel;
        break;
      case AddressType.District:
        this.currentModel = {
          id: null,
          isActive: true,
          cap: '',
          provinceCode: '',
          districtCode: '',
          districtName: '',
        } as districtDetailModel;
        break;
      case AddressType.Ward:
        this.currentModel = {
          id: null,
          isActive: true,
          cap: '',
          provinceCode: '',
          districtCode: '',
          wardCode: '',
          wardName: '',
          isXaNgheo: false,
          isXaMienNui: false,
          isXaDanToc: false,
          isThanhThi: false,
        } as wardDetailModel;
        break;
      default:
        break;
    }
  }

  listenStatusForm(value: boolean): void {
    if (value) {
      window.location.reload();
    }
    this.isShowOrHiddenForm = false;
  }

  deleteAddress(id: number) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    let observableRespon;
    switch (this.lAddress?.currentType) {
      case AddressType.Province:
        console.log('p: ', id);
        observableRespon = this.manageAddressService.deleteProvinceById(id);
        break;
      case AddressType.District:
        console.log('d: ', id);
        observableRespon = this.manageAddressService.deleteDistrictById(id);
        break;
      case AddressType.Ward:
        console.log('w: ', id);
        observableRespon = this.manageAddressService.deleteWardById(id);
        break;
      default:
        break;
    }
    observableRespon?.subscribe({
      next: () => {
        this.list = this.list.filter((item) => item.id !== id);
        alert('delete successfully');
      },
      error: (err) => {
        console.error('Failed to delete address:', err);
        const errM = err?.errorMessage ?? '';
        alert(`error deleted address: ${errM}`);
      },
    });
  }
}
