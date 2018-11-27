import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from '../../environments/environment';
import { User, showUser, MacAd } from "./user.model";

import { Observable } from "rxjs/Observable";

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    room: '',
  }
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }


    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }
    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, fileName + '_Meter_' + new Date().getTime()+ EXCEL_EXTENSION);
    }



  form: FormGroup = new FormGroup({
    username: new FormControl(null),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    // password: new FormControl(''),
    room: new FormControl(''),
    permission: new FormControl(''),
    // Maddr: new FormControl(''),
  });

  //HttpMethods

  getAllUser(): Observable<showUser[]> {
    return this.http.get<showUser[]>(environment.apiBaseUrl + '/showAllUser');
  }
  MacFromRoom(room) {
    return this.http.get(environment.apiBaseUrl + '/MacFromRoom/'+ room);
  }
  showBillUser(Maddr) {
    return this.http.get(environment.apiBaseUrl + '/showBillUser/' + Maddr);
  }
  postUser(user) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  deleteUserProfile(username) {
    return this.http.delete(environment.apiBaseUrl + '/deleteUser/' + username);
  }

  updateUserProfile(user: User) {
    console.log(user);

    return this.http.put(environment.apiBaseUrl + '/updateUser', user);
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  setPermission(permission: string) {
    if (permission == 'admin') {
      localStorage.setItem('permission', permission);
    }
  }

  getPermission() {
    if (localStorage.getItem('permission') == 'admin')
      return localStorage.getItem('permission');
    else
      return false
  }

  deletePermission() {
    localStorage.removeItem('permission');
  }

  getPermissionload() {
    var permission = this.getPermission();
    if (permission == 'admin') {
      return true;
    }
    else
      return false;
  }
}
