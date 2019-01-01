import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError, tap } from "rxjs/operators";
import { Globals } from '@shared/models/Global';
import { PotentialEarning } from '@shared/models/PotentialEarning.model';
import { ErrorHandlerService } from './error-handler.service';
import { RequestResult } from '@shared/models/RequestResult';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class PotentialEarningService {
  private baseUrl: string;
  private _list: Array<PotentialEarning>;

  constructor(
    private http: HttpClient,
    private global: Globals,
    private errHandler: ErrorHandlerService
  ) {
    this.baseUrl = global.BASE_URL + 'potential-earning';    
  }

  get list(): Array<PotentialEarning> {
    return this._list;
  }

  /** GET: retrieve entities from the server */
  public getPotentialEarnings(): Observable<RequestResult> {
    return this.http
      .get<RequestResult>(`${this.baseUrl}/get-potential-earnings`, httpOptions)
      .pipe(
        tap(() => this.log("get-potential-earnings")),
        catchError(this.errHandler.handleError)
      );
  }

  /** GET: retrieve single entity from the server */
  public getPotentialEarningById(id: number): Observable<PotentialEarning> {
    return this.http
      .get<PotentialEarning>(`${this.baseUrl}/get-potential-earning/${id}`, httpOptions)
      .pipe(
        tap(() => this.log("get-potential-earning")),
        catchError(this.errHandler.handleError)
      );
  }

  /** POST: create a new entity to the server */
  public createPotentialEarning(potentialEarning: PotentialEarning): Observable<any> {
    return this.http
      .post<PotentialEarning>(`${this.baseUrl}/create-potential-earning`, potentialEarning, httpOptions)
      .pipe(
        tap(_ => this.log(`create potential earning with id=${potentialEarning.id}`)),
        catchError(this.errHandler.handleError)
      );
  }

  /** DELETE: delete the entity from the server */
  public deletePotentialEarning(pe: string | number): Observable<any> {
    return this.http
      .delete<PotentialEarning>(`${this.baseUrl}/delete-potential-earning/${pe}`)
      .pipe(
        tap(_ => this.log(`deleted potential earning id=${pe}`)),
        catchError(this.errHandler.handleError)
      );
  }

  /** PUT: update the entity on the server */
  public updateMenu(potentialEarning: PotentialEarning): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/update-potential-earning`, potentialEarning, httpOptions)
      .pipe(
        tap(_ => this.log(`updated potential earning id=${potentialEarning.id}`)),
        catchError(this.errHandler.handleError)
      );
  }

  /** Log a MenuService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`MenuService: ${message}`);
  }
}
