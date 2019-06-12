import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';

@Component({
  selector: 'app-senders',
  templateUrl: './senders.component.html',
  styleUrls: ['./senders.component.css'],
  providers:  [ MastersService ]
})
export class SendersComponent implements OnInit {
  constructor(public master : MastersService,) { }
  public listingData =[];
  ngOnInit() {
  this.getListingData();
}
getListingData() {
  this.master.getSenders().subscribe((data) => {
    if(data.status && data.response=='success'){
     this.listingData = data.data;
    }
  });
}


}
