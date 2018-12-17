import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from '../../environments/environment';
import { MeterPowerCut, Meter, addMeter, updateMeter, system, showBill, report, showStatisticData, showBillDataUser } from "./meter.model";
import { elecData } from "./elecMeter.modal";

import { Observable } from "rxjs/Observable";


@Injectable({
    providedIn: 'root'
})
export class MeterService {
    selectedUser: addMeter = {
        Maddr: '',
        room: ''
    }

    form: FormGroup = new FormGroup({
        Maddr: new FormControl(null),
        room: new FormControl(''),
    });
    formCut: FormGroup = new FormGroup({
        Maddr: new FormControl(null),
        timeDelay: new FormControl(''),
    });

    noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

    constructor(private http: HttpClient) { }
    showMeterRoom(): Observable<MeterPowerCut[]> {
        return this.http.get<MeterPowerCut[]>(environment.apiBaseUrl + '/showPowerCut');
    }
    showBillUserAll(): Observable<showBill[]> {
        return this.http.get<showBill[]>(environment.apiBaseUrl + '/showBillUserAll');
    }
    showBillUserReport(Maddr, month, year): Observable<showBillDataUser[]> {
        return this.http.get<showBillDataUser[]>(environment.apiBaseUrl + '/showBillUserReport/' + Maddr + "/" + month + "/" + year);
    }
    showMyElec(meter) {
        return this.http.get(environment.apiBaseUrl + '/showMyElec/' + meter);
    }
    showAllMeter(): Observable<Meter[]> {
        return this.http.get<Meter[]>(environment.apiBaseUrl + '/showAllMeter');
    }
    report(month, year): Observable<report[]> {
        return this.http.get<report[]>(environment.apiBaseUrl + '/showBill/' + month + "/" + year);
    }
    showStatistic(month, year, room): Observable<showStatisticData[]> {
        return this.http.get<showStatisticData[]>(environment.apiBaseUrl + '/showStatistic/' + room + "/" + month + "/" + year);
    }
    postUser(user: addMeter) {
        return this.http.post(environment.apiBaseUrl + '/addMeter', user);
    }

    deleteMeter(Maddr) {
        return this.http.delete(environment.apiBaseUrl + '/deleteMeter/' + Maddr);
    }

    powerCut(powerCut: MeterPowerCut) {
        return this.http.put(environment.apiBaseUrl + '/powerCut/' + powerCut, powerCut);
    }

    updateMeter(user: updateMeter) {
        return this.http.put(environment.apiBaseUrl + '/updateMeter', user);
    }

    showElec(): Observable<elecData[]> {
        return this.http.get<elecData[]>(environment.apiBaseUrl + '/showElec');
    }
    updateSystem(systemTime) {
        return this.http.get(environment.apiBaseUrl + '/updateSystem/' + systemTime);
    }
    showTimeDelay(): Observable<system[]> {
        return this.http.get<system[]>(environment.apiBaseUrl + '/showTimeDelay');
    }
    updateBath(systemTime) {
        return this.http.get(environment.apiBaseUrl + '/updateBath/' + systemTime);
    }
    showBathPerNum(): Observable<system[]> {
        return this.http.get<system[]>(environment.apiBaseUrl + '/showBathPerNum');
    }
}