import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  districtDetailModel,
  provinceDetailModel,
  resultAddressModel,
  wardDetailModel,
} from '../../../core/models/address.model';
import { ManageAddressService } from '../../../core/services/manage-address.service';
import { Observable } from 'rxjs';
import { TYPE_ACTION } from '../../../helpers/helpers';

@Component({
  selector: 'app-form-create-update-address',
  templateUrl: './form-create-update-address.component.html',
  styleUrl: './form-create-update-address.component.scss',
})
export class FormCreateUpdateAddressComponent implements OnInit, OnChanges {
  @Input() model!: provinceDetailModel | districtDetailModel | wardDetailModel;
  @Input() typeActiveChild!: string;
  @Output() isActionForm = new EventEmitter<boolean>();
  titleForm: string = '';
  isReadonly!: boolean;

  listitemProvinceCode!: { pCode: string; pName: string }[];
  listitemDistrictCode!: { dCode: string; dName: string }[];

  constructor(private manageAddressService: ManageAddressService) {}

  ngOnInit(): void {
    if (this.typeActiveChild) {
      this.isReadonly = this.typeActiveChild === TYPE_ACTION.UPDATE;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.updateTitleForm();
    }
  }

  private updateTitleForm() {
    if (this.isProvince(this.model)) {
      this.titleForm =
        this.typeActiveChild == TYPE_ACTION.UPDATE
          ? `Cập nhật thông tin tỉnh: ${this.model.provinceName}`
          : `Tạo mới thông tin tỉnh`;
      return;
    } else if (this.isDistrict(this.model)) {
      this.titleForm =
        this.typeActiveChild == TYPE_ACTION.UPDATE
          ? `Cập nhật thông tin huyện(thành phố): ${this.model.districtName}`
          : `Tạo mới thông tin huyện(thành phố)`;
      this.addDataProvinceToForm();
      return;
    } else if (this.isWard(this.model)) {
      this.titleForm =
        this.typeActiveChild == TYPE_ACTION.UPDATE
          ? `Cập nhật thông tin xã phường thị trấn: ${this.model.wardName}`
          : `Tạo mới thông tin xã phường thị trấn`;

      this.addDataDistrictToForm();
      return;
    }
  }

  private addDataProvinceToForm(): void {
    this.listitemProvinceCode = [{ pCode: '', pName: '--Chọn tỉnh--' }];
    this.getDataProvince();
  }
  private addDataDistrictToForm(): void {
    this.addDataProvinceToForm();
    this.listitemDistrictCode = [
      { dCode: '', dName: '--Chọn huyện(thành phố)--' },
    ];
    this.getDataDistrict(this.model.provinceCode);
  }

  isProvince(model: any): model is provinceDetailModel {
    return (model as provinceDetailModel).provinceName !== undefined;
  }

  isDistrict(model: any): model is districtDetailModel {
    return (model as districtDetailModel).districtName !== undefined;
  }

  isWard(model: any): model is wardDetailModel {
    return (model as wardDetailModel).wardName !== undefined;
  }
  submitForm(
    model: provinceDetailModel | districtDetailModel | wardDetailModel
  ) {
    console.log(model);
    let updateObservable: Observable<resultAddressModel>;

    if (this.isProvince(model)) {
      updateObservable =
        this.manageAddressService.updateOrCreateProvince(model);
    } else if (this.isDistrict(model)) {
      updateObservable =
        this.manageAddressService.updateOrCreateDistrict(model);
    } else if (this.isWard(model)) {
      updateObservable = this.manageAddressService.updateOrCreateWard(model);
    } else {
      console.error('Invalid model type');
      return;
    }

    updateObservable.subscribe({
      next: (res: resultAddressModel) => {
        if (res.isSuccessful) {
          alert('Successfully !!');
          this.isActionForm.emit(true);
        } else {
          alert('Failed: ' + res.errorMessage);
        }
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi thao tác!');
        this.isActionForm.emit(false);
      },
      complete: () => {},
    });
  }

  cancelForm() {
    this.isActionForm.emit(false);
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

  selectedItemProvinceCode(call?: string) {
    if (call && this.isWard(this.model)) {
      this.model.districtCode = '';
      this.listitemDistrictCode = this.listitemDistrictCode.filter(
        (x) => x.dCode === ''
      );
      this.getDataDistrict(this.model.provinceCode);
    }
  }
  selectedItemDistrictCode() {}
}
