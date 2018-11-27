import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { MatTableDataSource, MatSort, MatPaginator, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MeterService } from '../../../shared/meter.service';
import { UserService } from '../../../shared/user.service';



@Component({
  selector: 'app-statistic-admin',
  templateUrl: './statistic-admin.component.html',
  styleUrls: ['./statistic-admin.component.css']
})
export class StatisticAdminComponent implements OnInit {

  Monthselected: string;
  Yearselected = '2018';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private meterService: MeterService,
    public dialogMeter: MatDialog
  ) { }

  dataSource;
  displayedColumns = ['room', 'username', 'actions'];//, 'shortCircuit'
  ngOnInit() {
    this.meterService.showAllMeter().subscribe(data => {
      if (!data) {
        return;
      }
      console.log(data);

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })


    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    const time = new Date().getMonth()
    this.Monthselected = month[time];
  }

  searchKey: string;
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  openDialog(element): void {
    let dialogRef = this.dialogMeter.open(StatisticReportAdmin, {
      width: '80%',
      data: {
        month: this.Monthselected,
        year: this.Yearselected,
        room: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }
}
@Component({
  selector: 'app-ReportData',
  templateUrl: './st.html'
})
export class StatisticReportAdmin implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  Data: any = [{}];

  dataSource
  displayedColumns = ['ActiveEnergy', 'Frequency', 'LineCurrent', 'LineVoltage', 'date'];
  ngOnInit(): void {
    this.meterService.showStatistic(this.data.month, this.data.year, this.data.room).subscribe(data => {
      if (!data) {
        return;
      }
      this.dataSource = data;
      this.Data = data;
      console.log("data", data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.data);
    })
  }
  exportAsXLSX(): void {
    this.userService.exportAsExcelFile(this.Data, this.data.month + this.data.year + "Statistic");
  }
  searchKeyReport: string;
  onSearchClearReport() {
    this.searchKeyReport = "";
    this.applyFilterReport();
  }
  applyFilterReport() {
    this.dataSource.filter = this.searchKeyReport.trim().toLocaleLowerCase();
  }
  onClear() {
    this.dialogRef.close();
  }
  constructor(
    public dialogRef: MatDialogRef<StatisticReportAdmin>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private meterService: MeterService,
    private userService: UserService
  ) { }
}