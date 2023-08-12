import { FormGroup,Validators,FormControl } from "@angular/forms";
import { currencies } from './../../shared/currencies';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { from } from "rxjs";
import { CurrenciesServiceService } from "src/app/services/currencies-service.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-currency-convert-panel',
  templateUrl: './currency-convert-panel.component.html',
  styleUrls: ['./currency-convert-panel.component.scss']
})
export class CurrencyConvertPanelComponent implements OnInit,OnChanges {
  // @ts-ignore
  newForm:FormGroup;
  // fontawesome icon
  exchanger = faArrowRightArrowLeft;
  amount:number = 1;
  rate: any = {};
  rates: any[] = [];
  rateKeys: any[] = [];
  currencies:any = currencies;
  result:any = 0;
  toCurrencyRate:number = 0;
  fromId:number | null = null;
  toId:number | null = null;
  demo:any;
  demo1:any;

  constructor(
    private ratesService:CurrenciesServiceService,
    private route:Router){}
    currencies$ = from(this.ratesService.getCurrenciesRates())

    @Input() fromCurrency:string = '';
    @Input() toCurrency:string = '';
    @Output() OnCurrenciesCreated:EventEmitter<any> = new EventEmitter();
    ngOnInit(): void {
    this.newForm = new FormGroup({
      from: new FormControl("EUR",Validators.required),
      to: new FormControl("USD",Validators.required),
      amount: new FormControl(1,Validators.required)
    })
    this.init();

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.getCurrencyRate(this.baseCurrency,this.toCurrency,this.amount);
  }

  init(){
    this.currencies$.pipe().subscribe({
      next:((data)=>{
        this.rate = data;
        this.rateKeys = Object.keys(this.rate)
        for(var i = 0 ; i < this.rateKeys.length;i++) {
          this.rates.push({
            id:i + 1,
            currencyCode: this.rateKeys[i],
            currencyRate: this.rate[this.rateKeys[i]]
          })
        }
        this.onCurrenciesUpdated(this.rates)
      }),
      error:((err)=>{
        console.error(err.message)
      }),
      complete:(()=>{})
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.newForm.controls[0].patchValue(changes['fromCurrency'].currentValue)
  }
  updateCurrencies(value:any){
    this.OnCurrenciesCreated.emit(value)
  }
convertCurrencies() {
  let from = this.newForm.controls["from"].value;
  let to = this.newForm.controls["to"].value;
  let amount = this.newForm.controls['amount'].value
//get index of currencies
  let fromCurrencyIndex = this.rates.findIndex((rate)=> {
   return  rate.currencyCode === from
  })
  let toCurrencyIndex = this.rates.findIndex((rate)=> {
   return rate.currencyCode === to
  })
  this.fromId = fromCurrencyIndex;
  this.toId = toCurrencyIndex;

  // get ratio from & to
  this.toCurrencyRate = this.rates[toCurrencyIndex].currencyRate / this.rates[fromCurrencyIndex].currencyRate;

  let ratio = this.rates[toCurrencyIndex].currencyRate / this.rates[fromCurrencyIndex].currencyRate;
  this.result = ratio * amount
}

onCurrenciesUpdated(event:any){
    this.OnCurrenciesCreated.emit(event)
}

swapper(){
  let from = this.newForm.controls["from"].value;
  let to = this.newForm.controls["to"].value;
  // let amount = this.newForm.controls['amount'].value
  from = to
}
  navigateTo(){
    let from = this.newForm.controls["from"].value;
    let to = this.newForm.controls["to"].value;
    let amount = this.newForm.controls['amount'].value;
    this.ratesService.navigatToURL(from,to)
  }
}
