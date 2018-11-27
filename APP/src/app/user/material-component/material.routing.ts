import { Routes } from '@angular/router';

import { ProfileComponent } from "./profile/profile.component";
import { StatisticComponent } from "./statistic/statistic.component";
import { BillAllComponent } from './bill-all/bill-all.component';

export const MaterialRoutes: Routes = [
  {
    path: 'profileUser',
    component: ProfileComponent
  }, {
    path: 'statisticUser',
    component: StatisticComponent
  }, {
    path: 'billUser',
    component: BillAllComponent
  }
];
