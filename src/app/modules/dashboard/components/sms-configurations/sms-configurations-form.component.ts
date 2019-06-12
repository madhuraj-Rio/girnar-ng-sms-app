import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../../shared/dashboard/masters.service';
import { Senders } from '../../../../models/dashboard-data-models';
import { FormGroup, FormControl } from '@angular/forms';
import { FormSmsConfigService } from '../../../../shared/forms/form-sms-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, from, forkJoin, pipe, of } from 'rxjs';

import { switchMap, mergeMap, tap, map } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-form',
  templateUrl: './sms-configurations-form.component.html',
  styleUrls: [],
  providers: [MastersService, FormSmsConfigService]
})
export class SmsConfigurationsFormComponent implements OnInit {

  public form: FormGroup;
  unsubcribe: any;
  public fields: Array<any>;
  public action: any;
  public showSuccessMessage = false;
  public showErrorMessage = false;
  public message = "";
  public dataSaved = false;
  public seqId: any = '';
  public vendors: any[];
  public companies: any[];
  public divisions: any[];
  public entities: any[];
  public sources: any[];
  public senders: any[];
  public fieldsDataObj = {};

  public formFieldsMapWithKeys: any[];
  constructor(private master: MastersService, private FormService: FormSmsConfigService,
    private route: ActivatedRoute, private router: Router, private progress: NgProgress) { }
  ngOnInit() {
    //this.getAllVendors();
    this.progress.start();
    const urls = this.router.url.split('/');
    this.action = urls[3];
    if (this.action === 'edit') {
      this.seqId = urls[4];
      this.loadDataToForm();
    } else {
      this._bindAllDataFromServices();
    }

  }
  loadDataToForm() {
    this.progress.start();
    if (this.seqId == "") {
      return false;
    }
    this.FormService.getConfigById(this.seqId).pipe(
      switchMap(config => {
        return forkJoin(of(config),
          this.master.getCompanies(),
          this.master.getDivisions(config.data[0].company_id),
          this.master.getEntities(config.data[0].division_id),
          this.master.getVendors(),
          this.master.getSenders(),
          this.master.getSmsSources(config.data[0].vendor_id_first)
        )
      })
    ).subscribe(result => {
      var bindFieldsData = {};
      bindFieldsData['company_id'] = result[1].data.map(item => { return { "key": item.id, "label": item.name } });
      bindFieldsData['division_id'] = result[2].data.map(item => { return { "key": item.id, "label": item.name } });
      bindFieldsData['entity_id'] = result[3].data.map(item => { return { "key": item.id, "label": item.name } });
      bindFieldsData['vendor_id_first'] = result[4].data.map(item => { return { "key": item.vid, "label": item.vendor_name } });
      bindFieldsData['sender_id'] = result[5].data.map(item => { return { "key": item.sid, "label": item.sender_label } });
      bindFieldsData['source_id'] = result[6].data.map(item => { return { "key": item.id, "label": item.name } });
      this.bindDataWithValue(bindFieldsData, result[0])
      this.progress.done();
      //console.log(result);
    },
      err => console.log('HTTP Error', err));
  }
  bindDataWithValue(fields, value) {
    this.formFieldsMapWithKeys = [];
    for (var i = 0; i < this.FormService.fields.length; i++) {
      this.formFieldsMapWithKeys.push(this.FormService.fields[i].name);
      if (fields[this.FormService.fields[i].name] !== undefined) {
        this.FormService.fields[i].options = fields[this.FormService.fields[i].name];
      }
      if (value != null) {
        this.FormService.fields[i].value = value.data[0][this.FormService.fields[i].name];
      }
    }
    this.fields = this.FormService.fields;
    this.bindFormFieldsConfig();
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
            this.bindOptionsToComboBox(event, field);
          };
        }
      });
    }
  }
  bindOptionsToComboBox(event, field) {
    if (field.dependentField != "") {
      if (field.dependentField == 'division_id') {
        this.getDivisions(event, field);
      } else if (field.dependentField == 'entity_id') {
        this.getEntities(event, field);
      } else if (field.dependentField == 'source_id') {
        this.getSources(event, field);
      }
    }
  }
  getsubmitted(formvalues: Senders) {
    this.progress.start();
    if (this.action === 'edit') {
      this.updateRecord(formvalues, this.seqId);
    } else if (this.action === 'add') {
      this.insertNewRecord(formvalues);
    }
    this.progress.done();
  }
    updateRecord(FormData,UpdateId) {
      this.FormService.updateConfig(FormData,UpdateId).subscribe((returnData: any) => {
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
  insertNewRecord(FormData) {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.FormService.createConfig(FormData).subscribe((returnData: any) => {
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
  async loadDataToEdit(appId: number) {
    // return await this.FormService.getSenderById(appId).toPromise();
  }
  _bindAllDataFromServices() {
    this.master.getCompanies().subscribe((data) => {
      if (data.status && data.response == 'success') {
        this.companies = [];
        data.data.forEach((item, index) => {
          this.companies.push({ key: item.id, label: item.name })
        });
        this.getAllVendors();
        this.getSenders('', '');
        var fieldsd = {};
        fieldsd["company_id"] = this.companies;
        return this.bindDataWithValue(fieldsd, null);
      }
    });
  }
  async getAllVendors() {
    await this.master.getVendors().subscribe((data) => {
      if (data.status && data.response == 'success') {
        this.vendors = [];
        data.data.forEach((item, index) => {
          this.vendors.push({ key: item.vid, label: item.vendor_name })
        });

        var keyitrm = this.formFieldsMapWithKeys.indexOf('vendor_id_first');
        this.FormService.fields[keyitrm].options = this.vendors;
      }
    });
  }
  async getCompanies() {
    await this.master.getCompanies().subscribe((data) => {
      if (data.status && data.response == 'success') {
        this.companies = [];
        data.data.forEach((item, index) => {
          this.companies.push({ key: item.id, label: item.name })
        });

      }
    });
  }
  getDivisions(eventval, field) {
    var key = this.formFieldsMapWithKeys.indexOf(field.dependentField);
    if (eventval == "") {
      this.FormService.fields[key].options = [];
      if (field.name == 'company_id') {
        this.FormService.fields[this.formFieldsMapWithKeys.indexOf('entity_id')].options = [];
      }
    } else {
      this.progress.start();
      this.master.getDivisions(eventval).subscribe((data) => {
        if (data.status && data.response == 'success') {
          this.divisions = [];
          data.data.forEach((item, index) => {
            this.divisions.push({ key: item.id, label: item.name })
          });
          this.FormService.fields[key].options = this.divisions;

        } else {
          this.FormService.fields[key].options = [];
        }
        this.progress.done();
      });
    }
  }
  getEntities(eventval, field) {
    var key = this.formFieldsMapWithKeys.indexOf(field.dependentField);
    if (eventval == "") {
      this.FormService.fields[key].options = [];
    } else {
      this.progress.start();
      this.master.getEntities(eventval).subscribe((data) => {
        if (data.status && data.response == 'success') {
          this.entities = [];
          data.data.forEach((item, index) => {
            this.entities.push({ key: item.id, label: item.name })
          });
          this.FormService.fields[key].options = this.entities;

        } else {
          this.FormService.fields[key].options = [];
        }
        this.progress.done();
      });
    }
  }
  getSources(eventval, field) {
    var key = this.formFieldsMapWithKeys.indexOf(field.dependentField);
    if (eventval == "") {
      this.FormService.fields[key].options = [];
    } else {
      this.progress.start();
      this.master.getSmsSources(eventval).subscribe((data) => {
        if (data.status && data.response == 'success') {
          this.sources = [];
          data.data.forEach((item, index) => {
            this.sources.push({ key: item.id, label: item.name })
          });
          this.FormService.fields[key].options = this.sources;
        } else {
          this.FormService.fields[key].options = [];
        }
        this.progress.done();
      });
    }
  }
  getSenders(eventval, field) {
    //var keysw = this.formFieldsMapWithKeys.indexOf('sender_id');
    this.progress.start();
    this.master.getSenders().subscribe((data) => {
      var keysw = this.formFieldsMapWithKeys.indexOf('sender_id');
      if (data.status && data.response == 'success') {
        this.senders = [];
        data.data.forEach((item, index) => {
          this.senders.push({ key: item.sid, label: item.sender_label })
        });
        this.FormService.fields[keysw].options = this.senders;
      } else {
        this.FormService.fields[keysw].options = [];
      }
      this.progress.done();
    });

  }
  ngDistroy() {
    this.unsubcribe();
  }

}
