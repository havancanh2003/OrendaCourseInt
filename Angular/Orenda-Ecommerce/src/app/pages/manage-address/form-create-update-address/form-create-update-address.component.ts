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

@Component({
  selector: 'app-form-create-update-address',
  templateUrl: './form-create-update-address.component.html',
  styleUrl: './form-create-update-address.component.scss',
})
export class FormCreateUpdateAddressComponent implements OnInit, OnChanges {
  @Input() model!: provinceDetailModel | districtDetailModel | wardDetailModel;
  titleForm: string = '';
  @Output() isActionForm = new EventEmitter<boolean>();

  constructor(private manageAddressService: ManageAddressService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      if (this.isProvince(this.model)) {
        this.titleForm = `Cập nhật thông tin tỉnh: ${this.model.provinceName}`;
      } else if (this.isDistrict(this.model)) {
        this.titleForm = `Cập nhật thông tin huyện: ${this.model.districtName}`;
      } else if (this.isWard(this.model)) {
        this.titleForm = `Cập nhật thông tin xã: ${this.model.wardName}`;
      }
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
          alert(`${this.titleForm} thành công!`);
          this.isActionForm.emit(true);
        } else {
          alert('Cập nhật thất bại: ' + res.errorMessage);
          this.isActionForm.emit(false);
        }
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi cập nhật!');
        this.isActionForm.emit(false);
      },
      complete: () => {
        console.log('Update completed');
      },
    });
  }

  cancelForm() {
    this.isActionForm.emit(false);
  }
}
