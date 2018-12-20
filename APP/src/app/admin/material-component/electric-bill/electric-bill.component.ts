import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MeterService } from '../../../shared/meter.service';
import { UserService } from '../../../shared/user.service';
import { NotificationService } from '../../../shared/notification.service';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { nextTick } from 'q';

export interface Month {
  month: string;
  m: string;
}

export interface Year {
  year: string;
  y: string;
}


@Component({
  selector: 'app-electric-bill',
  templateUrl: './electric-bill.component.html',
  styleUrls: ['./electric-bill.component.css']
})

export class ElectricBillComponent implements OnInit {

  selectedMonth: string;
  selectedYear: string = '2018'

  monthForm = new FormControl('', [Validators.required]);
  yearForm = new FormControl('', [Validators.required]);
  months: Month[] = [
    { month: 'January', m: 'มกราคม' }, { month: 'February', m: 'กุมภาพันธ์' }, { month: 'March', m: 'มีนาคม' }, { month: 'April', m: 'เมษายน' },
    { month: 'May', m: 'พฤษภาคม' }, { month: 'June', m: 'มิถุนายน' }, { month: 'July', m: 'กรกฎาคม' }, { month: 'August', m: 'สิงหาคม' },
    { month: 'September', m: 'กันยายน' }, { month: 'October', m: 'ตุลาคม' }, { month: 'November', m: 'พฤศจิกายน' }, { month: 'December', m: 'ธันวาคม' },
  ];

  years: Year[] = [
    { year: '2018', y: '2561' }
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
      this.data = data
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
  dataTH;
  dataSource
  displayedColumns = ['room', 'start', 'actions', 'bill'];
  //
  ngOnInit(): void {
    this.meterService.report(this.data.month, this.data.year).subscribe(data => {
      if (!data) {
        return;
      }
      this.dataSource = data;
      this.Data = data;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    this.meterService.reportTH(this.data.month, this.data.year).subscribe(data => {
      if (!data) {
        return;
      }
      this.dataTH = data;
      for (let i = 0; i < data.length; i++) {
        this.conTime(i)
      }
    })
  }
  conTime(index) {
    if (this.dataTH[index].เวลาที่เริ่มบันทึก == 'ไม่มีการบันทึกค่าไฟ') {

    } else {
      var time = this.dataTH[index].เวลาที่เริ่มบันทึก.split(",", 5)
      var day = this.conDayTH(time[0])
      var daynum = time[1]
      var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
      var year = this.conYearTh(time[3].split(" ", 2)[1]);
      var times = time[4]
      var data = times + daynum + " " + Month + " " + year;
      this.dataTH[index].เวลาที่เริ่มบันทึก = data


      var etime = this.dataTH[index].เวลาสิ้นสุด.split(",", 5)
      var eday = this.conDayTH(etime[0])
      var edaynum = etime[1]
      var eMonth = this.conMonthTh(etime[2].split(" ", 2)[1]);
      var eyear = this.conYearTh(etime[3].split(" ", 2)[1]);
      var etimes = etime[4]
      var edata = etimes + edaynum + " " + eMonth + " " + eyear;
      this.dataTH[index].เวลาสิ้นสุด = edata
    }

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

    this.userService.exportAsExcelFile(this.dataTH, "ค่าไฟ" + monthTH + yearTH);
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