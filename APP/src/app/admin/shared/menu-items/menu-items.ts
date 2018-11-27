import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  {state: 'starterAdmin', name: 'สถิติการใช้ไฟ', type: 'link', icon: 'show_chart' },

  {state: 'manageUserAdmin', type: 'link', name: 'จัดการบัญชีผู้ใช้', icon: 'person_pin'},
  {state: 'manageMeterAdmin', type: 'link', name: 'จัดการมิเตอร์ไฟฟ้า', icon: 'av_timer' },
  {state: 'electricBillAdmin', type: 'link', name: 'ค่าไฟที่ใช้', icon: 'receipt'},
  {state: 'statisticAdmin', type: 'link', name: 'รายงานการใช้ไฟฟ้า', icon: 'assessment'},
  {state: 'powerCutAdmin', type: 'link', name: 'การตัดไฟ', icon: 'power_off'},
  {state: 'SystemSetting', type: 'link', name: 'จัดการระบบ', icon: 'settings'},
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
