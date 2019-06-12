import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import {Division} from '../../../../models/dashboard-data-models';
import { NgProgress } from '@ngx-progressbar/core';
@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css'],
  providers:  [ MastersService ]

})
export class DivisionComponent implements OnInit {

  constructor(private route:ActivatedRoute,public master : MastersService,private progress: NgProgress) { }
  public divisions =[];
  ngOnInit() {
    this.progress.start();
  this.getAllDivisions();
}
getAllDivisions() {
  this.master.getDivisions('').subscribe((data) => {
    if(data.status && data.response=='success'){
     this.divisions = data.data;
     this.progress.done();
    }
  });
}

}
