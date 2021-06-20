import { Component, OnInit } from '@angular/core';
import {AppConstants} from "../../../shared/AppConstants";
import { Module } from '@ag-grid-community/core';
import {InfiniteRowModelModule} from "@ag-grid-community/all-modules";
import {GroceryReportService} from "../../service/grocery-report.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-max-price-report',
  templateUrl: './max-price-report.component.html',
  styleUrls: ['./max-price-report.component.css']
})
export class MaxPriceReportComponent implements OnInit {
  gridApi: any;
  gridColumnApi: any;

  modules: Module[] = [InfiniteRowModelModule];
  columnDefs: any;
  defaultColDef: any;
  components: any;
  rowBuffer: any;
  rowSelection: any;
  rowModelType: any;
  paginationPageSize: any;
  cacheOverflowSize: any;
  maxConcurrentDatasourceRequests: any;
  infiniteInitialRowCount: any;
  maxBlocksInCache: any;
  rowData!: [];

  constructor(private groceryReportService: GroceryReportService, private router: Router) {
    this.columnDefs = [
      { field: 'name', headerName: 'Name', sortable: false, filter: false },
      { field: 'price', headerName: 'Max Price', sortable: false, filter: false },
      { field: 'priceDate', headerName: 'Date', sortable: false, filter: false }
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 90,
      resizable: true
    };
    this.components = {
      loadingRenderer: function (params: any) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return "<img src=\"https://www.ag-grid.com/example-assets/loading.gif\">";
        }
      },
    };
    this.rowBuffer = 0;
    this.rowSelection = 'multiple';
    this.rowModelType = 'infinite';
    this.paginationPageSize = AppConstants.GRID_DEFAULT_PAGE_SIZE;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1000;
    this.maxBlocksInCache = 10;
  }

  ngOnInit() {
    this.getMaxPriceTrendReport();
  }

  private getMaxPriceTrendReport() {
    return this.groceryReportService.getMaxPriceReport();
  }

  showItemPriceTrend(itemName: string){
    this.router.navigate(['reports/price-trend', itemName]);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getMaxPriceTrendReport().subscribe((data) => {
      let dataSource = {
          rowCount: null,
          getRows: function (params: any) {
            console.log(
              'asking for ' + params.startRow + ' to ' + params.endRow
            );
            setTimeout(function () {
              let rowsThisPage = data.slice(params.startRow, params.endRow);
              let lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api.setDatasource(dataSource);
      });
  }
}
