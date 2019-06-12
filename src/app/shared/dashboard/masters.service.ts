import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})


export class MastersService {
  endpoint = environment.apiUrl;
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {

    return this.http.get(this.endpoint + 'master/country-list').pipe(
      map(this.extractData));
  }
  getDivisions(Fid): Observable<any> {
    var concatUrl ="";
    if(Fid != undefined)
      concatUrl ="/"+Fid;

    return this.http.get(this.endpoint + 'master/division-list'+concatUrl).pipe(
      map(this.extractData));
  }
  getEntities(Fid): Observable<any> {
    var concatUrl ="";
    if(Fid != undefined)
      concatUrl ="/"+Fid;
    return this.http.get(this.endpoint + 'master/entities-list'+concatUrl).pipe(
      map(this.extractData));
  }
  getSmsSources(Fid): Observable<any> {
    var concatUrl ="";
    if(Fid != undefined)
      concatUrl ="/"+Fid;
    return this.http.get(this.endpoint + 'master/source-list'+concatUrl).pipe(
      map(this.extractData));
  }
  getVendors(): Observable<any> {
    return this.http.get(this.endpoint + 'master/vendor-list').pipe(
      map(this.extractData));
  }
  getSenders(): Observable<any> {
    return this.http.get(this.endpoint + 'master/sender-list').pipe(
      map(this.extractData));
  }
  getSmsConfigs(): Observable<any> {
    return this.http.get(this.endpoint + 'master/sms-config-list').pipe(
      map(this.extractData));
  }
}
