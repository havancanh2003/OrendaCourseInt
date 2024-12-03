import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss',
})
export class AddressInfoComponent implements OnInit {
  @Input() lAddress: [] = [];

  constructor(private router: Router) {}
  ngOnInit(): void {}
  selectedProvince(p: any) {
    console.log(p);
    this.router.navigate([], {
      queryParams: { provinceCode: p.maTinh, districtCode: p.maHuyen },
    });
  }
}
