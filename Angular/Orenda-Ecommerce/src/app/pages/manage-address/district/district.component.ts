import { Component, OnInit } from '@angular/core';
import { ManageAddressService } from '../../../core/services/manage-address.service';
import { districtDetailModel } from '../../../core/models/address.model';
import { TYPE_ACTION } from '../../../helpers/helpers';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrl: './district.component.scss',
})
export class DistrictComponent implements OnInit {
  districts: districtDetailModel[] = [];
  itemSelectedStatus: boolean | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  textSearch!: string;
  listitemProvinceCode!: { pCode: string; pName: string }[];
  itemProvinceCode: string = '';

  isShowOrHiddenForm: boolean = false;
  currentModel!: districtDetailModel;
  typeAction!: string;

  constructor(private manageAddressService: ManageAddressService) {}
  ngOnInit(): void {
    this.getListDistrict();
    this.listitemProvinceCode = [
      { pCode: this.itemProvinceCode, pName: '--Chọn tỉnh--' },
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

  getListDistrict(
    status?: boolean,
    pageActive?: number,
    textSearch?: string,
    paramProvinceCode?: string
  ): void {
    this.manageAddressService
      .getDataDistrictsFilter(status, pageActive, textSearch, paramProvinceCode)
      .subscribe({
        next: (res: { items: any[]; totalCount: number }) => {
          if (res && res.items) {
            this.districts = res.items.map((d: any) => ({
              provinceCode: d.maTinh,
              cap: d.cap,
              id: d.id,
              isActive: d.isActive,
              districtCode: d.maHuyen,
              districtName: d.tenHuyen,
            }));
            this.totalItems = res.totalCount;
          }
        },
        error: (err) => {
          console.error('Failed to fetch provinces', err);
        },
      });
  }

  updateOrCreateAddress(add?: districtDetailModel) {
    console.log(add);
    if (add) {
      this.currentModel = add;
      this.typeAction = TYPE_ACTION.UPDATE;
    } else {
      this.currentModel = {
        cap: '',
        id: 0,
        isActive: false,
        districtCode: '',
        provinceCode: '',
        districtName: '',
      };
      this.typeAction = TYPE_ACTION.CREATE;
    }
    this.isShowOrHiddenForm = true;
  }
  deleteAddress(id: number | null) {
    if (id) {
      if (confirm('Bạn có chắc muốn xoá huyện/thành phố này không?')) {
        this.manageAddressService.deleteDistrictById(Number(id)).subscribe({
          next: () => {
            alert('Xoá thành công');
            this.districts = this.districts.filter((x) => x.id !== id);
          },
          error: (err) => {
            alert('Xảy ra lỗi trong quá trình xoá dữ liệu');
            console.error('Failed to fetch provinces', err);
          },
        });
      }
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getListDistrict(
      this.itemSelectedStatus,
      this.currentPage,
      this.textSearch,
      this.itemProvinceCode
    );
  }
  selectedItemProvinceCode() {
    this.loadData();
  }
  searchNameCodeDistrict() {
    this.loadData();
  }
  loadData(): void {
    this.getListDistrict(
      this.itemSelectedStatus,
      1,
      this.textSearch,
      this.itemProvinceCode
    );
    this.currentPage = 1;
  }

  selectedStatus() {
    this.loadData();
  }

  listenStatusForm(value: boolean): void {
    if (value) {
    }
    this.isShowOrHiddenForm = false;
  }
}
