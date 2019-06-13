import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import { NgProgress } from '@ngx-progressbar/core';
@Component({
  selector: 'app-sms-sources',
  templateUrl: './sms-sources.component.html',
  styleUrls: ['./sms-sources.component.css'],
  providers:  [ MastersService ]
})
export class SmsSourcesComponent implements OnInit {

  constructor(public master : MastersService, private progress: NgProgress) { }
  public listingData =[];
  ngOnInit() {
    this.progress.start();
  this.getListingData();
}
getListingData() {
  this.master.getSmsSources('').subscribe((data) => {
    if(data.status && data.response=='success'){
     this.listingData = data.data;
     this.progress.done();
    }
  });
}
}
