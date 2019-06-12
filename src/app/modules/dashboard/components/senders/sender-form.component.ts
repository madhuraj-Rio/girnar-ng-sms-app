import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import { Senders } from '../../../../models/dashboard-data-models';
import { FormGroup, FormControl } from '@angular/forms';
import { FormSenderService } from '../../../../shared/forms/form-sender.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './sender-form.component.html',
  styleUrls: [],
  providers: [MastersService, FormSenderService]
})
export class SenderFormComponent implements OnInit {

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
  constructor(private master: MastersService, private FormService: FormSenderService,
                private route: ActivatedRoute, private router: Router) 
                { }
  ngOnInit() {
    //this.getAllVendors();
    const urls = this.router.url.split('/');
    this.action = urls[3];
    if(this.action === 'edit'){
      this.seqId = urls[4];
      this.loadDataToEdit(this.seqId).then(
        value => this.bindDataWithValue(this.FormService.fields,value));
    }else if ( this.action === 'add') {
        this.fields = this.FormService.fields;
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
  getsubmitted(formvalues: Senders) {
    if ( this.action === 'edit') {
      this.updateRecord(formvalues,this.seqId);
    } else  if( this.action === 'add') {
      this.insertNewRecord(formvalues);
    }
  }
  updateRecord(FormData,UpdateId) {
    this.FormService.updateSender(FormData,UpdateId).subscribe((returnData: any) => {
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
    this.FormService.createSender(FormData).subscribe((returnData: any) => {
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
    return await this.FormService.getSenderById(appId).toPromise();
  }
  async getAllVendors() {
    await this.master.getVendors().subscribe((data) => {
      if(data.status && data.response=='success'){
       this.vendors = [];
       data.data.forEach((item, index) => {
        this.vendors.push({key: item.vid,label:item.vendor_name})
        });
        
      }
    });
}
  ngDistroy() {
    this.unsubcribe();
  }

}
