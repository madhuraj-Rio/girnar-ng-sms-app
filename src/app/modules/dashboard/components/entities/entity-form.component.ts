import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import { Entities } from '../../../../models/dashboard-data-models';
import { FormGroup, FormControl } from '@angular/forms';
import { FormEntityService } from '../../../../shared/forms/form-entity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
@Component({
  selector: 'app-form',
  templateUrl: './entity-form.component.html',
  styleUrls: [],
  providers: [MastersService, FormEntityService]
})
export class EntityFormComponent implements OnInit {

  public form: FormGroup;
  unsubcribe: any;
  public fields: Array<any>;
  public action: any;
  public showSuccessMessage = false;
  public showErrorMessage = false;
  public message = "";
  public dataSaved=false;
  public seqId: any="";
  public divisions : any[];
  constructor(private master: MastersService, private FormService: FormEntityService,
                private route: ActivatedRoute, private router: Router, private progress: NgProgress) 
                { }
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
    for (var i = 0; i < this.FormService.fields.length; i++) {
      if (value != null) {
        if (value.data[0][this.FormService.fields[i].name] && this.FormService.fields[i].name == 'division_id') {
          this.FormService.fields[i].value = value.data[0][this.FormService.fields[i].name];
          this.FormService.fields[i].options = this.divisions;
        } else {
          this.FormService.fields[i].value = value.data[0][this.FormService.fields[i].name];
        }
      }
      else {
        if (this.FormService.fields[i].name == 'division_id') {
          this.FormService.fields[i].options = this.divisions;
        }
      }
    }
    this.progress.done();
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
  getsubmitted(formvalues: Entities) {
    this.progress.start();
    if ( this.action === 'edit') {
      this.updateRecord(formvalues,this.seqId);
    } else  if( this.action === 'add') {
      this.insertNewRecord(formvalues);
    }
    this.progress.done();
  }
  updateRecord(FormData,UpdateId) {
    this.FormService.updateEntity(FormData,UpdateId).subscribe((returnData: any) => {
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
    this.FormService.createEntity(FormData).subscribe((returnData: any) => {
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
    return await this.FormService.getEntityById(appId).toPromise();
  }
  _bindAllDataFromServices() {
    this.master.getDivisions('').subscribe((data) => {
      if (data.status && data.response == 'success') {
        this.divisions = [];
        data.data.forEach((item, index) => {
          this.divisions.push({ key: item.id, label: item.name })
        });
        if(this.seqId != ""){
         this.FormService.getEntityById(this.seqId).subscribe((loadData)=>{
            return this.bindDataWithValue(this.divisions,loadData);
          })
        }
        else {
          return this.bindDataWithValue(this.divisions,null);
        }
      }
    });
  }
  ngDistroy() {
    this.unsubcribe();
  }

}
