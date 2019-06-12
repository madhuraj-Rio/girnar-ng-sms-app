import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import { Sources } from '../../../../models/dashboard-data-models';
import { FormGroup, FormControl } from '@angular/forms';
import { FormSourceService } from '../../../../shared/forms/form-source.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './sms-source-form.component.html',
  styleUrls: [],
  providers: [MastersService, FormSourceService]
})
export class SmsSourceFormComponent implements OnInit {

  public form: FormGroup;
  unsubcribe: any;
  public fields: Array<any>;
  public action: any;
  public showSuccessMessage = false;
  public showErrorMessage = false;
  public message = "";
  public dataSaved=false;
  public seqId: any="";
  public vendors : any[];
  constructor(private master: MastersService, private FormService: FormSourceService,
                private route: ActivatedRoute, private router: Router) 
                { }
  ngOnInit() {
    
    var urls = this.router.url.split("/");
    this.action = urls[3];
    if (this.action === 'edit') {
      this.seqId = urls[4];
    }
    this._bindAllDataFromServices();
   // this.bindFormFieldsConfig();
  }
  
  bindDataWithValue(fields, value) {
    for (var i = 0; i < this.FormService.fields.length; i++) {
      if (value != null) {
        if (value.data[0][this.FormService.fields[i].name] && this.FormService.fields[i].name == 'vid') {
          this.FormService.fields[i].value = value.data[0][this.FormService.fields[i].name];
          this.FormService.fields[i].options = this.vendors;
        } else {
          this.FormService.fields[i].value = value.data[0][this.FormService.fields[i].name];
        }
      }
      else {
        if (this.FormService.fields[i].name == 'vid') {
          this.FormService.fields[i].options = this.vendors;
        }
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
  getsubmitted(formvalues: Sources) {
    if ( this.action === 'edit') {
      this.updateRecord(formvalues,this.seqId);
    } else  if( this.action === 'add') {
      this.insertNewRecord(formvalues);
    }
  }
  updateRecord(FormData,UpdateId) {
    this.FormService.updateSource(FormData,UpdateId).subscribe((returnData: any) => {
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
    this.FormService.createSource(FormData).subscribe((returnData: any) => {
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
    return await this.FormService.getSourceById(appId).toPromise();
  }
  _bindAllDataFromServices() {
    this.master.getVendors().subscribe((data) => {
      if (data.status && data.response == 'success') {
        this.vendors = [];
        data.data.forEach((item, index) => {
          this.vendors.push({ key: item.vid, label: item.vendor_name })
        });
        if(this.seqId != ""){
         this.FormService.getSourceById(this.seqId).subscribe((loadData)=>{
            return this.bindDataWithValue(this.vendors,loadData);
          })
        }
        else {
          return this.bindDataWithValue(this.vendors,null);
        }
      }
    });
  }
 
  ngDistroy() {
    this.unsubcribe();
  }

}
