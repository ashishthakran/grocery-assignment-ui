import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaxPriceReportComponent } from './component/max-price-report/max-price-report.component';
import { PriceTrendReportComponent } from './component/price-trend-report/price-trend-report.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../app.routing.module";
import {AgGridModule} from "@ag-grid-community/angular";

@NgModule({
  declarations: [
    MaxPriceReportComponent,
    PriceTrendReportComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class GroceryModule { }
