import { Component, OnInit } from '@angular/core';
import { popularCurrencies } from "src/app/shared/topRatedCurrncies";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public popularCurrencies:any[] = popularCurrencies;
  constructor(){}
  ngOnInit(): void {

  }
}
