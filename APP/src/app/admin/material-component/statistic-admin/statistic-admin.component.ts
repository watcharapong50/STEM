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
  DataTH: any = [{}];


  dataSource
  displayedColumns = ['date','ActiveEnergy' ];
  //, 'Frequency', 'LineCurrent', 'LineVoltage'
  ngOnInit(): void {
    this.meterService.showStatistic(this.data.month, this.data.year, this.data.room).subscribe(data => {
      if (!data) {
        return;
      }


      this.dataSource = data;
      this.Data = data;
      for (let i = 0; i < data.length; i++) {
        this.conTime(i)
      }

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })
    this.meterService.showStatisticTH(this.data.month, this.data.year, this.data.room).subscribe(data => {
      if (!data) {
        return;
      }
      this.DataTH = data['สถิติการใช้'];
      for (let i = 0; i < this.DataTH.length; i++) {
        this.conTimeLoad(i)
      }
    })
  }
  conTimeLoad(index) {
    var time = this.DataTH[index].เวลาที่บันทึก.split(",", 5)
    var day = this.conDayTH(time[0])
    var daynum = time[1]
    var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
    var year = this.conYearTh(time[3].split(" ", 2)[1]);
    var times = time[4]
    var data = times + daynum + " " + Month + " " + year;
    this.DataTH[index].เวลาที่บันทึก = data
  }
  conTime(index) {
    var time = this.Data[index].date.split(",", 5)
    var day = this.conDayTH(time[0])
    var daynum = time[1]
    var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
    var year = this.conYearTh(time[3].split(" ", 2)[1]);
    var times = time[4]
    var data = times + daynum + " " + Month + " " + year;
    this.Data[index].date = data
  }
  conYearTh(selectedyear) {
    return parseInt(selectedyear) + 543
  }
  conMonthTh(selectedMonth) {
    var selectedMonthTH
    if (selectedMonth == 'January') {
      selectedMonthTH = 'มกราคม'
    } else if (selectedMonth == 'February') {
      selectedMonthTH = 'กุมภาพันธ์';
    } else if (selectedMonth == 'March') {
      selectedMonthTH = 'มีนาคม';
    } else if (selectedMonth == 'April') {
      selectedMonthTH = 'เมษายน';
    } else if (selectedMonth == 'May') {
      selectedMonthTH = 'พฤษภาคม';
    } else if (selectedMonth == 'June') {
      selectedMonthTH = 'มิถุนายน';
    } else if (selectedMonth == 'July') {
      selectedMonthTH = 'กรกฎาคม';
    } else if (selectedMonth == 'August') {
      selectedMonthTH = 'สิงหาคม';
    } else if (selectedMonth == 'September') {
      selectedMonthTH = 'กันยายน';
    } else if (selectedMonth == 'October') {
      selectedMonthTH = 'ตุลาคม';
    } else if (selectedMonth == 'November') {
      selectedMonthTH = 'พฤศจิกายน';
    } else if (selectedMonth == 'December') {
      selectedMonthTH = 'ธันวาคม';
    }
    return selectedMonthTH
  }
  conDayTH(data) {
    var dayTH
    if (data == 'Sunday') {
      dayTH = 'อาทิตย์'
    } else if (data == 'Monday') {
      dayTH = 'จันทร์'
    } else if (data == 'Tuesday') {
      dayTH = 'อังคาร'
    } else if (data == 'Wednesday') {
      dayTH = 'พุธ'
    } else if (data == 'Thursday') {
      dayTH = 'พฤหัสบดี'
    } else if (data == 'Friday') {
      dayTH = 'ศุกร์'
    } else if (data == 'Saturday') {
      dayTH = 'เสาร์'
    } else {
      dayTH = 'ไม่มีการบันทึกค่า'
    }
    return dayTH
  }
  exportAsXLSX(): void {
    var monthTH = this.conMonthTh(this.data.month)
    var yearTH = this.conYearTh(this.data.year)
    this.userService.exportAsExcelFile(this.DataTH, "สถิติการใช้ไฟห้อง" + this.data.room + "_ประจำเดือน" + monthTH + yearTH);
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