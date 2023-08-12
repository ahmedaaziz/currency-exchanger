import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { from } from "rxjs";
import { CurrenciesServiceService } from "src/app/services/currencies-service.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  currencyDetails:{} = {};
  fromCurrency:string = '';
  toCurrency:string = '';
  // date:any = new Date().toJSON().slice(0,10);
  today = new Date();
  lastYear = new Date().getFullYear() - 1 ;
  pastDate =new Date(this.lastYear,this.today.getMonth()+1,0).toJSON().slice(0,10)
  historicalRate:any[] = [];
  constructor(
    private route:ActivatedRoute,
    private service:CurrenciesServiceService

  ){
      this.route.params.subscribe(params => {
      this.currencyDetails = params;
      this.fromCurrency = params['fromCurrency'];
      this.toCurrency = params['toCurrency']
    })
  }
  ngOnInit(): void {
    this.historicalRates(this.pastDate,this.toCurrency);
  }

  historicalRates(date:string,toCurrency:string){
    this.service.getHistoricalRates(date,this.toCurrency).pipe().subscribe(
      {
      next:((data)=>{
        let currencies = Object.keys(data)
        for(var i = 0; i < currencies.length;i++) {
        this.historicalRate.push({
          currency: currencies[i],
          rate: data[currencies[i]]
        })
        }
      }),
      error:((err)=>{
        console.error(err.message)
      }),
      complete:(()=>{})
    })
  }
}
