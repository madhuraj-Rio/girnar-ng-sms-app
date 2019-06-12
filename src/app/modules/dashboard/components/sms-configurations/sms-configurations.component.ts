import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';

@Component({
  selector: 'app-sms-configurations',
  templateUrl: './sms-configurations.component.html',
  styleUrls: ['./sms-configurations.component.css'],
  providers:  [ MastersService ]
})
export class SmsConfigurationsComponent implements OnInit {

  constructor(public master: MastersService ) { }
  public listingData = [];
  ngOnInit() {
    this.getListingData();
  }
  getListingData() {
    this.master.getSmsConfigs().subscribe((data) => {
      if (data.status && data.response == 'success') {
        this.listingData = data.data;
      }
    });
  }
}
