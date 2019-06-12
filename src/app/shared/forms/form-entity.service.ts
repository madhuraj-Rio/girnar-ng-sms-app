import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Entities } from '../../models/dashboard-data-models'
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FormEntityService {
  public fields: any[] = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      emailValid :true,
      value: '',
      required: false,
    },

    {
      type: 'text',
      name: 'mobile',
      label: 'Mobile',
      minlength: '10',
      maxlength: '10',
      pattern: '^[6-9][0-9]{9}$',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'address',
      label: 'Address',
      value: '',
      required: false,
    },
    {
      type: 'text',
      name: 'city',
      label: 'City',
      value: '',
      required: false,
    },
    {
      type: 'text',
      name: 'pin_code',
      label: 'Pin code',
      value: '',
      required: false
    },
    {
      type: 'text',
      name: 'warranty_email',
      label: 'Warranty Email',
      emailValid :true,
      value: '',
      required: false,
    },
    {
      type: 'text',
      name: 'warranty_mobile',
      label: 'Warranty Mobile',
      minlength: '10',
      maxlength: '10',
      value: '',
      required: false,
    },
    {
      type: 'text',
      name: 'inventory_limit',
      label: 'Inventory Limit',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'balance',
      label: 'Balance',
      value: '',
      required: false,
    },
    {
      type: 'dropdown',
      name: 'division_id',
      label: 'Division',
      value: '',
      required: true,
      placeholder: 'Please select',
      options: [
        { key: '1', label: 'Girnar' }
      ]
    },
    {
      type: 'dropdown',
      name: 'owner_type',
      label: 'Owner Type',
      value: '',
      required: true,
      placeholder: 'Please select',
      options: [
        { key: 'Dealer', label: 'Dealer' },
        { key: 'Consumer', label: 'Consumer' }
      ]
    },
    {
      type: 'dropdown',
      name: 'dealer_types',
      label: 'Dealer Type',
      value: '',
      required: true,
      placeholder: 'Please select',
      options: [
        { key: '1', label: 'UC Dealer' },
        { key: '2', label: 'Services' },
        { key: '3', label: 'DSA' },
        { key: '4', label: 'Only finance' }
      ]
    },
    {
      type: 'dropdown',
      name: 'status',
      label: 'Status',
      value: '',
      required: true,
      placeholder: 'Please select',
      options: [
        { key: '0', label: 'InActive' },
        { key: '1', label: 'Active' },
        { key: '2', label: 'Deleted' }
      ]
    }

  ];
  apiUrl = environment.apiUrl;
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  constructor(private http: HttpClient) { }

  getFields() {
    return this.fields;
  }
  createEntity(entity: Entities): Observable<Entities> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Entities>(this.apiUrl + 'entity/addnew', entity, httpOptions);
  }
  updateEntity(entity: Entities, id: number): Observable<Entities> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Entities>(this.apiUrl + 'entity/update/' + id, entity, httpOptions);
  }

  getEntityById(EntityId: number): Observable<any> {

    return this.http.get(this.apiUrl + 'entity/getRecordById/' + EntityId).pipe(
      map(this.extractData));
  }
}
