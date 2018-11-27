import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule} from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { ProfileComponent } from './profile/profile.component';
import { StatisticComponent, StatisticReportUser } from './statistic/statistic.component';
import { BillAllComponent } from './bill-all/bill-all.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [

  ],
  entryComponents: [
    StatisticReportUser
  ],
  declarations: [
    ProfileComponent,
    StatisticComponent,
    StatisticReportUser,
    BillAllComponent
  ]
})

export class MaterialComponentsModule {}
