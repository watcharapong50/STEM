import { Component, OnInit } from '@angular/core';
import { MeterService } from '../../shared/meter.service';



@Component({
  selector: 'starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit {
  
  constructor(
    private meterService: MeterService,
  ) { }

  data;
  userDetailsBath;
  ngOnInit() {
    this.meterService.showBillUserAll().subscribe(data => {
      if (!data) {
        return;
      }
      this.data = data
    })

    this.meterService.showBathPerNum().subscribe(
      res => {
        this.userDetailsBath = res['bathPerNum'];
        console.log(this.userDetailsBath);
      },
      err => {
        console.log(err);
      }

    );
  }

}
