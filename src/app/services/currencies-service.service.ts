import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, catchError, map } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CurrenciesServiceService {

  constructor(
    private http:HttpClient,
    private route:Router
    ) { }
  url:string = environment.baseUrl;
  key:string = environment.access_key;




  getCurrenciesRates(): Observable<object>{

    return this.http.get(
      `${this.url}latest?access_key=${this.key}`).pipe(
      ).pipe(
        map((data:any)=>{
          return data["rates"]
        }),
        catchError((err)=>{
          throw new Error('Error', err)
        })
      )
  }


  navigatToURL(fromCurrency:string,toCurrency:string){
    this.route.navigate(['details/',{fromCurrency:fromCurrency,toCurrency:toCurrency}])
  }
  // http://data.fixer.io/api/2013-12-24
  //     ? access_key = 645f0b376501478c5d9529c2cfbcb840
  //     & base = GBP // add base allowed only in premium plan
  //     & symbols = USD,CAD,EUR


  getHistoricalRates(date:string,toCurrency:string){
    return this.http.get(
      `${this.url}${date}?access_key=${this.key}&symbols=${toCurrency}`
    ).pipe(
      map((data:any)=>{
        return data['rates']
      })
    )
  }
}
