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
  titleForm: string = '';
  @Output() isActionForm = new EventEmitter<boolean>();

  constructor(private manageAddressService: ManageAddressService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.updateTitleForm();
    }
  }

  private updateTitleForm(): void {
    if (this.isProvince(this.model)) {
      this.titleForm =
        this.typeActiveChild == TYPE_ACTION.UPDATE
          ? `Cập nhật thông tin tỉnh: ${this.model.provinceName}`
          : `Tạo mới thông tin tỉnh`;
    } else if (this.isDistrict(this.model)) {
      this.titleForm =
        this.typeActiveChild == TYPE_ACTION.UPDATE
          ? `Cập nhật thông tin huyện(thành phố): ${this.model.districtName}`
          : `Tạo mới thông tin huyện(thành phố)`;
    } else if (this.isWard(this.model)) {
      this.titleForm =
        this.typeActiveChild == TYPE_ACTION.UPDATE
          ? `Cập nhật thông tin xã phường thị trấn: ${this.model.wardName}`
          : `Tạo mới thông tin xã phường thị trấn`;
    }
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
}
