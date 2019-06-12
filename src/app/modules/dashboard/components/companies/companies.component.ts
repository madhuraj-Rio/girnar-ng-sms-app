import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import {Company,Division} from '../../../../models/dashboard-data-models';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers:  [ MastersService ]
})
export class CompaniesComponent implements OnInit {
 public companies: any[];
  constructor(public master : MastersService, public progress: NgProgress) { }

  ngOnInit() {
    this.progress.start();
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.master.getCompanies().subscribe((data) => {
      if(data.status && data.response=='success'){
        this.companies = data.data;
       this.progress.done();
      }
    });
  }

}
