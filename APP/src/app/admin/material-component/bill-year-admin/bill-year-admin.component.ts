import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { MeterService } from '../../../shared/meter.service';
import { UserService } from '../../../shared/user.service';
import { Chart } from "chart.js";
@Component({
  selector: 'app-bill-year-admin',
  templateUrl: './bill-year-admin.component.html',
  styleUrls: ['./bill-year-admin.component.css']
})
export class BillYearAdminComponent implements OnInit {
  LineChart = [];
  room;
  Data;
  DataTH;
  Yearselected = '2018';
  show = false
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private meterService: MeterService,
    private userService: UserService,
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
  }

  searchKey: string;
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  openDialog(element, room): void {
    this.room = room
    this.meterService.showBillUserReportYear(element, 'December', this.Yearselected).subscribe(
      res => {
        this.Data = res;
        console.log(res);
        for (let i = 0; i < 12; i++) {
          this.con(i)
          this.conE(i)
        }
        this.LineChart = new Chart("mychart", {
          type: 'line',
          data: {
            labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],//,
            datasets: [{
              data: [this.Data[0].bill, this.Data[1].bill, this.Data[2].bill, this.Data[3].bill, this.Data[4].bill, this.Data[5].bill, this.Data[6].bill, this.Data[7].bill, this.Data[8].bill, this.Data[9].bill, this.Data[10].bill, this.Data[11].bill],//,
              borderColor: "#e8c3b9",
              fill: false
            }
            ]
          },
          options: {
            title: {
              display: true
              //text: 'ค่าไฟประจำปี พ.ศ.' + this.conYearTh(this.Yearselected)
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.yLabel;
                }
              }
            },
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  fontSize: 16,
                  FontFamily:"'Prompt', sans-serif"
                }
              }],
              xAxes: [{
                ticks: {
                  fontSize: 16
                }
              }]
            }
          }
        });
      },
      err => {
        console.log(err);
      }
    );

    this.meterService.showBillUserReportYearTH(element, 'December', this.Yearselected).subscribe(
      res => {
        console.log(res);
        this.DataTH = res
        for (let i = 0; i < 12; i++) {
          this.ccon(i)
          this.cconE(i)
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  con(index) {
    if (this.Data[index].startFullTime.date != 'ไม่มีการบันทึก') {
      var time = this.Data[index].startFullTime.date.split(",", 5)
      var day = this.conDayTH(time[0])
      var daynum = time[1]
      var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
      var year = this.conYearTh(time[3].split(" ", 2)[1]);
      var times = time[4]
      var data = times + daynum + " " + Month + " " + year;
      this.Data[index].startFullTime.date = data
    }
  }
  conE(index) {
    if (this.Data[index].lastFullTime.date != 'ไม่มีการบันทึก') {
      var time = this.Data[index].lastFullTime.date.split(",", 5)
      var day = this.conDayTH(time[0])
      var daynum = time[1]
      var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
      var year = this.conYearTh(time[3].split(" ", 2)[1]);
      var times = time[4]
      var data = times + daynum + " " + Month + " " + year;
      this.Data[index].lastFullTime.date = data
    }
  }
  ccon(index) {
    if (this.DataTH[index].เวลาที่เริ่มบันทึกหน่วยไฟ != 'ไม่มีการบันทึก') {
      var time = this.DataTH[index].เวลาที่เริ่มบันทึกหน่วยไฟ.split(",", 5)
      var day = this.conDayTH(time[0])
      var daynum = time[1]
      var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
      var year = this.conYearTh(time[3].split(" ", 2)[1]);
      var times = time[4]
      var data = times + daynum + " " + Month + " " + year;
      this.DataTH[index].เวลาที่เริ่มบันทึกหน่วยไฟ = data
    }
  }
  cconE(index) {
    if (this.DataTH[index].เวลาสิ้นสุดที่ทึกหน่วยไฟ != 'ไม่มีการบันทึก') {
      var time = this.DataTH[index].เวลาสิ้นสุดที่ทึกหน่วยไฟ.split(",", 5)
      var day = this.conDayTH(time[0])
      var daynum = time[1]
      var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
      var year = this.conYearTh(time[3].split(" ", 2)[1]);
      var times = time[4]
      var data = times + daynum + " " + Month + " " + year;
      this.DataTH[index].เวลาสิ้นสุดที่ทึกหน่วยไฟ = data
    }
  }
  conYearTh(selectedyear) {
    return parseInt(selectedyear) + 543
  } conMonthTh(selectedMonth) {
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
    // var monthTH = this.conMonthTh(this.data.month)
    var yearTH = this.conYearTh(this.Yearselected)
    this.userService.exportAsExcelFile(this.DataTH, "ค่าไฟห้อง" + this.room + "ประจำปี" + yearTH);
  }
}
