import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import { Company } from '../../../../models/dashboard-data-models';
import { FormGroup, FormControl } from '@angular/forms';
import { FormCompanyService } from '../../../../shared/forms/form-company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [MastersService, FormCompanyService]
})
export class CompanyFormComponent implements OnInit {

  public form: FormGroup;
  unsubcribe: any;
  public fields: Array<any>;
  public action: any;
  public showSuccessMessage = false;
  public showErrorMessage = false;
  public message = "";
  public dataSaved=false;
  public seqId: any;
  constructor(private progress: NgProgress ,private companyService: FormCompanyService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    
    var urls = this.router.url.split("/");
    this.action = urls[3];
    if(this.action === 'edit'){
      this.progress.start();
      this.seqId = urls[4];
      this.loadDataToEdit(this.seqId).then(
        value=>this.bindDataWithValue(this.companyService.fields,value));
    }
    else if(this.action === 'add'){
      this.fields = this.companyService.fields;
    }
    this.bindFormFieldsConfig();
  }
  bindDataWithValue(fields,value){
    for(var i=0;i<this.companyService.fields.length;i++){
      if(value.data[0][this.companyService.fields[i].name]){
        this.companyService.fields[i].value = value.data[0][this.companyService.fields[i].name];
      }
    }

   this.fields = this.companyService.fields;
   this.progress.done();
  }
  bindFormFieldsConfig() {
    const formConfs: any[] = this.fields;
    if (formConfs) {
      const context = this;
      formConfs.forEach((row) => {
        if (row.type === 'dropdown') {
          row.event = (event, field) => {
            console.log(event, field);
          };
        }
      });
    }
  }
  getsubmitted(formvalues: Company) {
    this.progress.start();
    if ( this.action === 'edit') {
      this.updateRecord(formvalues,this.seqId);
    } else  if( this.action === 'add') {
      this.insertNewRecord(formvalues);
    }
  }
  updateRecord(FormData,UpdateId) {
    this.companyService.updateCompany(FormData,UpdateId).subscribe((returnData: any) => {
      if( returnData.response === 'success') {
        this.showSuccessMessage = true;
        this.message = returnData.message;
      } else {
        this.showErrorMessage = true;
        this.message = returnData.message;
      }
      this.dataSaved = true;
      this.progress.done();
    });
  }
  insertNewRecord( FormData ) {
    this.companyService.createCompany(FormData).subscribe((returnData: any) => {
      if( returnData.response === 'success') {
        this.showSuccessMessage = true;
        this.message = returnData.message;
      } else {
        this.showErrorMessage = true;
        this.message = returnData.message;
      }
      this.progress.done();
      this.dataSaved = true;
    });
  }
  async loadDataToEdit(appId: number) {  
    return await this.companyService.getCompanyById(appId).toPromise();
  }
  ngDistroy() {
    this.unsubcribe();
  }

}
