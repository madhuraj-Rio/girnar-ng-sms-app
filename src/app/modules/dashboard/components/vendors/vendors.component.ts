import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
  providers:  [ MastersService ]
})
export class VendorsComponent implements OnInit {

  constructor(public master : MastersService) { }
  public listingData =[];
  ngOnInit() {
  this.getListingData();
}
getListingData() {
  this.master.getVendors().subscribe((data) => {
    if(data.status && data.response=='success'){
     this.listingData = data.data;
    }
  });
}

}
