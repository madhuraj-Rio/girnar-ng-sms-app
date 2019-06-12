import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import {Company,Division} from '../../../../models/dashboard-data-models';
import { NgProgress } from '@ngx-progressbar/core';
@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css'],
  providers:  [ MastersService ]
})
export class EntitiesComponent implements OnInit {

  entities: Company[];
  constructor(public master : MastersService, private progress: NgProgress) { }

  ngOnInit() {
    this.progress.start();
    this.getAllEntities();
  }

  getAllEntities() {
    this.master.getEntities('').subscribe((data) => {
      if(data.status && data.response=='success'){
       this.entities = data.data;
       this.progress.done();
      }
    });
  }

}
