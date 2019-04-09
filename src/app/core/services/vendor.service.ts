import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpRequest } from "@angular/common/http";
import { Globals } from '@shared/models/Global';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from "rxjs/Observable";
import { catchError, tap } from "rxjs/operators";
import { RequestResult } from '@shared/models/RequestResult';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};


@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private baseUrl: string;
  private baseUrlFileUpload: string;

  constructor(
    private http: HttpClient,
    private global: Globals,
    private errHandler: ErrorHandlerService
  ) {
    this.baseUrl = this.global.BASE_URL + 'vendor';    
    this.baseUrlFileUpload = this.global.BASE_URL_FILE_UPLOAD;
  }

  /** GET: retrieve entities from the server */
  public getVendors(): Observable<RequestResult> {
    return this.http
      .get<RequestResult>(`${this.baseUrl}/get-vendors`, httpOptions)
      .pipe(
        tap(() => this.log("get-vendor")),
        catchError(this.errHandler.handleError)
      );
  }

  /** GET: retrieve single entity from the server */
  public getVendorById(id: number): Observable<RequestResult> {
    return this.http
      .get<RequestResult>(`${this.baseUrl}/get-vendor/${id}`, httpOptions)
      .pipe(
        tap(() => this.log("get-vendor")),
        catchError(this.errHandler.handleError)
      );
  }

  /** POST: create a new entity to the server */
  public createVendor(vendor): Observable<any> {
    return this.http
      .post<RequestResult>(`${this.baseUrl}/create-vendor`, vendor, httpOptions)
  }

  /** DELETE: delete the entity from the server */
  public deleteVendor(vendor: string | number): Observable<RequestResult> {
    return this.http
      .delete<RequestResult>(`${this.baseUrl}/delete-vendor/${vendor}`)
      .pipe(
        tap(_ => this.log(`deleted vendor id=${vendor}`)),
        catchError(this.errHandler.handleError)
      );
  }

  /** PUT: update the entity on the server */
  public updateVendor(vendor): Observable<RequestResult> {
    return this.http
      .put<RequestResult>(`${this.baseUrl}/update-vendor`, vendor, httpOptions)
      .pipe(
        tap(_ => this.log(`updated vendor`)),
        catchError(this.errHandler.handleError)
      );
  }

  /** POST: Upload documents on the server */
  public pushFileToStorage(formdata: FormData): Observable<HttpEvent<{}>> { 
    const req = new HttpRequest('POST', `${this.baseUrlFileUpload}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  /** Log a MenuService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`MenuService: ${message}`);
  }
}
