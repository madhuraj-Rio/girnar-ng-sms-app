import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Vendors } from '../../models/dashboard-data-models'
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class FormVendorService {

    public fields: any[] = [
        {
            type: 'text',
            name: 'vendor_name',
            label: 'Vendor Name',
            value: '',
            maxlength: '20',
            required: true,
        },
        {
            type: 'text',
            name: 'vendor_address',
            label: 'Vendor Address',
            value: '',
            maxlength: '80',
            required: false,
        },
        {
            type: 'text',
            name: 'vendor_email',
            label: 'Vendor email',
            emailValid :true,
            value: '',
            required: true,
        },
        {
            type: 'text',
            name: 'vendor_mobile',
            label: 'Vendor Mobile',
            minlength: '10',
            maxlength: '10',
            pattern: '^[6-9][0-9]{9}$',
            value: '',
            required: true,
        },
        {
            type: 'text',
            name: 'vendor_website',
            label: 'Vendor Website',
            value: '',
            required: false,
        },
        {
            type: 'text',
            name: 'vendor_spoc_name',
            label: 'Vendor Spoc Name',
            value: '',
            maxlength: '20',
            required: false,
        },
        {
            type: 'text',
            name: 'vendor_spoc_mobile',
            label: 'Vendor Spoc Mobile',
            minlength: '10',
            maxlength: '10',
            pattern: '^[6-9][0-9]{9}$',
            value: '',
            required: false,
        },
        {
            type: 'text',
            name: 'vendor_spoc_email',
            label: 'Vendor spoc email',
            emailValid :true,
            value: '',
            required: true,
        },
        {
            type: 'text',
            name: 'vendor_tech_name',
            label: 'Vendor Tech Name',
            maxlength: '20',
            value: '',
            required: true,
        },
        {
            type: 'text',
            name: 'vendor_tech_mobile',
            label: 'Vendor Tech Mobile',
            minlength: '10',
            maxlength: '10',
            pattern: '^[6-9][0-9]{9}$',
            value: '',
            required: true,
        }, {
            type: 'text',
            name: 'vendor_tech_email',
            label: 'Vendor Tech Email',
            emailValid :true,
            value: '',
            required: false,
        },
        {
            type: 'text',
            name: 'vendor_support_email',
            label: 'Vendor Suppport Email',
            emailValid : true,
            value: '',
            required: false,
        },
        {
            type: 'text',
            name: 'vendor_invoice_email',
            label: 'Vendor Invoice Email',
            emailValid :true,
            value: '',
            required: false,
        },
        {
            type: 'text',
            name: 'vendor_dispute_email',
            label: 'Vendor Dispute Email',
            emailValid :true,
            value: '',
            required: false,
        },
        {
            type: 'dropdown',
            name: 'vendor_type',
            label: 'Vendor Type',
            value: '',
            required: true,
            placeholder: 'Please select',
            options: [
                { key: 'pincacle', label: 'PINACLE' },
                { key: 'root', label: 'Root Mobile' },
                { key: 'acl', label: 'ACL' }
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
    createVendor(vendor: Vendors): Observable<Vendors> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Vendors>(this.apiUrl + 'vendor/addnew', vendor, httpOptions);
    }
    updateVendor(vendor: Vendors, id: number): Observable<Vendors> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<Vendors>(this.apiUrl + 'vendor/update/' + id, vendor, httpOptions);
    }

    getVendorById(vendorId: number): Observable<any> {
        return this.http.get(this.apiUrl + 'vendor/getRecordById/' + vendorId).pipe(
            map(this.extractData));
    }

}
