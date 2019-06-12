import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Senders } from '../../models/dashboard-data-models'
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FormSenderService {
    
  public fields: any[] = [
    {
      type: 'text',
      name: 'sender_label',
      label: 'Label',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'sender_desc',
      label: 'Description',
      value: '',
      required: false,
    },

    {
      type: 'text',
      name: 'sender_vendors',
      label: 'Vendor',
      value: '',
      required: true,
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
  createSender(sender: Senders): Observable<Senders> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Senders>(this.apiUrl + 'sender/addnew', sender, httpOptions);
  }
  updateSender(sender: Senders, id: number): Observable<Senders> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Senders>(this.apiUrl + 'sender/update/' + id, sender, httpOptions);
  }

  getSenderById(senderId: number): Observable<any> {
    return this.http.get(this.apiUrl + 'sender/getRecordById/' + senderId).pipe(
      map(this.extractData));
  }

}
