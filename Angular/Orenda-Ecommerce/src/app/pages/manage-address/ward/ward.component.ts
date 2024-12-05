import { Component, OnInit } from '@angular/core';
import { ManageAddressService } from '../../../core/services/manage-address.service';
import { wardDetailModel } from '../../../core/models/address.model';
import { TYPE_ACTION } from '../../../helpers/helpers';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrl: './ward.component.scss',
})
export class WardComponent implements OnInit {
  wards: wardDetailModel[] = [];
  itemSelectedStatus: boolean = true;
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  itemProvinceCode: string = '';
  listitemProvinceCode!: { pCode: string; pName: string }[];
  listitemDistrictCode!: { dCode: string; dName: string }[];
  itemDistrictCode: string = '';
  textSearch!: string;

  isShowOrHiddenForm: boolean = false;
  currentModel!: wardDetailModel;
  typeAction!: string;

  constructor(private manageAddressService: ManageAddressService) {}
  ngOnInit(): void {
    this.getDataWards();
    this.listitemProvinceCode = [
      { pCode: this.itemProvinceCode, pName: '--Chọn tỉnh--' },
    ];
    this.listitemDistrictCode = [
      { dCode: this.itemDistrictCode, dName: '--Chọn huyện(thành phố)--' },
    ];
    this.getDataProvince();
  }

  getDataProvince(): void {
    this.manageAddressService.getAllProvinces().subscribe({
      next: (res: { items: any[]; totalCount: number }) => {
        if (res && res.items) {
          const data = res.items.map((p: any) => ({
            pCode: p.maTinh,
            pName: p.tenTinh,
          }));
          this.listitemProvinceCode = [...this.listitemProvinceCode, ...data];
        }
      },
      error: (err) => {
        console.error('Failed to fetch provinces', err);
      },
    });
  }
  getDataDistrict(provinceCode: string): void {
    if (provinceCode == '') return;
    this.manageAddressService
      .getListDistrictsByProvinceCode(provinceCode)
      .subscribe({
        next: (res: { items: any[]; totalCount: number }) => {
          if (res && res.items) {
            const data = res.items.map((d: any) => ({
              dCode: d.maHuyen,
              dName: d.tenHuyen,
            }));
            this.listitemDistrictCode = [...this.listitemDistrictCode, ...data];
          }
        },
        error: (err) => {
          console.error('Failed to fetch provinces', err);
        },
      });
  }

  getDataWards(
    status?: boolean,
    pageActive?: number,
    txtSearch?: string,
    provinceCode?: string,
    districtCode?: string
  ): void {
    this.manageAddressService
      .getListWards(status, pageActive, txtSearch, provinceCode, districtCode)
      .subscribe({
        next: (res: { items: any[]; totalCount: number }) => {
          if (res && res.items) {
            this.wards = res.items.map((p: any) => ({
              provinceCode: p.maTinh,
              cap: p.cap,
              id: p.id,
              districtCode: p.maHuyen,
              wardCode: p.maXa,
              wardName: p.tenXa,
              isActive: p.isActive,
              isXaNgheo: p.isXaNgheo,
              isXaMienNui: p.isXaMienNui,
              isXaDanToc: p.isXaDanToc,
              isThanhThi: p.isThanhThi,
            }));
            this.totalItems = res.totalCount;
          }
        },
        error: (err) => {
          console.error('Failed to fetch provinces', err);
        },
      });
  }

  searchNameCodeWard() {
    this.loadData();
  }
  selectedStatus() {
    this.loadData();
  }

  selectedItemProvinceCode() {
    this.getDataDistrict(this.itemProvinceCode);
    this.loadData();
  }
  selectedItemDistricCode() {
    console.log(this.itemDistrictCode);
    this.loadData();
  }

  deleteAddress(id: number | null) {
    if (id) {
      if (confirm('Bạn có chắc muốn xoá xã/phường/thị trấn này không?')) {
        this.manageAddressService.deleteWardById(Number(id)).subscribe({
          next: () => {
            alert('Xoá thành công');
            this.wards = this.wards.filter((x) => x.id !== id);
          },
          error: (err) => {
            alert('Xảy ra lỗi trong quá trình xoá dữ liệu');
            console.error('Failed to fetch provinces', err);
          },
        });
      }
    }
  }
  updateOrCreateAddress(add?: wardDetailModel) {
    console.log(add);
    if (add) {
      this.currentModel = add;
      this.typeAction = TYPE_ACTION.UPDATE;
    } else {
      this.currentModel = {
        provinceCode: '',
        cap: '',
        id: 0,
        districtCode: '',
        wardCode: '',
        wardName: '',
        isActive: false,
        isXaNgheo: null,
        isXaMienNui: null,
        isXaDanToc: null,
        isThanhThi: null,
      };
      this.typeAction = TYPE_ACTION.CREATE;
    }
    this.isShowOrHiddenForm = true;
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getDataWards(
      this.itemSelectedStatus,
      this.currentPage,
      this.textSearch,
      this.itemProvinceCode,
      this.itemDistrictCode
    );
  }

  loadData(): void {
    this.getDataWards(
      this.itemSelectedStatus,
      1,
      this.textSearch,
      this.itemProvinceCode,
      this.itemDistrictCode
    );
    this.currentPage = 1;
  }

  listenStatusForm(value: boolean): void {
    if (value) {
    }
    this.isShowOrHiddenForm = false;
  }
}
