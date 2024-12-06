import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageAddressService } from '../../../core/services/manage-address.service';
import { provinceDetailModel } from '../../../core/models/address.model';
import { FormCreateUpdateAddressComponent } from '../form-create-update-address/form-create-update-address.component';
import { TYPE_ACTION } from '../../../helpers/helpers';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrl: './province.component.scss',
})
export class ProvinceComponent implements OnInit {
  provinces: provinceDetailModel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  itemSelectedStatus: boolean | undefined;
  textSearch!: string;
  isShowOrHiddenForm: boolean = false;
  currentModel!: provinceDetailModel;
  typeAction!: string;

  @ViewChild('child') childComponent!: FormCreateUpdateAddressComponent;

  constructor(private manageAddressService: ManageAddressService) {}

  ngOnInit(): void {
    this.getDataProvince();
  }

  getDataProvince(
    status?: boolean,
    pageActive?: number,
    txtSearch?: string
  ): void {
    this.manageAddressService
      .getListProvinces(status, pageActive, txtSearch)
      .subscribe({
        next: (res: { items: any[]; totalCount: number }) => {
          if (res && res.items) {
            this.provinces = res.items.map((p: any) => ({
              provinceCode: p.maTinh,
              provinceName: p.tenTinh,
              cap: p.cap,
              id: p.id,
              isActive: p.isActive,
              strVungSinhThai: p.strVungSinhThai,
              strVungDiaLy: p.strVungDiaLy,
              strVungMien: p.strVungMien,
              vungMien: p.vungMien,
              vungDiaLy: p.vungDiaLy,
              vungSinhThai: p.vungSinhThai,
            }));
            this.totalItems = res.totalCount;
          }
        },
        error: (err) => {
          console.error('Failed to fetch provinces', err);
        },
      });
  }

  updateOrCreateAddress(add?: provinceDetailModel) {
    if (add) {
      this.currentModel = add;
      this.typeAction = TYPE_ACTION.UPDATE;
    } else {
      this.currentModel = {
        provinceCode: '',
        provinceName: '',
        cap: '',
        id: 0,
        isActive: false,
        strVungSinhThai: '',
        strVungDiaLy: '',
        strVungMien: '',
        vungMien: null,
        vungDiaLy: null,
        vungSinhThai: null,
      };
      this.typeAction = TYPE_ACTION.CREATE;
    }
    this.isShowOrHiddenForm = true;
  }
  deleteAddress(id: number | null) {
    if (id) {
      if (confirm('Bạn có chắc muốn xoá tỉnh này không?')) {
        this.manageAddressService.deleteProvinceById(Number(id)).subscribe({
          next: () => {
            alert('Xoá thành công');
            this.provinces = this.provinces.filter((x) => x.id !== id);
          },
          error: (err) => {
            alert('Xảy ra lỗi trong quá trình xoá dữ liệu');
            console.error('Failed to fetch provinces', err);
          },
        });
      }
    }
  }

  selectedStatus() {
    this.getDataProvince(this.itemSelectedStatus, 1, this.textSearch);
    this.currentPage = 1;
  }
  searchProvinces() {
    this.getDataProvince(this.itemSelectedStatus, 1, this.textSearch);
    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadData();
  }

  listenStatusForm(value: boolean): void {
    if (value) {
      this.loadData();
    }
    this.isShowOrHiddenForm = false;
  }
  loadData(): void {
    this.getDataProvince(
      this.itemSelectedStatus,
      this.currentPage,
      this.textSearch
    );
  }
}
