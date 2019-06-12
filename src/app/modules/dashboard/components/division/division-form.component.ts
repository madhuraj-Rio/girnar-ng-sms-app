import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import { Division } from '../../../../models/dashboard-data-models';
import { FormGroup, FormControl } from '@angular/forms';
import { FormDivisionService } from '../../../../shared/forms/form-division.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
@Component({
  selector: 'app-form',
  templateUrl: './division-form.component.html',
  styleUrls: [],
  providers: [MastersService, FormDivisionService]
})
export class DivisionFormComponent implements OnInit {

  public form: FormGroup;
  unsubcribe: any;
  public fields: Array<any>;
  public action: any;
  public showSuccessMessage = false;
  public showErrorMessage = false;
  public message = "";
  public dataSaved = false;
  public seqId: any="";
  public companies: any[];
  constructor(private master: MastersService, private divisionService: FormDivisionService, private route: ActivatedRoute, private router: Router,private progress: NgProgress) {
  }
  ngOnInit() {
    this.progress.start();
    var urls = this.router.url.split("/");
    this.action = urls[3];
    if (this.action === 'edit') {
      this.seqId = urls[4];
    }
    this._bindAllDataFromServices();
  }

  bindDataWithValue(fields, value) {
    for (var i = 0; i < this.divisionService.fields.length; i++) {
      if (value != null) {
        if (value.data[0][this.divisionService.fields[i].name] && this.divisionService.fields[i].name == 'company_id') {
          this.divisionService.fields[i].value = value.data[0][this.divisionService.fields[i].name];
          this.divisionService.fields[i].options = this.companies;
        } else {
          this.divisionService.fields[i].value = value.data[0][this.divisionService.fields[i].name];
        }
      }
      else {
        if (this.divisionService.fields[i].name == 'company_id') {
          this.divisionService.fields[i].options = this.companies;
        }
      }
    }
    this.progress.done();
    this.fields = this.divisionService.fields;
  }
  bindFormFieldsConfig() {
    const formConfs: any[] = this.fields;
    if (formConfs) {
      const context = this;
      formConfs.forEach((row) => {
        if (row.type === 'dropdown') {
          row.event = (event, field) => {
            console.log(field);
          };
        }
      });
    }
  }
  getsubmitted(formvalues: Division) {
    this.progress.start();
    if (this.action === 'edit') {
      this.updateRecord(formvalues, this.seqId);
    } else if (this.action === 'add') {
      this.insertNewRecord(formvalues);
    }
    this.progress.done();
  }
  updateRecord(FormData, UpdateId) {
    this.divisionService.updateDivision(FormData, UpdateId).subscribe((returnData: any) => {
      if (returnData.response === 'success') {
        this.showSuccessMessage = true;
        this.message = returnData.message;
      } else {
        this.showErrorMessage = true;
        this.message = returnData.message;
      }
      this.dataSaved = true;
    });
  }
  insertNewRecord(FormData) {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.divisionService.createDivision(FormData).subscribe((returnData: any) => {
      if (returnData.response === 'success') {
        this.showSuccessMessage = true;
        this.message = returnData.message;
      } else {
        this.showErrorMessage = true;
        this.message = returnData.message;
      }
      this.dataSaved = true;
    });
  }
  _bindAllDataFromServices() {
    this.master.getCompanies().subscribe((data) => {
      if (data.status && data.response == 'success') {
        this.companies = [];
        data.data.forEach((item, index) => {
          this.companies.push({ key: item.id, label: item.name })
        });
        if(this.seqId != ""){
         this.divisionService.getDivisionById(this.seqId).subscribe((loadData)=>{
            return this.bindDataWithValue(this.companies,loadData);
          })
        }
        else {
          return this.bindDataWithValue(this.companies,null);
        }
      }
    });
  }
  // async loadDataToEdit(appId: number) {
  //   return await this.divisionService.getDivisionById(appId).toPromise();
  // }
  ngDistroy() {
    this.unsubcribe();
  }

}
