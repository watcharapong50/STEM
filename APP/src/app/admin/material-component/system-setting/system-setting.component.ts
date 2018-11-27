import { Component, OnInit } from '@angular/core';
import { MeterService } from "../../../shared/meter.service";
import { NotificationService } from "../../../shared/notification.service";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css']
})
export class SystemSettingComponent implements OnInit {
  bt1 = false;
  bt5 = false;
  bt10 = false;
  bt15 = false;
  bt30 = false;
  bt45 = false;
  bt60 = false;

  constructor(
    private meterService: MeterService,
    private notificationService: NotificationService,
    private http: HttpClient
  ) { }
  userDetails;
  ngOnInit() {
    this.meterService.showTimeDelay().subscribe(
      res => {
        this.userDetails = res[0].timeDelay;
        this.btActive(this.userDetails)
      },
      err => {
        console.log(err);
      }

    );
  }
  btActive(state) {
    this.bt1 = false;
    this.bt5 = false;
    this.bt10 = false;
    this.bt15 = false;
    this.bt30 = false;
    this.bt45 = false;
    this.bt60 = false;
    if (state == 1) {
      this.bt1 = true
    } else if (state == 5) {
      this.bt5 = true
    } else if (state == 10) {
      this.bt10 = true
    } else if (state == 15) {
      this.bt15 = true
    } else if (state == 30) {
      this.bt30 = true
    } else if (state == 45) {
      this.bt45 = true
    } else if (state == 60) {
      this.bt60 = true
    }

  }
  showSucessMessage: boolean;
  serverErrorMessages: string;
  time(time) {
    this.meterService.updateSystem(time).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.notificationService.success('Edit successfully !!!');
        this.ngOnInit();
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else {
          this.notificationService.warn('Edit Fail!!!');
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      }
    );
  }
}
