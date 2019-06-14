import { Component, OnInit, HostListener } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
@Component({
  selector: 'app-sms-logs',
  templateUrl: './sms-logs.component.html',
  styleUrls: ['./sms-logs.component.css'],
  providers:  [ MastersService ]
})
export class SmsLogsComponent implements OnInit {

  elements = [1];
  public listingData =[];
  count = 1;
  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached()) {
      this.progress.start();
      this.getListingData(this.count++);
    }
  }
  constructor(public master: MastersService, private progress: NgProgress) { }

  ngOnInit() {
    this.progress.start();
    this.getListingData(this.count);
  }
  getListingData(limit) {
    this.master.getSmsLogs(limit).subscribe((data) => {
      if (data.status && data.response == 'success') {
        if(this.listingData.length>0){
          this.listingData = [...this.listingData, ...data.data];
        }else{
          this.listingData = data.data;
        }
        this.progress.done();
      }else{
        this.progress.done();
      }
    },error=>{
      console.log('err',error)
      this.progress.done();
    });
  }

  bottomReached(): boolean {
    console.log(window.innerHeight + window.scrollY +' --'+ document.body.offsetHeight)
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
}
