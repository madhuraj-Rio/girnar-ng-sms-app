
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Sources } from '../../models/dashboard-data-models'
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class FormSourceService {
    public fields: any[] = [
        {
            type: 'text',
            name: 'source_name',
            label: 'Source name',
            value: '',
            required: true,
        },
        {
            type: 'dropdown',
            name: 'vid',
            label: 'Vendor',
            value: '',
            required: true,
            placeholder: 'Please select',
            options: []
        },
        {
            type: 'text',
            name: 'bu_name',
            label: 'BU Name',
            value: '',
            required: false,
        },
        {
            type: 'text',
            name: 'bu_spoc_name',
            label: 'BU spoc name',
            value: '',
            required: false,
        },

        {
            type: 'text',
            name: 'bu_spoc_mobile',
            label: 'BU Spoc mobile',
            minlength: '10',
            maxlength: '10',
            pattern: '^[6-9][0-9]{9}$',
            value: '',
            required: true,
        },
        {
            type: 'text',
            name: 'bu_spoc_email',
            label: 'BU Spoc email',
            emailValid :true,
            value: '',
            required: false,
        },
        {
            type: 'text',
            name: 'source_api_key',
            label: 'API KEY',
            value: '',
            maxlength: '25',
            required: false,
        },
        {
            type: 'text',
            name: 'source_ip_addresses',
            label: 'IP Address',
            value: '',
            pattern : '^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$',
            required: false
        },
        {
            type: 'text',
            name: 'source_sms_daily_quota',
            label: 'Daily SMS Quota',
            maxlength: '4',
            value: '',
            required: false,
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
    createSource(entity: Sources): Observable<Sources> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Sources>(this.apiUrl + 'source/addnew', entity, httpOptions);
    }
    updateSource(entity: Sources, id: number): Observable<Sources> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<Sources>(this.apiUrl + 'source/update/' + id, entity, httpOptions);
    }

    getSourceById(SourceId: number): Observable<any> {

        return this.http.get(this.apiUrl + 'source/getRecordById/' + SourceId).pipe(
            map(this.extractData));
    }
}
