import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CurrenciesServiceService } from "src/app/services/currencies-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menu = faBars;
  constructor(
    private service:CurrenciesServiceService
  ){}

  ngOnInit(): void {

  }

  navigateTo(fromCurrency:string,toCurrency:string){
    this.service.navigatToURL(fromCurrency,toCurrency)
  }
}
