import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import {ActivatedRoute, Router} from '@angular/router';
import {GroceryReportService} from "../../service/grocery-report.service";
import {PriceTrendReport} from "../../model/PriceTrendReport";

@Component({
  selector: 'app-price-trend-report',
  templateUrl: './price-trend-report.component.html',
  styleUrls: ['./price-trend-report.component.css']
})
export class PriceTrendReportComponent implements OnInit {

  private itemName!: string;
  private priceTrendReport!: Observable<PriceTrendReport[]>;

  constructor(private route: ActivatedRoute,private router: Router, private groceryReportService: GroceryReportService) {}

  ngOnInit() {
    this.itemName = this.route.snapshot.params['name'];
    this.getPriceTrendReport();
  }

  getPriceTrendReport() {
    this.priceTrendReport = this.groceryReportService.getPriceTrendReport(this.itemName);
  }

  navigateToMaxPriceReport(){
    this.router.navigate(['reports/max-price']);
  }
}
