
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Configs } from '../../models/dashboard-data-models'
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class FormSmsConfigService {


    public fields: any[] = [

        {
            type: 'dropdown',
            name: 'company_id',
            label: 'Company',
            value: '',
            dependentField: 'division_id',
            required: true,
            placeholder: 'Please select',
            options: [
            ]
        },
        {
            type: 'dropdown',
            name: 'division_id',
            label: 'Division',
            dependentField: 'entity_id',
            value: '',
            required: true,
            placeholder: 'Please select',
            options: [
            ]
        },
        {
            type: 'dropdown',
            name: 'entity_id',
            label: 'Entity',
            value: '',
            required: true,
            placeholder: 'Please select',
            options: [
            ]
        },
        //     {   type: 'dropdown',
        //     name: 'source_id',
        //     label: 'Config',
        //     value: '',
        //     required: true,
        //     placeholder: 'Please select',
        //     options: [
        //     ]
        //   },
        {
            type: 'dropdown',
            name: 'vendor_id_first',
            label: 'Vendor',
            dependentField: 'source_id',
            value: '',
            required: true,
            placeholder: 'Please select',
            options: [
            ]
        },
        {
            type: 'dropdown',
            name: 'source_id',
            label: 'Source',
            value: '',
            required: true,
            placeholder: 'Please select',
            options: [
            ]
        },
        {
            type: 'dropdown',
            name: 'sender_id',
            label: 'Sender',
            value: '',
            required: true,
            placeholder: 'Please select',
            options: []
        },
        {
            type: 'radio',
            name: 'sms_type',
            label: 'SMS Type',
            value: '',
            required: true,
            placeholder: 'Please select',
            options: [
                { key: 'transactional', label: 'Transactional' },
                { key: 'promotional', label: 'Promotional' }
            ]
        },
        {
            type: 'text',
            name: 'ips_whitelisted',
            label: 'Whitelistd IPs',
            value: '',
            required: true,
            pattern : '^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$'
        },
        {
            type: 'dropdown',
            name: 'check_duplicacy',
            label: 'Check Duplicacy',
            value: '',
            required: true,
            placeholder: 'Please select',
            options: [
                { key: '0', label: 'No' },
                { key: '1', label: 'Yes' }
            ]
        },
        {
            type: 'dropdown',
            name: 'check_dnd_status',
            label: 'Check DND',
            value: '',
            required: true,
            placeholder: 'Please select',
            options: [
                { key: '0', label: 'No' },
                { key: '1', label: 'Yes' }
            ]
        },
        {
            type: 'text',
            name: 'daily_limit_per_mobile',
            label: 'Daily Limit Per Mobile',
            pattern: '^[0-9]+',
            value: '',
            minlength: 1,
            maxlength: 4,
            required: true
        }, {
            type: 'text',
            name: 'weekly_limit_per_mobile',
            label: 'Weekly Limit Per Mobile',
            pattern: '^[0-9]+',
            minlength: 1,
            maxlength: 4,
            value: '',
            required: true
        }, {
            type: 'text',
            name: 'monthly_limit_per_mobile',
            label: 'Meekly Limit Per Mobile',
            pattern: '^[0-9]+',
            maxlength: 4,
            value: '',
            required: true
        },
        {
            type: 'text',
            name: 'daily_quota',
            pattern: '^[0-9]+',
            label: 'Daily Quota',
            maxlength: 4,
            value: '',
            required: true
        },
        {
            type: 'text',
            name: 'monthly_quota',
            label: 'Monthly Quota',
            pattern: '^[0-9]+',
            maxlength: 4,
            value: '',
            required: true
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
                { key: '1', label: 'Active' }
            ]
        },
        {
            type: 'radio',
            name: 'is_otp',
            label: 'Is OTP?',
            value: 'N',
            required: true,
            placeholder: 'Please select',
            options: [
                { key: 'N', label: 'No' },
                { key: 'Y', label: 'Yes' }
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
    createConfig(entity: Configs): Observable<Configs> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Configs>(this.apiUrl + 'config/addnew', entity, httpOptions);
    }
    updateConfig(entity: Configs, id: number): Observable<Configs> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<Configs>(this.apiUrl + 'config/update/' + id, entity, httpOptions);
    }
    getConfigById(ConfigId: number): Observable<any> {
        return this.http.get(this.apiUrl + 'config/getRecordById/' + ConfigId).pipe(
            map(this.extractData));
    }
}
