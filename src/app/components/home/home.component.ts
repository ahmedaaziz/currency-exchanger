import { Component, OnInit } from '@angular/core';
import { popularCurrencies } from "src/app/shared/topRatedCurrncies";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public popularCurrencies:any[] = popularCurrencies;
  baseCurrency:string = 'Euro';
  toCurrency:string = 'USD';
  currenciesUpdated:any = [];
  list:any[] = [];
  constructor(){
  }
  ngOnInit(): void {
  }

  getRates(data:any){
    this.currenciesUpdated = data;
    this.filterRates(this.currenciesUpdated,this.popularCurrencies)
  }

  filterRates(a:any[],b:any[]){
    this.list = [];
    for(var i = 0; i < a.length;i++) {
      for(var e = 0; e < b.length; e++){
        if(a[i].currencyCode === b[e].symbol){
          this.list.push(a[i])
        }
      }
    }
  }




}
