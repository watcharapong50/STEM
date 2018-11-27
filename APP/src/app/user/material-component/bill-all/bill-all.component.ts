import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../shared/user.service';
import { MeterService } from '../../../shared/meter.service';

export interface Month {
  month: string;
}

export interface Year {
  year: string;
}

@Component({
  selector: 'app-bill-all',
  templateUrl: './bill-all.component.html',
  styleUrls: ['./bill-all.component.css']
})
export class BillAllComponent implements OnInit {
  show: boolean = false;
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
  constructor(private userService: UserService, private meterService: MeterService) { }
  userDetails
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.getmeter(this.userDetails.room)
      },
      err => {
        console.log(err);
      }
    );

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

  Maddr;
  getmeter(room) {
    this.userService.MacFromRoom(room).subscribe(
      res => {
        this.Maddr = res['Maddr'];
      },
      err => {
        console.log(err);
      }
    );
  }

  bill;
  submit() {
    this.meterService.showBillUserReport(this.Maddr, this.selectedMonth, this.selectedYear).subscribe(
      res => {
        this.bill = res
        console.log(this.bill);
        
      },
      err => {
        console.log(err);
      }
    );
  }
}