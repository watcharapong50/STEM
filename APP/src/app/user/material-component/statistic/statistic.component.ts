import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { MeterService } from '../../../shared/meter.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})

export class StatisticComponent implements OnInit {
  monthSelected: string;
  yearSelected = '2018';


  userDetails;
  constructor(
    private userService: UserService,
    public dialogMeter: MatDialog
  ) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
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
    this.monthSelected = month[time];
  }

  onSubmit() {
    console.log(this.monthSelected)
    console.log(this.yearSelected)
    console.log(this.userDetails.room);
  }

  openDialog(element): void {
    let dialogRef = this.dialogMeter.open(StatisticReportUser, {
      width: '80%',
      data: {
        month: this.monthSelected,
        year: this.yearSelected,
        room: this.userDetails.room
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}


@Component({
  selector: 'app-ReportData',
  templateUrl: './static.html'
})
export class StatisticReportUser implements OnInit {
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
    this.userService.exportAsExcelFile(this.Data, this.data.month + this.data.year + "Statistic_Room" + this.data.room);
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
    public dialogRef: MatDialogRef<StatisticReportUser>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private meterService: MeterService,
    private userService: UserService
  ) { }
}