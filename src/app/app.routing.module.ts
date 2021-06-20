import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MaxPriceReportComponent} from "./grocery/component/max-price-report/max-price-report.component";
import {PriceTrendReportComponent} from "./grocery/component/price-trend-report/price-trend-report.component";

const routes: Routes = [
  { path: '', redirectTo: 'reports/max-price', pathMatch: 'full' },
  { path: 'reports/max-price', component: MaxPriceReportComponent },
  { path: 'reports/price-trend/:itemName', component: PriceTrendReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
