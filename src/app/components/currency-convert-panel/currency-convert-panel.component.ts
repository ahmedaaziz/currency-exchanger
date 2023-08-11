import { currencies } from './../../shared/currencies';
import { Component, OnInit } from '@angular/core';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable, filter, find, from, map, of } from "rxjs";
import { CurrenciesServiceService } from "src/app/services/currencies-service.service";
@Component({
  selector: 'app-currency-convert-panel',
  templateUrl: './currency-convert-panel.component.html',
  styleUrls: ['./currency-convert-panel.component.scss']
})
export class CurrencyConvertPanelComponent implements OnInit {

  i:number = 1;
  // fontawesome icon
  exchanger = faArrowRightArrowLeft;
  baseCurrency:string = 'EUR'; // default currencies
  toCurrency:string = 'USD'; // default currencies
  amount:number = 1;
  rate: any = {};
  rates: any[] = [];
  rateKeys: any[] = [];
  currencies:any = currencies;
  result:any = 0;

  constructor(private ratesService:CurrenciesServiceService){}
  currencies$ = from(this.ratesService.getCurrenciesRates())

  ngOnInit(): void {
    this.init()

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.getCurrencyRate(this.baseCurrency,this.toCurrency,this.amount);
  }

init(){
  this.currencies$.pipe().subscribe({
    next:((data)=>{
      this.rate = data;
      this.rateKeys = Object.keys(this.rate)
      console.log(this.rate);
      console.log(this.rateKeys);
      for(var i = 0; i<this.rateKeys.length; i++) {
        this.rates.push({
          code: this.rateKeys[i],
          rate: this.rate[this.rateKeys[i]]
        })
      }
      console.log(this.rates);
    }),
    error:((error)=>{
      console.error(error.message)
    }),
    complete:(()=>{})
  })
}
changeAmount(event:any) {
  this.amount = event.target.value
}
changeCurrencyBase(event:any){
  this.baseCurrency = event.target.value;
  console.log(this.baseCurrency)
}
changeCurrencyExchange(event:any){
  this.toCurrency = event.target.value;
  console.log(this.toCurrency)
}


/**
 * baseCurrency 1
 * Currency
 * amount
 */

convertCurrencies() {
  console.log(this.baseCurrency);

  //get index of currencies
  let fromCurrencyIndex = this.rates.findIndex((rate)=> {
   return  rate.code === this.baseCurrency
  })
  let toCurrencyIndex = this.rates.findIndex((rate)=> {
   return rate.code === this.toCurrency
  })

  // get ration from & to
  let ratio = this.rates[fromCurrencyIndex].rate / this.rates[toCurrencyIndex].rate
  this.result = ratio * this.amount
  console.log(ratio * this.amount);



}

}
