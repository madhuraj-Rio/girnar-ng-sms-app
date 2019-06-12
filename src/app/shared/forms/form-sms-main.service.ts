import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormSmsMainService {

  public fields: any[] = [
    {
      type: 'text',
      name: 'email-subjct',
      label: 'Email Subject',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'fromemail',
      label: 'From Email',
      value: '',
      required: false,
    },

    {
      type: 'text',
      name: 'to-email',
      label: 'To Email',
      value: '',
      required: true,
    },
    {
      type: 'dropdown',
      name: 'product',
      label: 'Product',
      value: '1',
      required: true,
      onUponChangeload: 'onChange(this)',
      options: [
        { key: '1', label: 'Car Dekho' },
        { key: '2', label: 'Tyre Dekho' },
        { key: '3', label: 'Bike Dekho' }
      ]
    },
    {
      type: 'dropdown',
      name: 'subproduct',
      label: 'Sub Product',
      value: 'in',
      required: true,
      options: []
    }

  ];
  constructor() { }

  getFields() {
    return this.fields;
  }
  onUpload(e) {
    console.log(e);

  }

}
