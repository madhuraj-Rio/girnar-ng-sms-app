import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import { NgProgress } from '@ngx-progressbar/core';
@Component({
  selector: 'app-senders',
  templateUrl: './senders.component.html',
  styleUrls: ['./senders.component.css'],
  providers:  [ MastersService ]
})
export class SendersComponent implements OnInit {
  constructor(public master : MastersService, private progress: NgProgress) { }
  public listingData =[];
  ngOnInit() {
    this.progress.start();
  this.getListingData();
}
getListingData() {
  this.master.getSenders().subscribe((data) => {
    if(data.status && data.response=='success'){
     this.listingData = data.data;
     this.progress.done();
    }
  });
}


}
