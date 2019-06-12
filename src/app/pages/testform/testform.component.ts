import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {FormSmsMainService} from '../../shared/forms/form-sms-main.service';
@Component({

  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.css']
})
export class TestformComponent implements OnInit {
  public form: FormGroup;
  unsubcribe: any;
  public fields: any[];
  constructor(private formFields : FormSmsMainService) {
    this.fields =this.formFields.fields;
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields))
    })
    
   }

  ngOnInit() {

  }
  getFields() {
    return this.formFields.fields;
  }
  getsubmitted(sele){
    //this.fields = sele;
    console.log('parent',sele)
  }
  ngDistroy() {
    this.unsubcribe();
  }

}
