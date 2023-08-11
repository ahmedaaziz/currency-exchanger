import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, catchError, filter, from, map, switchMap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrenciesServiceService {

  constructor(private http:HttpClient) { }
  url:string = environment.baseUrl;
  key:string = environment.access_key;


/**
 * http://data.fixer.io/api/convert
    ? access_key = 645f0b376501478c5d9529c2cfbcb840
    & from = GBP
    & to = JPY
    & amount = 25
*/


  getCurrenciesRates(): Observable<object>{

    return this.http.get(
      `${this.url}latest?access_key=${this.key}`).pipe(
      ).pipe(
        map((data:any)=>{
          return data?.rates
        }),
        catchError((err)=>{
          return throwError('Error', err)
        })
      )
  }
}
