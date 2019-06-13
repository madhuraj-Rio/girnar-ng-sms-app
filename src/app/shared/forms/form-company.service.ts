import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Company } from '../../models/dashboard-data-models'
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FormCompanyService {

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
      value: '',
      emailValid :true,
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
      name: 'settings',
      label: 'Settings',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'mapped_product',
      label: 'Mapped Product',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'param',
      label: 'Parameter',
      value: '',
      required: true,
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
  createCompany(company: Company): Observable<Company> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Company>(this.apiUrl + 'company/addnew', company, httpOptions);
  }
  updateCompany(company: Company, id: number): Observable<Company> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Company>(this.apiUrl + 'company/update/' + id, company, httpOptions);
  }

  getCompanyById(companyId: number): Observable<any> {
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  
    // return this.http.post<Company>(this.apiUrl + 'smsapirequest', { mobile:'6877776879', 
    // priority:'1', dlr:'1', message:'ets  tstdttd tsdtsd 12',source:"old car",api_keys:'6ede084e37c6'}, httpOptions);
   return this.http.get(this.apiUrl + 'company/getRecordById/' + companyId).pipe(
     map(this.extractData));
  }
}
