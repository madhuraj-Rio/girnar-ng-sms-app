import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'dynamic-form-builder',
  template: `
    <form (ngSubmit)="onSubmit.emit(this.form.value)" [formGroup]="form" class="form-horizontal">
      <div *ngFor="let field of fields">
          <field-builder [field]="field" [form]="form"></field-builder>
      </div>
      <div class="form-row"></div>
      <div class="form-group row">
        <div class="col-md-3"></div>
        <div class="col-md-9">
          <button type="submit" [disabled]="!form.valid" class="btn btn-primary">Save</button>
        </div>
      </div>
    </form>
  `,
})
export class DynamicFormBuilderComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    let fieldsCtrls:{} = {};
   
    for (let f of this.fields) {
      var validators = new Array();
      if (f.type != 'checkbox') {
        if ( f.required ) {
          validators.push(Validators.required);
        } 
        if(f.pattern != undefined){
          validators.push(Validators.pattern(f.pattern));
        }
        if(f.emailValid != undefined){
          validators.push(Validators.email);
        }
        if(validators.length>0)
          fieldsCtrls[f.name] = new FormControl(f.value || '', validators);
        else
          fieldsCtrls[f.name] = new FormControl(f.value || '')

        
      } else {
        let opts = {};
        for (let opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts)
      }
    }
    console.log(fieldsCtrls)
    this.form = new FormGroup(fieldsCtrls);
  }

}
