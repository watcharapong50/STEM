import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
    {state: 'starter', name: 'ค่าไฟที่ใช้', type: 'link', icon: 'receipt' },
    {state: 'billUser', type: 'link', name: 'ตรวจสอบค่าไฟ', icon: 'assessment'},
    {state: 'statisticUser', type: 'link', name: 'ตรวจสถิติการใช้ไฟ', icon: 'show_chart'},
]; 

@Injectable()

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
