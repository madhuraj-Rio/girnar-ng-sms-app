import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import { Vendors } from '../../../../models/dashboard-data-models';
import { FormGroup, FormControl } from '@angular/forms';
import { FormVendorService } from '../../../../shared/forms/form-vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
@Component({
  selector: 'app-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: [],
  providers: [MastersService, FormVendorService]
})
export class VendorFormComponent implements OnInit {

  public form: FormGroup;
  unsubcribe: any;
  public fields: Array<any>;
  public action: any;
  public showSuccessMessage = false;
  public showErrorMessage = false;
  public message = "";
  public dataSaved=false;
  public seqId: any;
  public vendors : any[];
  constructor(private master: MastersService, private FormService: FormVendorService,
                private route: ActivatedRoute, private router: Router, private progress: NgProgress) 
                { }
  ngOnInit() {
    this.progress.start();
    this.getAllVendors();
    const urls = this.router.url.split('/');
    this.action = urls[3];
    if(this.action === 'edit'){
      this.seqId = urls[4];
      this.loadDataToEdit(this.seqId).then(
        value => this.bindDataWithValue(this.FormService.fields,value));
    }
    
    this.bindFormFieldsConfig();
  }
  
  bindDataWithValue(fields,value){
    for(var i=0;i<this.FormService.fields.length;i++){
        if(value.data[0][this.FormService.fields[i].name] && this.FormService.fields[i].name=='vid'){
          this.FormService.fields[i].value = value.data[0][this.FormService.fields[i].name];
          this.FormService.fields[i].options = this.vendors;
        }else{
          this.FormService.fields[i].value = value.data[0][this.FormService.fields[i].name];
        }
      }
   this.fields = this.FormService.fields;
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
  getsubmitted(formvalues: Vendors) {
    if ( this.action === 'edit') {
      this.updateRecord(formvalues,this.seqId);
    } else  if( this.action === 'add') {
      this.insertNewRecord(formvalues);
    }
  }
  updateRecord(FormData,UpdateId) {
    this.FormService.updateVendor(FormData,UpdateId).subscribe((returnData: any) => {
      if( returnData.response === 'success') {
        this.showSuccessMessage = true;
        this.message = returnData.message;
      } else {
        this.showErrorMessage = true;
        this.message = returnData.message;
      }
      this.dataSaved = true;
    });
  }
  insertNewRecord( FormData ) {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.FormService.createVendor(FormData).subscribe((returnData: any) => {
      if( returnData.response === 'success') {
        this.showSuccessMessage = true;
        this.message = returnData.message;
      } else {
        this.showErrorMessage = true;
        this.message = returnData.message;
      }
      this.dataSaved = true;
    });
  }
  async loadDataToEdit(appId: number) {  
    return await this.FormService.getVendorById(appId).toPromise();
  }
  async getAllVendors() {
    await this.master.getVendors().subscribe((data) => {
      if(data.status && data.response=='success'){
       this.vendors = [];
       data.data.forEach((item, index) => {
        this.vendors.push({key: item.vid,label:item.vendor_name})
        });
        this.progress.done();
        if ( this.action === 'add') {
            for(var i=0;i<this.FormService.fields.length;i++){
                if( this.FormService.fields[i].name=='vid'){
                  this.FormService.fields[i].options = this.vendors;
                }
              }
            this.fields = this.FormService.fields;
        }
      }
    });
}
  ngDistroy() {
    this.unsubcribe();
  }

}
