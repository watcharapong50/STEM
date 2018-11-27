import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MeterService } from '../../../shared/meter.service';
import { UserService } from '../../../shared/user.service';
import { NotificationService } from '../../../shared/notification.service';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

export interface Month {
  month: string;
}

export interface Year {
  year: string;
}


@Component({
  selector: 'app-electric-bill',
  templateUrl: './electric-bill.component.html',
  styleUrls: ['./electric-bill.component.css']
})

export class ElectricBillComponent implements OnInit {

  selectedMonth: string;
  selectedYear: string = '2018';
  monthForm = new FormControl('', [Validators.required]);
  yearForm = new FormControl('', [Validators.required]);
  months: Month[] = [
    { month: 'January' }, { month: 'February' }, { month: 'March' }, { month: 'April' },
    { month: 'May' }, { month: 'June' }, { month: 'July' }, { month: 'August' },
    { month: 'September' }, { month: 'October' }, { month: 'November' }, { month: 'December' },
  ];

  years: Year[] = [
    { year: '2018' }
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private meterService: MeterService,
    public dialogMeter: MatDialog
  ) { }
  dataSource;
  displayedColumns = ['room', 'start', 'actions', 'bill'];//, 'shortCircuit'

  data;
  ngOnInit() {
    this.meterService.showBillUserAll().subscribe(data => {
      if (!data) {
        return;
      }
      console.log(data);
      this.data = data
      console.log(this.data);

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
    this.selectedMonth = month[time];
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
    let dialogRef = this.dialogMeter.open(ReportData, {
      width: '95%',
      data: {
        month: this.selectedMonth,
        year: this.selectedYear,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}

@Component({
  selector: 'app-ReportData',
  templateUrl: './report.html'
})
export class ReportData implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  Data: any = [{}];

  dataSource
  displayedColumns = ['room', 'start', 'actions', 'bill'];
  ngOnInit(): void {
    this.meterService.report(this.data.month, this.data.year).subscribe(data => {
      if (!data) {
        return;
      }
      this.dataSource = data;
      this.Data = data;
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.data);
    })
  }
  exportAsXLSX(): void {
    this.userService.exportAsExcelFile(this.Data, this.data.month + this.data.year + "Bill");
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
    public dialogRef: MatDialogRef<ReportData>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private meterService: MeterService,
    private userService: UserService
  ) { }
}