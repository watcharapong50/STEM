(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-material-component-material-module"],{

/***/ "./src/app/admin/material-component/bill-year-admin/bill-year-admin.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/admin/material-component/bill-year-admin/bill-year-admin.component.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n#customers td,\r\n#customers th {\r\n    border: 1px solid #ddd;\r\n    padding: 8px;\r\n}\r\n\r\n#customers tr:nth-child(even) {\r\n    background-color: #f2f2f2;\r\n}\r\n\r\n#customers tr:hover {\r\n    background-color: #ddd;\r\n}\r\n\r\n#customers th {\r\n    padding-top: 12px;\r\n    padding-bottom: 12px;\r\n    text-align: left;\r\n    background-color: rgb(96, 202, 100);\r\n    color: white;\r\n}"

/***/ }),

/***/ "./src/app/admin/material-component/bill-year-admin/bill-year-admin.component.html":
/*!*****************************************************************************************!*\
  !*** ./src/app/admin/material-component/bill-year-admin/bill-year-admin.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-tab-group>\n      <mat-tab label=\"รายงานการใช้ไฟฟ้า\">\n        <mat-card-content>\n          <mat-form-field>\n            <mat-select [(value)]=\"Yearselected\">\n              <mat-option value=\"2018\">2561</mat-option>\n            </mat-select>\n          </mat-form-field>\n\n          <div class=\"search-div\">\n            <mat-form-field class=\"search-form-field\" floatLabel=\"never\">\n              <input matInput [(ngModel)]=\"searchKey\" placeholder=\"ค้นหาห้อง\" autocomplete=\"off\" (keyup)=\"applyFilter()\">\n              <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"searchKey\" (click)=\"onSearchClear()\">\n                <mat-icon>close</mat-icon>\n              </button>\n            </mat-form-field>\n\n          </div>\n          <div class=\"mat-elevation-z8 size\">\n            <mat-table [dataSource]=\"dataSource\" matSort>\n              <ng-container matColumnDef=\"room\" sticky>\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อห้อง</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.room}}</mat-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"username\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อมิเตอร์ (Mac Address)</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.Maddr}}</mat-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"actions\">\n                <mat-header-cell *matHeaderCellDef>ดูสถิติการใช้ไฟฟ้า</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">\n                  <button mat-raised-button color=\"accent\" (click)=\"show = true\" (click)=\"openDialog(element.Maddr,element.room)\">\n                    <mat-icon>search</mat-icon> เลือก\n                  </button>\n                </mat-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"noData\">\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\n                  No data.\n                </mat-footer-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"loading\">\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\n                  Loading data...\n                </mat-footer-cell>\n              </ng-container>\n              <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n              <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n              <mat-footer-row *matFooterRowDef=\"['noData']\" [ngClass]=\"{'hide':!(dataSource!=null && dataSource.data.length==0)}\"></mat-footer-row>\n              <mat-footer-row *matFooterRowDef=\"['loading']\" [ngClass]=\"{'hide':dataSource!=null}\"></mat-footer-row>\n            </mat-table>\n            <mat-paginator [pageSizeOptions]=\"[10, 20, 50, 100]\" [pageSize]=\"10\" showFirstLastButtons></mat-paginator>\n          </div>\n        </mat-card-content>\n      </mat-tab>\n\n    </mat-tab-group>\n  </mat-card-content>\n</mat-card>\n\n\n<div *ngIf=\"show\">\n  <mat-card>\n    <mat-card-content>\n      <h3 class=\"text-center\"><strong>ตารางแสดงค่าไฟปี พ.ศ.{{conYearTh(Yearselected)}}</strong></h3>\n      <div class=\"wrapper-center button-row\">\n        <button mat-raised-button color=\"warn\" style=\"float: right;\" (click)=\"show = false\">\n          <mat-icon>clear</mat-icon>ปิด\n        </button>\n        <span>&nbsp;&nbsp;&nbsp;</span>\n        <button mat-raised-button color=\"primary\" style=\"float: right;\" (click)=\"exportAsXLSX()\">\n          <mat-icon>cloud_download</mat-icon> ดาวโหลด (.xlsx)\n        </button>\n      </div>\n      <br>\n\n      <table class=\"table table-bordered\" id=\"customers\">\n        <thead>\n          <tr>\n            <th class=\"text-center\">เดือน</th>\n            <th class=\"text-center\">หน่วยไฟที่เริ่มบันทึก</th>\n            <th class=\"text-center\">เวลาที่เริ่มบันทึกหน่วยไฟ</th>\n            <th class=\"text-center\">หน่วยไฟสิ้นสุด</th>\n            <th class=\"text-center\">เวลาสิ้นสุดที่ทึกหน่วยไฟ</th>\n            <th class=\"text-center\">จำนวนหน่วยไฟ (หน่วย)</th>\n            <th class=\"text-center\">ค่าไฟ (บาท)</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let item of Data\">\n            <td>{{item.month}}</td>\n            <td class=\"text-center\">{{item.startFullTime.ActiveEnergy}}</td>\n            <td>{{item.startFullTime.date}}</td>\n            <td class=\"text-center\">{{item.lastFullTime.ActiveEnergy}}</td>\n            <td>{{item.lastFullTime.date}}</td>\n            <td class=\"text-center\">{{item.num}}</td>\n            <td class=\"text-center\">{{item.bill}}</td>\n          </tr>\n        </tbody>\n      </table>\n      <br>\n      <h4 class=\"text-center\">กราฟค่าไฟห้อง {{room}} ประจำปี พ.ศ.  {{this.conYearTh(this.Yearselected)}} </h4>\n      <canvas id=\"mychart\" width=\"800\" height=\"450\"></canvas>\n\n    </mat-card-content>\n  </mat-card>\n  <!-- <div *ngFor=\"let item of Data\">\n    <span>{{item|json}}</span>\n  </div> -->\n\n</div>"

/***/ }),

/***/ "./src/app/admin/material-component/bill-year-admin/bill-year-admin.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/admin/material-component/bill-year-admin/bill-year-admin.component.ts ***!
  \***************************************************************************************/
/*! exports provided: BillYearAdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillYearAdminComponent", function() { return BillYearAdminComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_meter_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/meter.service */ "./src/app/shared/meter.service.ts");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/user.service */ "./src/app/shared/user.service.ts");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/src/chart.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BillYearAdminComponent = /** @class */ (function () {
    function BillYearAdminComponent(meterService, userService, dialogMeter) {
        this.meterService = meterService;
        this.userService = userService;
        this.dialogMeter = dialogMeter;
        this.LineChart = [];
        this.Yearselected = '2018';
        this.show = false;
        this.displayedColumns = ['room', 'username', 'actions']; //, 'shortCircuit'
    }
    BillYearAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.meterService.showAllMeter().subscribe(function (data) {
            if (!data) {
                return;
            }
            console.log(data);
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](data);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
    };
    BillYearAdminComponent.prototype.onSearchClear = function () {
        this.searchKey = "";
        this.applyFilter();
    };
    BillYearAdminComponent.prototype.applyFilter = function () {
        this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
    };
    BillYearAdminComponent.prototype.openDialog = function (element, room) {
        var _this = this;
        this.room = room;
        this.meterService.showBillUserReportYear(element, 'December', this.Yearselected).subscribe(function (res) {
            _this.Data = res;
            console.log(res);
            for (var i = 0; i < 12; i++) {
                _this.con(i);
                _this.conE(i);
            }
            _this.LineChart = new chart_js__WEBPACK_IMPORTED_MODULE_4__["Chart"]("mychart", {
                type: 'line',
                data: {
                    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
                    datasets: [{
                            data: [_this.Data[0].bill, _this.Data[1].bill, _this.Data[2].bill, _this.Data[3].bill, _this.Data[4].bill, _this.Data[5].bill, _this.Data[6].bill, _this.Data[7].bill, _this.Data[8].bill, _this.Data[9].bill, _this.Data[10].bill, _this.Data[11].bill],
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
                                    FontFamily: "'Prompt', sans-serif"
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
        }, function (err) {
            console.log(err);
        });
        this.meterService.showBillUserReportYearTH(element, 'December', this.Yearselected).subscribe(function (res) {
            console.log(res);
            _this.DataTH = res;
            for (var i = 0; i < 12; i++) {
                _this.ccon(i);
                _this.cconE(i);
            }
        }, function (err) {
            console.log(err);
        });
    };
    BillYearAdminComponent.prototype.con = function (index) {
        if (this.Data[index].startFullTime.date != 'ไม่มีการบันทึก') {
            var time = this.Data[index].startFullTime.date.split(",", 5);
            var day = this.conDayTH(time[0]);
            var daynum = time[1];
            var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
            var year = this.conYearTh(time[3].split(" ", 2)[1]);
            var times = time[4];
            var data = times + daynum + " " + Month + " " + year;
            this.Data[index].startFullTime.date = data;
        }
    };
    BillYearAdminComponent.prototype.conE = function (index) {
        if (this.Data[index].lastFullTime.date != 'ไม่มีการบันทึก') {
            var time = this.Data[index].lastFullTime.date.split(",", 5);
            var day = this.conDayTH(time[0]);
            var daynum = time[1];
            var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
            var year = this.conYearTh(time[3].split(" ", 2)[1]);
            var times = time[4];
            var data = times + daynum + " " + Month + " " + year;
            this.Data[index].lastFullTime.date = data;
        }
    };
    BillYearAdminComponent.prototype.ccon = function (index) {
        if (this.DataTH[index].เวลาที่เริ่มบันทึกหน่วยไฟ != 'ไม่มีการบันทึก') {
            var time = this.DataTH[index].เวลาที่เริ่มบันทึกหน่วยไฟ.split(",", 5);
            var day = this.conDayTH(time[0]);
            var daynum = time[1];
            var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
            var year = this.conYearTh(time[3].split(" ", 2)[1]);
            var times = time[4];
            var data = times + daynum + " " + Month + " " + year;
            this.DataTH[index].เวลาที่เริ่มบันทึกหน่วยไฟ = data;
        }
    };
    BillYearAdminComponent.prototype.cconE = function (index) {
        if (this.DataTH[index].เวลาสิ้นสุดที่ทึกหน่วยไฟ != 'ไม่มีการบันทึก') {
            var time = this.DataTH[index].เวลาสิ้นสุดที่ทึกหน่วยไฟ.split(",", 5);
            var day = this.conDayTH(time[0]);
            var daynum = time[1];
            var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
            var year = this.conYearTh(time[3].split(" ", 2)[1]);
            var times = time[4];
            var data = times + daynum + " " + Month + " " + year;
            this.DataTH[index].เวลาสิ้นสุดที่ทึกหน่วยไฟ = data;
        }
    };
    BillYearAdminComponent.prototype.conYearTh = function (selectedyear) {
        return parseInt(selectedyear) + 543;
    };
    BillYearAdminComponent.prototype.conMonthTh = function (selectedMonth) {
        var selectedMonthTH;
        if (selectedMonth == 'January') {
            selectedMonthTH = 'มกราคม';
        }
        else if (selectedMonth == 'February') {
            selectedMonthTH = 'กุมภาพันธ์';
        }
        else if (selectedMonth == 'March') {
            selectedMonthTH = 'มีนาคม';
        }
        else if (selectedMonth == 'April') {
            selectedMonthTH = 'เมษายน';
        }
        else if (selectedMonth == 'May') {
            selectedMonthTH = 'พฤษภาคม';
        }
        else if (selectedMonth == 'June') {
            selectedMonthTH = 'มิถุนายน';
        }
        else if (selectedMonth == 'July') {
            selectedMonthTH = 'กรกฎาคม';
        }
        else if (selectedMonth == 'August') {
            selectedMonthTH = 'สิงหาคม';
        }
        else if (selectedMonth == 'September') {
            selectedMonthTH = 'กันยายน';
        }
        else if (selectedMonth == 'October') {
            selectedMonthTH = 'ตุลาคม';
        }
        else if (selectedMonth == 'November') {
            selectedMonthTH = 'พฤศจิกายน';
        }
        else if (selectedMonth == 'December') {
            selectedMonthTH = 'ธันวาคม';
        }
        return selectedMonthTH;
    };
    BillYearAdminComponent.prototype.conDayTH = function (data) {
        var dayTH;
        if (data == 'Sunday') {
            dayTH = 'อาทิตย์';
        }
        else if (data == 'Monday') {
            dayTH = 'จันทร์';
        }
        else if (data == 'Tuesday') {
            dayTH = 'อังคาร';
        }
        else if (data == 'Wednesday') {
            dayTH = 'พุธ';
        }
        else if (data == 'Thursday') {
            dayTH = 'พฤหัสบดี';
        }
        else if (data == 'Friday') {
            dayTH = 'ศุกร์';
        }
        else if (data == 'Saturday') {
            dayTH = 'เสาร์';
        }
        else {
            dayTH = 'ไม่มีการบันทึกค่า';
        }
        return dayTH;
    };
    BillYearAdminComponent.prototype.exportAsXLSX = function () {
        // var monthTH = this.conMonthTh(this.data.month)
        var yearTH = this.conYearTh(this.Yearselected);
        this.userService.exportAsExcelFile(this.DataTH, "ค่าไฟห้อง" + this.room + "ประจำปี" + yearTH);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], BillYearAdminComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], BillYearAdminComponent.prototype, "paginator", void 0);
    BillYearAdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-bill-year-admin',
            template: __webpack_require__(/*! ./bill-year-admin.component.html */ "./src/app/admin/material-component/bill-year-admin/bill-year-admin.component.html"),
            styles: [__webpack_require__(/*! ./bill-year-admin.component.css */ "./src/app/admin/material-component/bill-year-admin/bill-year-admin.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_meter_service__WEBPACK_IMPORTED_MODULE_2__["MeterService"],
            _shared_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], BillYearAdminComponent);
    return BillYearAdminComponent;
}());



/***/ }),

/***/ "./src/app/admin/material-component/electric-bill/electric-bill.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/admin/material-component/electric-bill/electric-bill.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".wrapper-center {\r\n    text-align: center;\r\n}\r\n\r\n.button {\r\n    position: relative;\r\n}\r\n\r\nsection.pricing {\r\n    background: #9CECFB;\r\n    /* fallback for old browsers */\r\n    /* Chrome 10-25, Safari 5.1-6 */\r\n    background: linear-gradient(to right, #0052D4, #65C7F7, #9CECFB);\r\n    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n  }\r\n\r\n.pricing .card {\r\n    border: none;\r\n    border-radius: 1rem;\r\n    transition: all 0.2s;\r\n    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);\r\n  }\r\n\r\n.pricing hr {\r\n    margin: 1.5rem 0;\r\n  }\r\n\r\n.pricing .card-title {\r\n    margin: 0.5rem 0;\r\n    font-size: 0.9rem;\r\n    letter-spacing: .1rem;\r\n    font-weight: bold;\r\n  }\r\n\r\n.pricing .card-price {\r\n    font-size: 3rem;\r\n    margin: 0;\r\n  }\r\n\r\n.pricing .card-price .period {\r\n    font-size: 0.8rem;\r\n  }\r\n\r\n.pricing ul li {\r\n    margin-bottom: 1rem;\r\n  }\r\n\r\n.pricing .text-muted {\r\n    opacity: 0.7;\r\n  }\r\n\r\n.pricing .btn {\r\n    font-size: 80%;\r\n    border-radius: 5rem;\r\n    letter-spacing: .1rem;\r\n    font-weight: bold;\r\n    padding: 1rem;\r\n    opacity: 0.7;\r\n    transition: all 0.2s;\r\n  }\r\n\r\n/* Hover Effects on Card */\r\n\r\n@media (min-width: 992px) {\r\n    .pricing .card:hover {\r\n      margin-top: -.25rem;\r\n      margin-bottom: .25rem;\r\n      box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);\r\n    }\r\n    .pricing .card:hover .btn {\r\n      opacity: 1;\r\n    }\r\n  }\r\n  "

/***/ }),

/***/ "./src/app/admin/material-component/electric-bill/electric-bill.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/admin/material-component/electric-bill/electric-bill.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n    <mat-card-content>\r\n        <mat-tab-group>\r\n            <!-- <mat-tab label=\"ค่าไฟเดือนนี้\">\r\n                <mat-card-content>\r\n                    <div class=\"search-div\">\r\n                        <mat-form-field class=\"search-form-field\" floatLabel=\"never\">\r\n                            <input matInput [(ngModel)]=\"searchKey\" placeholder=\"ค้นหาห้อง\" autocomplete=\"off\" (keyup)=\"applyFilter()\">\r\n                            <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"searchKey\" (click)=\"onSearchClear()\">\r\n                                <mat-icon>close</mat-icon>\r\n                            </button>\r\n                        </mat-form-field><button mat-button matSuffix mat-icon-button (click)=\"ngOnInit()\">\r\n                            <mat-icon>refresh</mat-icon>\r\n                        </button>\r\n                    </div>\r\n                    <div class=\"mat-elevation-z8\">\r\n                        <mat-table [dataSource]=\"dataSource\" matSort>\r\n                            <ng-container matColumnDef=\"room\">\r\n                                <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อห้อง</mat-header-cell>\r\n                                <mat-cell *matCellDef=\"let element\">{{element.room}}</mat-cell>\r\n                            </ng-container>\r\n                            <ng-container matColumnDef=\"start\" sticky>\r\n                                <mat-header-cell *matHeaderCellDef mat-sort-header>ค่าพลังงานไฟฟ้าเริ่มต้น</mat-header-cell>\r\n                                <mat-cell *matCellDef=\"let element\">{{element.start}}</mat-cell>\r\n                            </ng-container>\r\n                            <ng-container matColumnDef=\"actions\">\r\n                                <mat-header-cell *matHeaderCellDef mat-sort-header>ค่าพลังงานไฟฟ้าสิ้นสุด</mat-header-cell>\r\n                                <mat-cell *matCellDef=\"let element\">\r\n                                    {{element.end}}\r\n                                </mat-cell>\r\n                            </ng-container>\r\n                            <ng-container matColumnDef=\"bill\">\r\n                                <mat-header-cell *matHeaderCellDef>ค่าไฟ (บาท)</mat-header-cell>\r\n                                <mat-cell *matCellDef=\"let element\">{{(element.end-element.start)*7 |number:'1.0-0'}}</mat-cell>\r\n                            </ng-container>\r\n                            <ng-container matColumnDef=\"noData\">\r\n                                <mat-footer-cell *matFooterCellDef colspan=\"6\">\r\n                                    No data.\r\n                                </mat-footer-cell>\r\n                            </ng-container>\r\n                            <ng-container matColumnDef=\"loading\">\r\n                                <mat-footer-cell *matFooterCellDef colspan=\"6\">\r\n                                    Loading data...\r\n                                </mat-footer-cell>\r\n                            </ng-container>\r\n                            <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n                            <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n                            <mat-footer-row *matFooterRowDef=\"['noData']\" [ngClass]=\"{'hide':!(dataSource!=null && dataSource.data.length==0)}\"></mat-footer-row>\r\n                            <mat-footer-row *matFooterRowDef=\"['loading']\" [ngClass]=\"{'hide':dataSource!=null}\"></mat-footer-row>\r\n                        </mat-table>\r\n                        <mat-paginator [pageSizeOptions]=\"[10, 20, 50, 100]\" [pageSize]=\"10\" showFirstLastButtons></mat-paginator>\r\n                    </div>\r\n                </mat-card-content>\r\n            </mat-tab> -->\r\n            <mat-tab label=\"รายงานค่าไฟ\">\r\n                <br>\r\n                <h3 style=\"text-align: center;\">กรุณาเลือกเวลาที่ต้องการค้นหาค่าไฟ</h3>\r\n                <br>\r\n                <form>\r\n                    <mat-form-field>\r\n                        <mat-select placeholder=\"กรุณาเลือกเดือน\" [(ngModel)]=\"selectedMonth\" name=\"month\"\r\n                            [formControl]=\"monthForm\" required>\r\n                            <mat-option *ngFor=\"let month of months\" [value]=\"month.month\">\r\n                                {{month.m}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                        <mat-error *ngIf=\"monthForm.hasError('required')\">กรุณาเลือกเดือน</mat-error>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <mat-select placeholder=\"กรุณาเลือกปี (พ.ศ.)\" [(ngModel)]=\"selectedYear\" name=\"year\"\r\n                            [formControl]=\"yearForm\" required>\r\n                            <mat-option *ngFor=\"let year of years\" [value]=\"year.year\">\r\n                                {{year.y}}\r\n                            </mat-option>\r\n                        </mat-select>\r\n                        <mat-error *ngIf=\"yearForm.hasError('required')\">กรุณาเลือกปี (พ.ศ.)</mat-error>\r\n                    </mat-form-field>\r\n                    <!-- <p> เวลาที่เลือก :{{selectedMonth.m}} {{selectedYear.y}} </p> -->\r\n                </form>\r\n                <div class=\"wrapper-center\">\r\n                    <button mat-raised-button color=\"accent\" class=\"button\" (click)=\"openDialog()\">\r\n                        <mat-icon>search</mat-icon> ค้นหา\r\n                    </button>\r\n                </div>\r\n            </mat-tab>\r\n        </mat-tab-group>\r\n    </mat-card-content>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/admin/material-component/electric-bill/electric-bill.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/admin/material-component/electric-bill/electric-bill.component.ts ***!
  \***********************************************************************************/
/*! exports provided: ElectricBillComponent, ReportData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElectricBillComponent", function() { return ElectricBillComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportData", function() { return ReportData; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_meter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/meter.service */ "./src/app/shared/meter.service.ts");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/user.service */ "./src/app/shared/user.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var ElectricBillComponent = /** @class */ (function () {
    function ElectricBillComponent(meterService, dialogMeter) {
        this.meterService = meterService;
        this.dialogMeter = dialogMeter;
        this.selectedYear = '2018';
        this.monthForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
        this.yearForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]);
        this.months = [
            { month: 'January', m: 'มกราคม' }, { month: 'February', m: 'กุมภาพันธ์' }, { month: 'March', m: 'มีนาคม' }, { month: 'April', m: 'เมษายน' },
            { month: 'May', m: 'พฤษภาคม' }, { month: 'June', m: 'มิถุนายน' }, { month: 'July', m: 'กรกฎาคม' }, { month: 'August', m: 'สิงหาคม' },
            { month: 'September', m: 'กันยายน' }, { month: 'October', m: 'ตุลาคม' }, { month: 'November', m: 'พฤศจิกายน' }, { month: 'December', m: 'ธันวาคม' },
        ];
        this.years = [
            { year: '2018', y: '2561' }
        ];
        this.displayedColumns = ['room', 'start', 'actions', 'bill']; //, 'shortCircuit'
    }
    ElectricBillComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.meterService.showBillUserAll().subscribe(function (data) {
            if (!data) {
                return;
            }
            _this.data = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](data);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
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
        var time = new Date().getMonth();
        this.selectedMonth = month[time];
    };
    ElectricBillComponent.prototype.onSearchClear = function () {
        this.searchKey = "";
        this.applyFilter();
    };
    ElectricBillComponent.prototype.applyFilter = function () {
        this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
    };
    ElectricBillComponent.prototype.openDialog = function (element) {
        var _this = this;
        var dialogRef = this.dialogMeter.open(ReportData, {
            width: '95%',
            data: {
                month: this.selectedMonth,
                year: this.selectedYear,
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], ElectricBillComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], ElectricBillComponent.prototype, "paginator", void 0);
    ElectricBillComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-electric-bill',
            template: __webpack_require__(/*! ./electric-bill.component.html */ "./src/app/admin/material-component/electric-bill/electric-bill.component.html"),
            styles: [__webpack_require__(/*! ./electric-bill.component.css */ "./src/app/admin/material-component/electric-bill/electric-bill.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_meter_service__WEBPACK_IMPORTED_MODULE_1__["MeterService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], ElectricBillComponent);
    return ElectricBillComponent;
}());

var ReportData = /** @class */ (function () {
    function ReportData(dialogRef, data, meterService, userService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.meterService = meterService;
        this.userService = userService;
        this.Data = [{}];
        this.displayedColumns = ['room', 'start', 'actions', 'bill'];
    }
    //
    ReportData.prototype.ngOnInit = function () {
        var _this = this;
        this.meterService.report(this.data.month, this.data.year).subscribe(function (data) {
            if (!data) {
                return;
            }
            _this.dataSource = data;
            _this.Data = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.dataSource);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
        this.meterService.reportTH(this.data.month, this.data.year).subscribe(function (data) {
            if (!data) {
                return;
            }
            _this.dataTH = data;
            for (var i = 0; i < data.length; i++) {
                _this.conTime(i);
            }
        });
    };
    ReportData.prototype.conTime = function (index) {
        if (this.dataTH[index].เวลาที่เริ่มบันทึก == 'ไม่มีการบันทึกค่าไฟ') {
        }
        else {
            var time = this.dataTH[index].เวลาที่เริ่มบันทึก.split(",", 5);
            var day = this.conDayTH(time[0]);
            var daynum = time[1];
            var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
            var year = this.conYearTh(time[3].split(" ", 2)[1]);
            var times = time[4];
            var data = times + daynum + " " + Month + " " + year;
            this.dataTH[index].เวลาที่เริ่มบันทึก = data;
            var etime = this.dataTH[index].เวลาสิ้นสุด.split(",", 5);
            var eday = this.conDayTH(etime[0]);
            var edaynum = etime[1];
            var eMonth = this.conMonthTh(etime[2].split(" ", 2)[1]);
            var eyear = this.conYearTh(etime[3].split(" ", 2)[1]);
            var etimes = etime[4];
            var edata = etimes + edaynum + " " + eMonth + " " + eyear;
            this.dataTH[index].เวลาสิ้นสุด = edata;
        }
    };
    ReportData.prototype.conYearTh = function (selectedyear) {
        return parseInt(selectedyear) + 543;
    };
    ReportData.prototype.conMonthTh = function (selectedMonth) {
        var selectedMonthTH;
        if (selectedMonth == 'January') {
            selectedMonthTH = 'มกราคม';
        }
        else if (selectedMonth == 'February') {
            selectedMonthTH = 'กุมภาพันธ์';
        }
        else if (selectedMonth == 'March') {
            selectedMonthTH = 'มีนาคม';
        }
        else if (selectedMonth == 'April') {
            selectedMonthTH = 'เมษายน';
        }
        else if (selectedMonth == 'May') {
            selectedMonthTH = 'พฤษภาคม';
        }
        else if (selectedMonth == 'June') {
            selectedMonthTH = 'มิถุนายน';
        }
        else if (selectedMonth == 'July') {
            selectedMonthTH = 'กรกฎาคม';
        }
        else if (selectedMonth == 'August') {
            selectedMonthTH = 'สิงหาคม';
        }
        else if (selectedMonth == 'September') {
            selectedMonthTH = 'กันยายน';
        }
        else if (selectedMonth == 'October') {
            selectedMonthTH = 'ตุลาคม';
        }
        else if (selectedMonth == 'November') {
            selectedMonthTH = 'พฤศจิกายน';
        }
        else if (selectedMonth == 'December') {
            selectedMonthTH = 'ธันวาคม';
        }
        return selectedMonthTH;
    };
    ReportData.prototype.conDayTH = function (data) {
        var dayTH;
        if (data == 'Sunday') {
            dayTH = 'อาทิตย์';
        }
        else if (data == 'Monday') {
            dayTH = 'จันทร์';
        }
        else if (data == 'Tuesday') {
            dayTH = 'อังคาร';
        }
        else if (data == 'Wednesday') {
            dayTH = 'พุธ';
        }
        else if (data == 'Thursday') {
            dayTH = 'พฤหัสบดี';
        }
        else if (data == 'Friday') {
            dayTH = 'ศุกร์';
        }
        else if (data == 'Saturday') {
            dayTH = 'เสาร์';
        }
        else {
            dayTH = 'ไม่มีการบันทึกค่า';
        }
        return dayTH;
    };
    ReportData.prototype.exportAsXLSX = function () {
        var monthTH = this.conMonthTh(this.data.month);
        var yearTH = this.conYearTh(this.data.year);
        this.userService.exportAsExcelFile(this.dataTH, "ค่าไฟ" + monthTH + yearTH);
    };
    ReportData.prototype.onSearchClearReport = function () {
        this.searchKeyReport = "";
        this.applyFilterReport();
    };
    ReportData.prototype.applyFilterReport = function () {
        this.dataSource.filter = this.searchKeyReport.trim().toLocaleLowerCase();
    };
    ReportData.prototype.onClear = function () {
        this.dialogRef.close();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], ReportData.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], ReportData.prototype, "paginator", void 0);
    ReportData = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-ReportData',
            template: __webpack_require__(/*! ./report.html */ "./src/app/admin/material-component/electric-bill/report.html")
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object, _shared_meter_service__WEBPACK_IMPORTED_MODULE_1__["MeterService"],
            _shared_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]])
    ], ReportData);
    return ReportData;
}());



/***/ }),

/***/ "./src/app/admin/material-component/electric-bill/filter.pipe.ts":
/*!***********************************************************************!*\
  !*** ./src/app/admin/material-component/electric-bill/filter.pipe.ts ***!
  \***********************************************************************/
/*! exports provided: FilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipe", function() { return FilterPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (items, searchText) {
        if (!items)
            return [];
        if (!searchText)
            return items;
        searchText = searchText.toLocaleLowerCase();
        var con = items.find(function (element) {
            return element.room.toLowerCase().includes(searchText);
        });
        var sum = [];
        var _loop_1 = function (sub) {
            if (items.find(function (fruit) { return sub.room.includes(searchText); })) {
                console.log('1');
                sum.push(sub);
            }
        };
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var sub = items_1[_i];
            _loop_1(sub);
        }
        return sum;
    };
    FilterPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'filter' })
    ], FilterPipe);
    return FilterPipe;
}());



/***/ }),

/***/ "./src/app/admin/material-component/electric-bill/report.html":
/*!********************************************************************!*\
  !*** ./src/app/admin/material-component/electric-bill/report.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"search-div\">\r\n    <mat-form-field class=\"search-form-field\" floatLabel=\"never\">\r\n        <input matInput [(ngModel)]=\"searchKeyReport\" placeholder=\"ค้นหาค่าไฟ\" autocomplete=\"off\" (keyup)=\"applyFilterReport()\">\r\n        <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"searchKeyReport\" (click)=\"onSearchClearReport()\">\r\n            <mat-icon>close</mat-icon>\r\n        </button>\r\n    </mat-form-field>\r\n\r\n</div>\r\n<mat-dialog-content class=\"mat-typography\">\r\n    <div class=\"mat-elevation-z8 size\">\r\n        <mat-table [dataSource]=\"dataSource\" matSort>\r\n            <ng-container matColumnDef=\"room\">\r\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อห้อง</mat-header-cell>\r\n                <mat-cell *matCellDef=\"let element\">{{element.Room}}</mat-cell>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"start\" sticky>\r\n                <mat-header-cell *matHeaderCellDef mat-sort-header>หน่วยไฟที่เริ่มบันทึก</mat-header-cell>\r\n                <mat-cell *matCellDef=\"let element\">{{element.startActiveEnergy}}</mat-cell>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"actions\">\r\n                <mat-header-cell *matHeaderCellDef mat-sort-header>หน่วยไฟสิ้นสุดสิ้นสุด</mat-header-cell>\r\n                <mat-cell *matCellDef=\"let element\">\r\n                    {{element.endActiveEnergy}}\r\n                </mat-cell>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"bill\">\r\n                <mat-header-cell *matHeaderCellDef>ค่าไฟ (บาท)</mat-header-cell>\r\n                <mat-cell *matCellDef=\"let element\">{{element.Bill}}</mat-cell>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"noData\">\r\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\r\n                    ไม่มีข้อมูล\r\n                </mat-footer-cell>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"loading\">\r\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\r\n                    กำลังดาวน์โหลดข้อมูล\r\n                </mat-footer-cell>\r\n            </ng-container>\r\n            <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n            <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n            <mat-footer-row *matFooterRowDef=\"['noData']\" [ngClass]=\"{'hide':!(dataSource!=null && dataSource.data.length==0)}\"></mat-footer-row>\r\n            <mat-footer-row *matFooterRowDef=\"['loading']\" [ngClass]=\"{'hide':dataSource!=null}\"></mat-footer-row>\r\n        </mat-table>\r\n        <mat-paginator [pageSizeOptions]=\"[10, 20, 50, 100]\" [pageSize]=\"10\" showFirstLastButtons></mat-paginator>\r\n    </div>\r\n</mat-dialog-content>\r\n<br>\r\n<div class=\"wrapper-center button-row\">\r\n    <button mat-raised-button color=\"primary\" (click)=\"exportAsXLSX()\">\r\n        <mat-icon>cloud_download</mat-icon> ดาวโหลด (.xlsx)\r\n    </button>\r\n    <button mat-raised-button color=\"warn\" (click)=\"onClear()\">\r\n        <mat-icon>clear</mat-icon>ปิด\r\n    </button>\r\n</div>"

/***/ }),

/***/ "./src/app/admin/material-component/manage-meter/ad/ad.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/admin/material-component/manage-meter/ad/ad.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/material-component/manage-meter/ad/ad.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/admin/material-component/manage-meter/ad/ad.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card-content>\n  <div>\n    <!-- <img src=\"/assets/img/users.png\" id=\"icon\" alt=\"User Icon\" /> -->\n  </div>\n  <form #signUpForm=\"ngForm\" (ngSubmit)=\"signUpForm.valid && onSubmit(signUpForm)\">\n    <mat-form-field>\n      <input autofocus id=\"myTextField\" matInput type=\"text\" #Maddr=\"ngModel\" [(ngModel)]=\"meterService.selectedUser.Maddr\" name=\"Maddr\"\n        placeholder=\"ชื่อมิเตอร์ไฟฟ้า (Mac Address)\" required [ngClass]=\"{'invalid-textbox' :signUpForm.submitted && !Maddr.valid }\">\n    </mat-form-field>\n    <div *ngIf=\"signUpForm.submitted && !Maddr.valid\">\n      <label  class=\"validation-message\" style=\"color: red\">กรุณากรอกชื่อมิเตอร์ไฟฟ้า</label>\n    </div>\n    <mat-form-field>\n      <input matInput type=\"text\" #room=\"ngModel\" [(ngModel)]=\"meterService.selectedUser.room\" name=\"room\" placeholder=\"ชื่อห้อง\"\n        required [ngClass]=\"{'invalid-textbox' :signUpForm.submitted && !room.valid }\">\n    </mat-form-field>\n    <div *ngIf=\"signUpForm.submitted && !room.valid\">\n      <label class=\"validation-message\" style=\"color: red\">กรุณากรอกชื่อห้อง</label>\n    </div>\n    <div style=\"width:135px; margin-right:auto; margin-left:auto;\">\n        <input class=\"btn btn-success\" type=\"submit\" value=\"เพิ่มมิเตอร์ไฟฟ้า\" (click)='focusMethod()'>\n    </div>\n  </form>\n  <br>\n  <!-- Success message -->\n  <div class=\"success\" *ngIf=\"showSucessMessage\" class=\"success\">\n    เพิ่มมิเตอร์ไฟฟ้าสำเร็จ\n  </div>\n\n  <!-- Error message -->\n  <div class=\"alert\" *ngIf=\"serverErrorMessages\" class=\"warn\">\n    {{serverErrorMessages}}\n  </div>\n</mat-card-content>"

/***/ }),

/***/ "./src/app/admin/material-component/manage-meter/ad/ad.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/admin/material-component/manage-meter/ad/ad.component.ts ***!
  \**************************************************************************/
/*! exports provided: AdComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdComponent", function() { return AdComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_meter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/meter.service */ "./src/app/shared/meter.service.ts");
/* harmony import */ var _shared_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/notification.service */ "./src/app/shared/notification.service.ts");
/* harmony import */ var _manage_meter_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../manage-meter.component */ "./src/app/admin/material-component/manage-meter/manage-meter.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdComponent = /** @class */ (function () {
    function AdComponent(meterService, notificationService, manageMeterComponent) {
        this.meterService = meterService;
        this.notificationService = notificationService;
        this.manageMeterComponent = manageMeterComponent;
    }
    AdComponent.prototype.ngOnInit = function () {
        this.focusMethod = function getFocus() {
            document.getElementById("myTextField").focus();
        };
    };
    AdComponent.prototype.focusMethod = function () {
        this.focusMethod = function getFocus() {
            document.getElementById("myTextField").focus();
        };
    };
    AdComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.meterService.postUser(form.value).subscribe(function (res) {
            _this.showSucessMessage = true;
            setTimeout(function () { return _this.showSucessMessage = false; }, 4000);
            _this.resetForm(form);
        }, function (err) {
            if (err.status === 422) {
                _this.serverErrorMessages = err.error.join('<br/>');
            }
            else
                _this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        });
        this.ngOnInit();
    };
    AdComponent.prototype.resetForm = function (form) {
        this.meterService.selectedUser = {
            Maddr: '',
            room: ''
        };
        form.resetForm();
        this.serverErrorMessages = '';
        this.manageMeterComponent.onLoad();
    };
    AdComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-ad',
            template: __webpack_require__(/*! ./ad.component.html */ "./src/app/admin/material-component/manage-meter/ad/ad.component.html"),
            styles: [__webpack_require__(/*! ./ad.component.css */ "./src/app/admin/material-component/manage-meter/ad/ad.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_meter_service__WEBPACK_IMPORTED_MODULE_1__["MeterService"],
            _shared_notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"],
            _manage_meter_component__WEBPACK_IMPORTED_MODULE_3__["ManageMeterComponent"]])
    ], AdComponent);
    return AdComponent;
}());



/***/ }),

/***/ "./src/app/admin/material-component/manage-meter/edit.html":
/*!*****************************************************************!*\
  !*** ./src/app/admin/material-component/manage-meter/edit.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"meterService.form\" class=\"normal-form\" #signUpForm=\"ngForm\" (ngSubmit)=\"signUpForm.valid && onSubmit(signUpForm)\">\r\n    <mat-grid-list cols=\"2\" rowHeight=\"300px\">\r\n        <div class=\"controles-container\">\r\n          <h5>ชื่อมิเตอร์ไฟฟ้า (Mac Address) : {{data.Maddr}}</h5>\r\n          <input [(ngModel)]=\"data.Maddr\" type=\"hidden\" formControlName=\"Maddr\">\r\n           <mat-form-field >\r\n            <input [(ngModel)]=\"data.room\" formControlName=\"room\" value=\"{{data.room}}\"\r\n              matInput placeholder=\"ชื่อห้อง*\">\r\n          </mat-form-field>\r\n          <div class=\"button-row\">\r\n            <button mat-raised-button color=\"primary\" type=\"submit\" value=\"Sign Up\" type=\"submit\" >แก้ไขมิเตอร์ไฟฟ้า</button>\r\n            <button mat-raised-button color=\"warn\" (click)=\"onClear()\">ปิด</button>\r\n          </div>\r\n        </div>\r\n    </mat-grid-list>\r\n  </form> \r\n  "

/***/ }),

/***/ "./src/app/admin/material-component/manage-meter/manage-meter.component.css":
/*!**********************************************************************************!*\
  !*** ./src/app/admin/material-component/manage-meter/manage-meter.component.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/material-component/manage-meter/manage-meter.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/admin/material-component/manage-meter/manage-meter.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-tab-group>\n      <mat-tab label=\"แก้ไขและลบมิเตอร์\" (click)=\"onLoad()\">\n        <mat-card-content>\n          <div class=\"search-div\">\n            <mat-form-field class=\"search-form-field\" floatLabel=\"never\">\n              <input matInput [(ngModel)]=\"searchKey\" placeholder=\"ค้นหามิเตอร์ไฟฟ้า\" autocomplete=\"off\" (keyup)=\"applyFilter()\">\n              <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"searchKey\" (click)=\"onSearchClear()\">\n                <mat-icon>close</mat-icon>\n              </button>\n\n            </mat-form-field><button mat-button matSuffix mat-icon-button (click)=\"ngOnInit()\">\n              <mat-icon>refresh</mat-icon>\n            </button>\n          </div>\n          <div class=\"mat-elevation-z8 size\">\n            <mat-table [dataSource]=\"dataSource\" matSort>\n              <ng-container matColumnDef=\"Maddr\" sticky>\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อมิเตอร์ไฟฟ้า (Mac Address)</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.Maddr}}</mat-cell>\n              </ng-container>\n              <!-- <ng-container matColumnDef=\"shortCircuit\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>Power Cut</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.shortCircuit}}</mat-cell>\n              </ng-container> -->\n              <ng-container matColumnDef=\"room\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อห้อง</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.room}}</mat-cell>\n              </ng-container>\n              <!-- <ng-container matColumnDef=\"date\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>เวลาที่เพิ่มมิเตอร์ไฟฟ้า</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.date}}</mat-cell>\n              </ng-container> -->\n              <ng-container matColumnDef=\"actions\">\n                <mat-header-cell *matHeaderCellDef>แก้ไขและลบมิเตอร์</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">\n                  <button mat-icon-button (click)=\"openDialog(element)\">\n                    <mat-icon>create</mat-icon>\n                  </button>\n                  <button mat-icon-button color=\"warn\" (click)=' onDelete(element.Maddr)'>\n                    <mat-icon>delete_outline</mat-icon>\n                  </button>\n                </mat-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"noData\">\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\n                  ไม่มีข้อมูล\n                </mat-footer-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"loading\">\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\n                  กำลังดาวน์โหลดข้อมูล\n                </mat-footer-cell>\n              </ng-container>\n              <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n              <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n              <mat-footer-row *matFooterRowDef=\"['noData']\" [ngClass]=\"{'hide':!(dataSource!=null && dataSource.data.length==0)}\"></mat-footer-row>\n              <mat-footer-row *matFooterRowDef=\"['loading']\" [ngClass]=\"{'hide':dataSource!=null}\"></mat-footer-row>\n            </mat-table>\n            <mat-paginator [pageSizeOptions]=\"[10, 20, 50, 100]\" [pageSize]=\"10\" showFirstLastButtons></mat-paginator>\n          </div>\n        </mat-card-content>\n      </mat-tab>\n      <mat-tab label=\"เพิ่มมิเตอร์ไฟฟ้า\">\n        <mat-card-content>\n          <app-ad></app-ad>\n        </mat-card-content>\n      </mat-tab>\n    </mat-tab-group>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/admin/material-component/manage-meter/manage-meter.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/admin/material-component/manage-meter/manage-meter.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ManageMeterComponent, DialogOverviewExampleDialogMeter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageMeterComponent", function() { return ManageMeterComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogMeter", function() { return DialogOverviewExampleDialogMeter; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_meter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/meter.service */ "./src/app/shared/meter.service.ts");
/* harmony import */ var _shared_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/notification.service */ "./src/app/shared/notification.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ManageMeterComponent = /** @class */ (function () {
    function ManageMeterComponent(meterService, notificationService, dialogMeter) {
        this.meterService = meterService;
        this.notificationService = notificationService;
        this.dialogMeter = dialogMeter;
        this.displayedColumns = ['room', 'Maddr', 'actions'];
    }
    ManageMeterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.meterService.showAllMeter().subscribe(function (data) {
            if (!data) {
                return;
            }
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](data);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
            console.log(data);
        });
    };
    ManageMeterComponent.prototype.onDelete = function (Maddr) {
        var _this = this;
        if (confirm('Are you sure to delete this record ?')) {
            this.meterService.deleteMeter(Maddr).subscribe(function (res) {
                _this.userDetails = res['user'];
                _this.ngOnInit();
            }, function (err) {
                console.log(err);
            });
            this.notificationService.success('! Deleted successfully');
        }
    };
    ManageMeterComponent.prototype.onSearchClear = function () {
        this.searchKey = "";
        this.applyFilter();
    };
    ManageMeterComponent.prototype.applyFilter = function () {
        this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
    };
    ManageMeterComponent.prototype.onLoad = function () {
        this.ngOnInit();
    };
    ManageMeterComponent.prototype.openDialog = function (element) {
        var _this = this;
        this.Maddr = element.Maddr;
        this.status = element.status;
        this.timeDelay = element.timeDelay;
        this.room = element.room;
        var dialogRef = this.dialogMeter.open(DialogOverviewExampleDialogMeter, {
            width: '60%',
            data: {
                Maddr: this.Maddr,
                status: this.status,
                timeDelay: this.timeDelay,
                room: this.room
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], ManageMeterComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], ManageMeterComponent.prototype, "paginator", void 0);
    ManageMeterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-manage-meter',
            template: __webpack_require__(/*! ./manage-meter.component.html */ "./src/app/admin/material-component/manage-meter/manage-meter.component.html"),
            styles: [__webpack_require__(/*! ./manage-meter.component.css */ "./src/app/admin/material-component/manage-meter/manage-meter.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_meter_service__WEBPACK_IMPORTED_MODULE_1__["MeterService"],
            _shared_notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], ManageMeterComponent);
    return ManageMeterComponent;
}());

var DialogOverviewExampleDialogMeter = /** @class */ (function () {
    function DialogOverviewExampleDialogMeter(dialogRef, data, meterService, notificationService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.meterService = meterService;
        this.notificationService = notificationService;
    }
    DialogOverviewExampleDialogMeter.prototype.onNoClick = function () {
        this.dialogRef.close();
        console.log(this.data);
    };
    DialogOverviewExampleDialogMeter.prototype.onClear = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogMeter.prototype.onSubmit = function (form) {
        var _this = this;
        this.meterService.updateMeter(form.value).subscribe(function (res) {
            _this.showSucessMessage = true;
            setTimeout(function () { return _this.showSucessMessage = false; }, 4000);
            _this.notificationService.success('Edit successfully !!!');
        }, function (err) {
            if (err.status === 422) {
                _this.serverErrorMessages = err.error.join('<br/>');
            }
            else {
                _this.notificationService.warn('Edit Fail!!!');
                _this.serverErrorMessages = 'Something went wrong.Please contact admin.';
            }
        });
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogMeter = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dialog-overview-example-dialog-admin',
            template: __webpack_require__(/*! ./edit.html */ "./src/app/admin/material-component/manage-meter/edit.html")
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialogRef"], Object, _shared_meter_service__WEBPACK_IMPORTED_MODULE_1__["MeterService"],
            _shared_notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"]])
    ], DialogOverviewExampleDialogMeter);
    return DialogOverviewExampleDialogMeter;
}());



/***/ }),

/***/ "./src/app/admin/material-component/manage-user/create.html":
/*!******************************************************************!*\
  !*** ./src/app/admin/material-component/manage-user/create.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"userService.form\" class=\"normal-form\" #signUpForm=\"ngForm\" (ngSubmit)=\"signUpForm.valid && onSubmit(signUpForm)\" class=\"size\">\r\n  <mat-grid-list cols=\"2\" rowHeight=\"300px\">\r\n    <mat-grid-tile>\r\n      <div class=\"controles-container\">\r\n        <h5>ชื่อผู้ใช้งาน : {{data.username}}</h5>\r\n        <input [(ngModel)]=\"data.username\" type=\"hidden\" formControlName=\"username\">\r\n        <mat-form-field >\r\n          <input [(ngModel)]=\"data.firstname\" formControlName=\"firstname\" value=\"{{data.firstname.substring(0,1).toUpperCase()}}{{data.firstname.substring(1,data.firstname. length)}}\"\r\n            matInput placeholder=\"ชื่อ*\">\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n          <input [(ngModel)]=\"data.lastname\" formControlName=\"lastname\" value=\"{{data.lastname.substring(0,1).toUpperCase()}}{{data.lastname.substring(1,data.lastname. length)}}\"\r\n            matInput placeholder=\"นามสกุล*\">\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n          <input [(ngModel)]=\"data.email\" formControlName=\"email\" value=\"{{data.email}}\" matInput placeholder=\"อีเมล*\">\r\n        </mat-form-field>\r\n        <mat-form-field>\r\n          <input [(ngModel)]=\"data.room\" formControlName=\"room\" value=\"{{data.room}}\" matInput placeholder=\"ชื่อห้อง*\">\r\n        </mat-form-field>\r\n      </div>\r\n    </mat-grid-tile>\r\n    <mat-grid-tile>\r\n      <div class=\"controles-container\">\r\n        <div class=\"add-bottom-padding\">\r\n          <mat-radio-group [(ngModel)]=\"data.permission\" formControlName=\"permission\">\r\n            <span>ระดับสิทธิผู้ใช้ : </span>\r\n            <mat-radio-button value=\"genaral\">ผู้ใช้งานทั่วไป</mat-radio-button>\r\n            <mat-radio-button value=\"admin\">ผู้ดูแลระบบ</mat-radio-button>\r\n          </mat-radio-group>\r\n        </div>\r\n        <!-- <mat-form-field>\r\n          <mat-select formControlName=\"Maddr\" placeholder=\"Electric Meter\">\r\n            <mat-option value=\"Don't Have\">Don't Have</mat-option>\r\n            <ng-container *ngFor=\"let department of departments\">\r\n              <mat-option value=\"{{department.Maddr}}\">{{department.Maddr}}</mat-option>\r\n            </ng-container>\r\n          </mat-select>\r\n        </mat-form-field> -->\r\n        <div class=\"button-row\">\r\n          <button mat-raised-button color=\"primary\" type=\"submit\" value=\"Sign Up\" type=\"submit\" >แก้ไข</button>\r\n          <button mat-raised-button color=\"warn\" (click)=\"onClear()\">ปิด</button>\r\n        </div>\r\n      </div>\r\n\r\n    </mat-grid-tile>\r\n  </mat-grid-list>\r\n</form> \r\n"

/***/ }),

/***/ "./src/app/admin/material-component/manage-user/manage-user.component.css":
/*!********************************************************************************!*\
  !*** ./src/app/admin/material-component/manage-user/manage-user.component.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* table {\r\n    width: 100%;\r\n  }\r\n\r\n\r\n  input[type=button], input[type=submit], input[type=reset]  {\r\n    cursor: pointer;\r\n    background-color: #56baed;\r\n    border: none;\r\n    color: white;\r\n    padding: 15px 80px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    text-transform: uppercase;\r\n    font-size: 13px;\r\n    -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);\r\n    box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);\r\n    -webkit-border-radius: 5px 5px 5px 5px;\r\n    border-radius: 5px 5px 5px 5px;\r\n    margin: 5px 20px 40px 20px;\r\n    -webkit-transition: all 0.3s ease-in-out;\r\n    -moz-transition: all 0.3s ease-in-out;\r\n    -ms-transition: all 0.3s ease-in-out;\r\n    -o-transition: all 0.3s ease-in-out;\r\n    transition: all 0.3s ease-in-out;\r\n  }\r\n  \r\n  input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {\r\n    background-color: #39ace7;\r\n  }\r\n  \r\n  input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {\r\n    -moz-transform: scale(0.95);\r\n    -webkit-transform: scale(0.95);\r\n    -o-transform: scale(0.95);\r\n    -ms-transform: scale(0.95);\r\n    transform: scale(0.95);\r\n  }\r\n  \r\n  input[type=submit]:disabled{\r\n    background-color: grey;\r\n    color: white;\r\n  }\r\n  \r\n  input[type=text],input[type=password] {\r\n    background-color: #f6f6f6;\r\n    border: none;\r\n    color: #0d0d0d;\r\n    padding: 15px 32px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    margin: 5px;\r\n    width: 100%;\r\n    border: 2px solid #f6f6f6;\r\n    -webkit-transition: all 0.5s ease-in-out;\r\n    -moz-transition: all 0.5s ease-in-out;\r\n    -ms-transition: all 0.5s ease-in-out;\r\n    -o-transition: all 0.5s ease-in-out;\r\n    transition: all 0.5s ease-in-out;\r\n    -webkit-border-radius: 5px 5px 5px 5px;\r\n    border-radius: 5px 5px 5px 5px;\r\n  }\r\n  \r\n  input[type=text]:focus,input[type=password]:focus {\r\n    background-color: #fff;\r\n    border-bottom: 2px solid #5fbae9;\r\n  }\r\n  \r\n  input[type=text]:placeholder {\r\n    color: #cccccc;\r\n  }\r\n  \r\n  input[type=text].invalid-textbox,input[type=password].invalid-textbox{\r\n  border-bottom: 2px solid #ed5558;\r\n  }\r\n  \r\n  label.validation-message{\r\n    color:#ed5558;\r\n  }\r\n  \r\n  \r\n  \r\n  .fadeInDown {\r\n    -webkit-animation-name: fadeInDown;\r\n    animation-name: fadeInDown;\r\n    -webkit-animation-duration: 1s;\r\n    animation-duration: 1s;\r\n    -webkit-animation-fill-mode: both;\r\n    animation-fill-mode: both;\r\n  }\r\n  \r\n  @-webkit-keyframes fadeInDown {\r\n    0% {\r\n      opacity: 0;\r\n      -webkit-transform: translate3d(0, -100%, 0);\r\n      transform: translate3d(0, -100%, 0);\r\n    }\r\n    100% {\r\n      opacity: 1;\r\n      -webkit-transform: none;\r\n      transform: none;\r\n    }\r\n  }\r\n  \r\n  @keyframes fadeInDown {\r\n    0% {\r\n      opacity: 0;\r\n      -webkit-transform: translate3d(0, -100%, 0);\r\n      transform: translate3d(0, -100%, 0);\r\n    }\r\n    100% {\r\n      opacity: 1;\r\n      -webkit-transform: none;\r\n      transform: none;\r\n    }\r\n  }\r\n  \r\n  @-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }\r\n  @-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }\r\n  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }\r\n  \r\n  .fadeIn {\r\n    opacity:0;\r\n    -webkit-animation:fadeIn ease-in 1;\r\n    -moz-animation:fadeIn ease-in 1;\r\n    animation:fadeIn ease-in 1;\r\n  \r\n    -webkit-animation-fill-mode:forwards;\r\n    -moz-animation-fill-mode:forwards;\r\n    animation-fill-mode:forwards;\r\n  \r\n    -webkit-animation-duration:1s;\r\n    -moz-animation-duration:1s;\r\n    animation-duration:1s;\r\n  }\r\n  \r\n  .fadeIn.first {\r\n    -webkit-animation-delay: 0.4s;\r\n    -moz-animation-delay: 0.4s;\r\n    animation-delay: 0.4s;\r\n  }\r\n  \r\n  .fadeIn.second {\r\n    -webkit-animation-delay: 0.6s;\r\n    -moz-animation-delay: 0.6s;\r\n    animation-delay: 0.6s;\r\n  }\r\n  \r\n  .fadeIn.third {\r\n    -webkit-animation-delay: 0.8s;\r\n    -moz-animation-delay: 0.8s;\r\n    animation-delay: 0.8s;\r\n  }\r\n  \r\n  .fadeIn.fourth {\r\n    -webkit-animation-delay: 1s;\r\n    -moz-animation-delay: 1s;\r\n    animation-delay: 1s;\r\n  }\r\n  \r\n  .underlineHover:after {\r\n    display: block;\r\n    left: 0;\r\n    bottom: -10px;\r\n    width: 0;\r\n    height: 2px;\r\n    background-color: #56baed;\r\n    content: \"\";\r\n    transition: width 0.2s;\r\n  }\r\n  \r\n  .underlineHover:hover {\r\n    color: #0d0d0d;\r\n  }\r\n  \r\n  .underlineHover:hover:after{\r\n    width: 100%;\r\n  }\r\n   */\r\n"

/***/ }),

/***/ "./src/app/admin/material-component/manage-user/manage-user.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/admin/material-component/manage-user/manage-user.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-tab-group>\n      <mat-tab label=\"แก้ไขและลบบัญชีผู้ใช้\">\n        <mat-card-content>\n          <div class=\"search-div\">\n            <mat-form-field class=\"search-form-field\" floatLabel=\"never\">\n              <input matInput [(ngModel)]=\"searchKey\" placeholder=\"ค้นหาบัญชีผู้ใช้\" autocomplete=\"off\" (keyup)=\"applyFilter()\">\n              <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"searchKey\" (click)=\"onSearchClear()\">\n                <mat-icon>close</mat-icon>\n              </button>\n\n            </mat-form-field><button mat-button matSuffix mat-icon-button (click)=\"ngOnInit()\">\n              <mat-icon>refresh</mat-icon>\n            </button>\n          </div>\n          <!-- style=\"min-width: 1800px;\" -->\n          <div class=\"mat-elevation-z8 size\" >\n            <mat-table [dataSource]=\"dataSource\" matSort>\n              <ng-container matColumnDef=\"username\" sticky>\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อผู้ใช้</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.username}}</mat-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"firstname\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อ</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.firstname.substring(0,1).toUpperCase()}}{{element.firstname.substring(1,element.firstname.length)}}</mat-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"lastname\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>นามสกุล</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.lastname.substring(0,1).toUpperCase()}}{{element.lastname.substring(1,element.lastname.length)}}</mat-cell>\n              </ng-container>\n              <!-- <ng-container matColumnDef=\"email\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>อีเมล</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.email}}</mat-cell>\n              </ng-container> -->\n\n              <ng-container matColumnDef=\"room\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อห้อง</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.room}}</mat-cell>\n              </ng-container>\n              <!-- <ng-container matColumnDef=\"permission\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ระดับสิทธิผู้ใช้</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.permission}}</mat-cell>\n              </ng-container> -->\n              <!-- <ng-container matColumnDef=\"date\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>เวลาที่เพิ่มบัญชี</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.date}}</mat-cell>\n              </ng-container> -->\n              <ng-container matColumnDef=\"actions\">\n                <mat-header-cell *matHeaderCellDef>แก้ไขและลบบัญชีผู้ใช้</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">\n                  <button mat-icon-button (click)=\"openDialog(element)\">\n                    <mat-icon>create</mat-icon>\n                  </button>\n                  <button mat-icon-button color=\"warn\" (click)=' onDelete(element.username)'>\n                    <mat-icon>delete_outline</mat-icon>\n                  </button>\n                </mat-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"noData\">\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\n                  No data.\n                </mat-footer-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"loading\">\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\n                  Loading data...\n                </mat-footer-cell>\n              </ng-container>\n              <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n              <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n              <mat-footer-row *matFooterRowDef=\"['noData']\" [ngClass]=\"{'hide':!(dataSource!=null && dataSource.data.length==0)}\"></mat-footer-row>\n              <mat-footer-row *matFooterRowDef=\"['loading']\" [ngClass]=\"{'hide':dataSource!=null}\"></mat-footer-row>\n            </mat-table>\n            <mat-paginator [pageSizeOptions]=\"[10, 20, 50, 100]\" [pageSize]=\"10\" showFirstLastButtons></mat-paginator>\n          </div>\n        </mat-card-content>\n      </mat-tab>\n      <mat-tab label=\"เพิ่มบัญชีผู้ใช้\">\n        <mat-card-content>\n          <div>\n            <!-- <img src=\"/assets/img/users.png\" id=\"icon\" alt=\"User Icon\" /> -->\n          </div>\n          <form #signUpForm=\"ngForm\" (ngSubmit)=\"signUpForm.valid && onSubmit(signUpForm)\">\n            <mat-form-field>\n              <input autofocus id=\"myTextField\" matInput type=\"text\" #username=\"ngModel\" [(ngModel)]=\"userService.selectedUser.username\" name=\"username\"\n                placeholder=\"ชื่อผู้ใช้งาน\" required [ngClass]=\"{'invalid-textbox' :signUpForm.submitted && !username.valid }\">\n            </mat-form-field>\n            <div *ngIf=\"signUpForm.submitted && !username.valid\">\n              <label class=\"validation-message\">กรุณากรอกชื่อผู้ใช้งาน</label>\n            </div>\n            <mat-form-field>\n              <input matInput type=\"text\" #firstname=\"ngModel\" [(ngModel)]=\"userService.selectedUser.firstname\" name=\"firstname\"\n                placeholder=\"ชื่อ\" required [ngClass]=\"{'invalid-textbox' :signUpForm.submitted && !firstname.valid }\">\n            </mat-form-field>\n            <div *ngIf=\"signUpForm.submitted && !firstname.valid\">\n              <label class=\"validation-message\">กรุณากรอกชื่อ</label>\n            </div>\n            <mat-form-field>\n              <input matInput type=\"text\" #lastname=\"ngModel\" [(ngModel)]=\"userService.selectedUser.lastname\" name=\"lastname\"\n                placeholder=\"นามสกุล\" required [ngClass]=\"{'invalid-textbox' :signUpForm.submitted && !lastname.valid }\">\n            </mat-form-field>\n            <div *ngIf=\"signUpForm.submitted && !lastname.valid\">\n              <label class=\"validation-message\">กรุณากรอกนามสกุล</label>\n            </div>\n            <mat-form-field>\n              <input matInput type=\"text\" #room=\"ngModel\" [(ngModel)]=\"userService.selectedUser.room\" name=\"room\"\n                placeholder=\"ชื่อห้อง\" required [ngClass]=\"{'invalid-textbox' :signUpForm.submitted && !room.valid }\">\n            </mat-form-field>\n            <div *ngIf=\"signUpForm.submitted && !room.valid\">\n              <label class=\"validation-message\">กรุณากรอกชื่อห้อง</label>\n            </div>\n            <mat-form-field>\n              <input matInput type=\"text\" #email=\"ngModel\" [(ngModel)]=\"userService.selectedUser.email\" name=\"email\"\n                placeholder=\"อีเมล\" required [pattern]=\"emailRegex\" [ngClass]=\"{'invalid-textbox' :signUpForm.submitted && !email.valid }\">\n            </mat-form-field>\n            <div *ngIf=\"signUpForm.submitted && email.errors\">\n              <label *ngIf=\"email.errors.required\" class=\"validation-message\">กรุณากรอกอีเมล</label>\n              <label *ngIf=\"email.errors.pattern\" class=\"validation-message\">ไม่สามารถใช้อีเมลนี้ได้</label>\n            </div>\n            <mat-form-field>\n              <input matInput type=\"password\" #password=\"ngModel\" [(ngModel)]=\"userService.selectedUser.password\" name=\"password\"\n                placeholder=\"รหัสผ่าน\" minlength=\"4\" required [ngClass]=\"{'invalid-textbox' :signUpForm.submitted && !password.valid }\">\n            </mat-form-field>\n            <div *ngIf=\"signUpForm.submitted && password.errors\">\n              <label *ngIf=\"password.errors.required\" class=\"validation-message\">กรุณากรอกรหัสผ่าน</label>\n              <label *ngIf=\"password.errors.minlength\" class=\"validation-message\">กรุณากรอกรหัสผ่านอย่างน้อย 4\n                ตัวอักษร.</label>\n            </div>\n            <div style=\"width:135px; margin-right:auto; margin-left:auto;\">\n              <input class=\"btn btn-success\" type=\"submit\" value=\"เพิ่มบัญชีผู้ใช้\" (click)='focusMethod()'>\n            </div>\n          </form>\n          <br>\n          <!-- Success message -->\n          <div class=\"success\" *ngIf=\"showSucessMessage\" class=\"success\">\n            เพิ่มบัญชีผู้ใช้สำเร็จ\n          </div>\n\n          <!-- Error message -->\n          <div class=\"alert\" *ngIf=\"serverErrorMessages\" class=\"warn\">\n            {{serverErrorMessages}}\n          </div>\n        </mat-card-content>\n      </mat-tab>\n    </mat-tab-group>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/admin/material-component/manage-user/manage-user.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/admin/material-component/manage-user/manage-user.component.ts ***!
  \*******************************************************************************/
/*! exports provided: ManageUserComponent, DialogOverviewExampleDialog2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageUserComponent", function() { return ManageUserComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialog2", function() { return DialogOverviewExampleDialog2; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/user.service */ "./src/app/shared/user.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/notification.service */ "./src/app/shared/notification.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var ManageUserComponent = /** @class */ (function () {
    function ManageUserComponent(userService, notificationService, dialog2) {
        this.userService = userService;
        this.notificationService = notificationService;
        this.dialog2 = dialog2;
        this.displayedColumns = ['username', 'firstname', 'lastname', 'room', 'actions'];
        this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }
    ManageUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getAllUser().subscribe(function (data) {
            if (!data) {
                return;
            }
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](data);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
        this.focusMethod = function getFocus() {
            document.getElementById("myTextField").focus();
        };
    };
    ManageUserComponent.prototype.focusMethod = function () {
        this.focusMethod = function getFocus() {
            document.getElementById("myTextField").focus();
        };
    };
    ManageUserComponent.prototype.onSearchClear = function () {
        this.searchKey = "";
        this.applyFilter();
    };
    ManageUserComponent.prototype.applyFilter = function () {
        this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
    };
    ManageUserComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.userService.postUser(form.value).subscribe(function (res) {
            _this.showSucessMessage = true;
            setTimeout(function () { return _this.showSucessMessage = false; }, 4000);
            _this.resetForm(form);
        }, function (err) {
            if (err.status === 422) {
                _this.serverErrorMessages = err.error.join('<br/>');
            }
            else
                _this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        });
        this.ngOnInit();
    };
    ManageUserComponent.prototype.resetForm = function (form) {
        this.userService.selectedUser = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            room: '',
        };
        form.resetForm();
        this.serverErrorMessages = '';
    };
    ManageUserComponent.prototype.onDelete = function (username) {
        var _this = this;
        if (confirm('Are you sure to delete this record ?')) {
            this.userService.deleteUserProfile(username).subscribe(function (res) {
                _this.userDetails = res['user'];
                _this.ngOnInit();
            }, function (err) {
                console.log(err);
            });
            this.notificationService.success('! Deleted successfully');
        }
    };
    ManageUserComponent.prototype.openDialog = function (element) {
        var _this = this;
        this.username = element.username;
        this.firstname = element.firstname;
        this.lastname = element.lastname;
        this.email = element.email;
        this.room = element.room;
        this.permission = element.permission;
        this.Maddr = element.Maddr;
        var dialogRef = this.dialog2.open(DialogOverviewExampleDialog2, {
            width: '90%',
            data: {
                username: this.username,
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                room: this.room,
                permission: this.permission,
                Maddr: this.Maddr,
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], ManageUserComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], ManageUserComponent.prototype, "paginator", void 0);
    ManageUserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-manage-user',
            template: __webpack_require__(/*! ./manage-user.component.html */ "./src/app/admin/material-component/manage-user/manage-user.component.html"),
            styles: [__webpack_require__(/*! ./manage-user.component.css */ "./src/app/admin/material-component/manage-user/manage-user.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _shared_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], ManageUserComponent);
    return ManageUserComponent;
}());

var DialogOverviewExampleDialog2 = /** @class */ (function () {
    function DialogOverviewExampleDialog2(dialogRef, data, userService, notificationService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.userService = userService;
        this.notificationService = notificationService;
        this.permission = 'admin';
        this.departments = [
            { Maddr: 'Dep 1' },
            { Maddr: 'Dep 2' },
            { Maddr: 'Dep 3' }
        ];
    }
    DialogOverviewExampleDialog2.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialog2.prototype.onClear = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialog2.prototype.onSubmit = function (form) {
        var _this = this;
        this.userService.updateUserProfile(form.value).subscribe(function (res) {
            _this.showSucessMessage = true;
            setTimeout(function () { return _this.showSucessMessage = false; }, 4000);
            _this.notificationService.success('Edit successfully !!!');
        }, function (err) {
            if (err.status === 422) {
                _this.serverErrorMessages = err.error.join('<br/>');
            }
            else {
                _this.notificationService.warn('Edit Fail!!!');
                _this.serverErrorMessages = 'Something went wrong.Please contact admin.';
            }
        });
        this.dialogRef.close();
    };
    DialogOverviewExampleDialog2 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./create.html */ "./src/app/admin/material-component/manage-user/create.html")
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object, _shared_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _shared_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"]])
    ], DialogOverviewExampleDialog2);
    return DialogOverviewExampleDialog2;
}());



/***/ }),

/***/ "./src/app/admin/material-component/material.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/admin/material-component/material.module.ts ***!
  \*************************************************************/
/*! exports provided: MaterialComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialComponentsModule", function() { return MaterialComponentsModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/admin/demo-material-module.ts");
/* harmony import */ var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/table */ "./node_modules/@angular/cdk/esm5/table.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _material_routing__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./material.routing */ "./src/app/admin/material-component/material.routing.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/admin/material-component/profile/profile.component.ts");
/* harmony import */ var _manage_meter_manage_meter_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./manage-meter/manage-meter.component */ "./src/app/admin/material-component/manage-meter/manage-meter.component.ts");
/* harmony import */ var _manage_user_manage_user_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./manage-user/manage-user.component */ "./src/app/admin/material-component/manage-user/manage-user.component.ts");
/* harmony import */ var _electric_bill_electric_bill_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./electric-bill/electric-bill.component */ "./src/app/admin/material-component/electric-bill/electric-bill.component.ts");
/* harmony import */ var _power_cut_power_cut_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./power-cut/power-cut.component */ "./src/app/admin/material-component/power-cut/power-cut.component.ts");
/* harmony import */ var _manage_meter_ad_ad_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./manage-meter/ad/ad.component */ "./src/app/admin/material-component/manage-meter/ad/ad.component.ts");
/* harmony import */ var _system_setting_system_setting_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./system-setting/system-setting.component */ "./src/app/admin/material-component/system-setting/system-setting.component.ts");
/* harmony import */ var _electric_bill_filter_pipe__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./electric-bill/filter.pipe */ "./src/app/admin/material-component/electric-bill/filter.pipe.ts");
/* harmony import */ var _statistic_admin_statistic_admin_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./statistic-admin/statistic-admin.component */ "./src/app/admin/material-component/statistic-admin/statistic-admin.component.ts");
/* harmony import */ var _bill_year_admin_bill_year_admin_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./bill-year-admin/bill-year-admin.component */ "./src/app/admin/material-component/bill-year-admin/bill-year-admin.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var MaterialComponentsModule = /** @class */ (function () {
    function MaterialComponentsModule() {
    }
    MaterialComponentsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_material_routing__WEBPACK_IMPORTED_MODULE_9__["MaterialRoutes"]),
                _demo_material_module__WEBPACK_IMPORTED_MODULE_5__["DemoMaterialModuleAdmin"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__["FlexLayoutModule"],
                _angular_cdk_table__WEBPACK_IMPORTED_MODULE_6__["CdkTableModule"]
            ],
            providers: [],
            entryComponents: [
                _manage_user_manage_user_component__WEBPACK_IMPORTED_MODULE_12__["DialogOverviewExampleDialog2"],
                _manage_meter_manage_meter_component__WEBPACK_IMPORTED_MODULE_11__["DialogOverviewExampleDialogMeter"],
                _electric_bill_electric_bill_component__WEBPACK_IMPORTED_MODULE_13__["ReportData"],
                _statistic_admin_statistic_admin_component__WEBPACK_IMPORTED_MODULE_18__["StatisticReportAdmin"]
            ],
            declarations: [
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_10__["ProfileComponent"],
                _manage_meter_manage_meter_component__WEBPACK_IMPORTED_MODULE_11__["ManageMeterComponent"],
                _manage_user_manage_user_component__WEBPACK_IMPORTED_MODULE_12__["ManageUserComponent"],
                _electric_bill_electric_bill_component__WEBPACK_IMPORTED_MODULE_13__["ElectricBillComponent"],
                _power_cut_power_cut_component__WEBPACK_IMPORTED_MODULE_14__["PowerCutComponent"],
                _manage_meter_ad_ad_component__WEBPACK_IMPORTED_MODULE_15__["AdComponent"],
                _manage_user_manage_user_component__WEBPACK_IMPORTED_MODULE_12__["DialogOverviewExampleDialog2"],
                _manage_meter_manage_meter_component__WEBPACK_IMPORTED_MODULE_11__["DialogOverviewExampleDialogMeter"],
                _system_setting_system_setting_component__WEBPACK_IMPORTED_MODULE_16__["SystemSettingComponent"],
                _electric_bill_electric_bill_component__WEBPACK_IMPORTED_MODULE_13__["ReportData"],
                _electric_bill_filter_pipe__WEBPACK_IMPORTED_MODULE_17__["FilterPipe"],
                _statistic_admin_statistic_admin_component__WEBPACK_IMPORTED_MODULE_18__["StatisticAdminComponent"],
                _statistic_admin_statistic_admin_component__WEBPACK_IMPORTED_MODULE_18__["StatisticReportAdmin"],
                _bill_year_admin_bill_year_admin_component__WEBPACK_IMPORTED_MODULE_19__["BillYearAdminComponent"]
            ]
        })
    ], MaterialComponentsModule);
    return MaterialComponentsModule;
}());



/***/ }),

/***/ "./src/app/admin/material-component/material.routing.ts":
/*!**************************************************************!*\
  !*** ./src/app/admin/material-component/material.routing.ts ***!
  \**************************************************************/
/*! exports provided: MaterialRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialRoutes", function() { return MaterialRoutes; });
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile/profile.component */ "./src/app/admin/material-component/profile/profile.component.ts");
/* harmony import */ var _manage_meter_manage_meter_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manage-meter/manage-meter.component */ "./src/app/admin/material-component/manage-meter/manage-meter.component.ts");
/* harmony import */ var _manage_user_manage_user_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manage-user/manage-user.component */ "./src/app/admin/material-component/manage-user/manage-user.component.ts");
/* harmony import */ var _electric_bill_electric_bill_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./electric-bill/electric-bill.component */ "./src/app/admin/material-component/electric-bill/electric-bill.component.ts");
/* harmony import */ var _power_cut_power_cut_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./power-cut/power-cut.component */ "./src/app/admin/material-component/power-cut/power-cut.component.ts");
/* harmony import */ var _system_setting_system_setting_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./system-setting/system-setting.component */ "./src/app/admin/material-component/system-setting/system-setting.component.ts");
/* harmony import */ var _statistic_admin_statistic_admin_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./statistic-admin/statistic-admin.component */ "./src/app/admin/material-component/statistic-admin/statistic-admin.component.ts");
/* harmony import */ var _bill_year_admin_bill_year_admin_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bill-year-admin/bill-year-admin.component */ "./src/app/admin/material-component/bill-year-admin/bill-year-admin.component.ts");








var MaterialRoutes = [
    {
        path: 'profile',
        component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_0__["ProfileComponent"]
    }, {
        path: 'manageMeterAdmin',
        component: _manage_meter_manage_meter_component__WEBPACK_IMPORTED_MODULE_1__["ManageMeterComponent"]
    }, {
        path: 'manageUserAdmin',
        component: _manage_user_manage_user_component__WEBPACK_IMPORTED_MODULE_2__["ManageUserComponent"]
    }, {
        path: 'electricBillAdmin',
        component: _electric_bill_electric_bill_component__WEBPACK_IMPORTED_MODULE_3__["ElectricBillComponent"]
    }, {
        path: 'powerCutAdmin',
        component: _power_cut_power_cut_component__WEBPACK_IMPORTED_MODULE_4__["PowerCutComponent"]
    }, {
        path: 'SystemSetting',
        component: _system_setting_system_setting_component__WEBPACK_IMPORTED_MODULE_5__["SystemSettingComponent"]
    }, {
        path: 'statisticAdmin',
        component: _statistic_admin_statistic_admin_component__WEBPACK_IMPORTED_MODULE_6__["StatisticAdminComponent"]
    }, {
        path: 'billYearAdmin',
        component: _bill_year_admin_bill_year_admin_component__WEBPACK_IMPORTED_MODULE_7__["BillYearAdminComponent"]
    }
];


/***/ }),

/***/ "./src/app/admin/material-component/power-cut/power-cut.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/admin/material-component/power-cut/power-cut.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-button-toggle-checked {\r\n    background-color: rgba(7, 65, 255, 0.712);\r\n    color: white;\r\n}\r\n\r\n.example-h2 {\r\n    margin: 10px;\r\n  }\r\n\r\n.example-section {\r\n    display: flex;\r\n    align-content: center;\r\n    align-items: center;\r\n    height: 60px;\r\n  }\r\n\r\n.example-margin {\r\n    margin: 10px;\r\n  }"

/***/ }),

/***/ "./src/app/admin/material-component/power-cut/power-cut.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/admin/material-component/power-cut/power-cut.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-tab-group>\n      <mat-tab label=\"การตัดไฟ\">\n        <mat-card-content>\n          <div class=\"search-div\">\n            <mat-form-field class=\"search-form-field\" floatLabel=\"never\">\n              <input matInput [(ngModel)]=\"searchKey\" placeholder=\"ค้นหา\" autocomplete=\"off\" (keyup)=\"applyFilter()\">\n              <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"searchKey\" (click)=\"onSearchClear()\">\n                <mat-icon>close</mat-icon>\n              </button>\n            </mat-form-field><button mat-button matSuffix mat-icon-button (click)=\"ngOnInit()\">\n              <mat-icon>refresh</mat-icon>\n            </button>\n          </div>\n          <div class=\"mat-elevation-z8 size\">\n            <mat-table [dataSource]=\"dataSource\" matSort>\n              <ng-container matColumnDef=\"room\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อห้อง</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.room}}</mat-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"Maddr\" sticky>\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อมิเตอร์ไฟฟ้า (Mac Address)</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.Maddr}}</mat-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"shortCircuit\">\n                <mat-header-cell *matHeaderCellDef mat-sort-header>Status</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">{{element.shortCircuit}}</mat-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"actions\">\n                <mat-header-cell *matHeaderCellDef>การตัดไฟ</mat-header-cell>\n                <mat-cell *matCellDef=\"let element\">\n                  <!-- <mat-button-toggle-group #group=\"matButtonToggleGroup\">\n                    <mat-button-toggle value=\"off\" checked=\"!{{element.shortCircuit}}\" (click)=\"TestB(element.Maddr+'/false')\">\n                      <mat-icon class=\"mat-icon\">power_off</mat-icon>\n                      <span>ตัดไฟ</span>\n                    </mat-button-toggle>\n                    <mat-button-toggle value=\"on\" checked=\"{{element.shortCircuit}}\" (click)=\"TestB(element.Maddr+'/true')\">\n                      <mat-icon>power</mat-icon>\n                      <span class=\"left-icon\">เปิดไฟ</span>\n                    </mat-button-toggle>\n                  </mat-button-toggle-group> -->\n                  <span><strong>ตัดไฟ&nbsp;</strong></span>\n                  <mat-slide-toggle checked=\"{{element.shortCircuit}}\" (click)=\"slideB(element.Maddr,element.shortCircuit)\">\n                    <span>เปิดไฟ</span>\n                  </mat-slide-toggle>\n\n                </mat-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"noData\">\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\n                  No data.\n                </mat-footer-cell>\n              </ng-container>\n              <ng-container matColumnDef=\"loading\">\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\n                  Loading data...\n                </mat-footer-cell>\n              </ng-container>\n              <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n              <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n              <mat-footer-row *matFooterRowDef=\"['noData']\" [ngClass]=\"{'hide':!(dataSource!=null && dataSource.data.length==0)}\"></mat-footer-row>\n              <mat-footer-row *matFooterRowDef=\"['loading']\" [ngClass]=\"{'hide':dataSource!=null}\"></mat-footer-row>\n            </mat-table>\n            <mat-paginator [pageSizeOptions]=\"[10, 20, 50, 100]\" [pageSize]=\"10\" showFirstLastButtons></mat-paginator>\n          </div>\n        </mat-card-content>\n      </mat-tab>\n\n    </mat-tab-group>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/admin/material-component/power-cut/power-cut.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/admin/material-component/power-cut/power-cut.component.ts ***!
  \***************************************************************************/
/*! exports provided: PowerCutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PowerCutComponent", function() { return PowerCutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_meter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/meter.service */ "./src/app/shared/meter.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/notification.service */ "./src/app/shared/notification.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PowerCutComponent = /** @class */ (function () {
    function PowerCutComponent(meterService, notificationService) {
        this.meterService = meterService;
        this.notificationService = notificationService;
        this.color = 'accent';
        this.checked = true;
        this.disabled = false;
        this.displayedColumns = ['room', 'Maddr', 'actions']; //, 'shortCircuit'
    }
    PowerCutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.meterService.showMeterRoom().subscribe(function (data) {
            if (!data) {
                return;
            }
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](data);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
    };
    PowerCutComponent.prototype.slideB = function (mac, status) {
        if (status == 'false') {
            this.TestB(mac + "/" + "true");
        }
        else if (status == 'true') {
            this.TestB(mac + "/" + "false");
        }
    };
    PowerCutComponent.prototype.onSearchClear = function () {
        this.searchKey = "";
        this.applyFilter();
    };
    PowerCutComponent.prototype.applyFilter = function () {
        this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
    };
    PowerCutComponent.prototype.TestB = function (test) {
        var _this = this;
        this.meterService.powerCut(test).subscribe(function (res) {
            _this.showSucessMessage = true;
            setTimeout(function () { return _this.showSucessMessage = false; }, 4000);
            _this.notificationService.success('Edit successfully !!!');
            _this.ngOnInit();
        }, function (err) {
            if (err.status === 422) {
                _this.serverErrorMessages = err.error.join('<br/>');
            }
            else {
                _this.notificationService.warn('Edit Fail!!!');
                _this.serverErrorMessages = 'Something went wrong.Please contact admin.';
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], PowerCutComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], PowerCutComponent.prototype, "paginator", void 0);
    PowerCutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-power-cut',
            template: __webpack_require__(/*! ./power-cut.component.html */ "./src/app/admin/material-component/power-cut/power-cut.component.html"),
            styles: [__webpack_require__(/*! ./power-cut.component.css */ "./src/app/admin/material-component/power-cut/power-cut.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_meter_service__WEBPACK_IMPORTED_MODULE_1__["MeterService"],
            _shared_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"]])
    ], PowerCutComponent);
    return PowerCutComponent;
}());



/***/ }),

/***/ "./src/app/admin/material-component/profile/profile.component.css":
/*!************************************************************************!*\
  !*** ./src/app/admin/material-component/profile/profile.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".panel {\r\n    background-color: #FFFFFF;\r\n    border: 1px solid rgba(0, 0, 0, 0);\r\n    border-radius: 4px 4px 4px 4px;\r\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\r\n    margin-bottom: 20px;\r\n}   \r\n\r\n.panel-primary {\r\n    border-color: #428BCA;\r\n}   \r\n\r\n.panel-primary > .panel-heading {\r\n    background-color: #428BCA;\r\n    border-color: #428BCA;\r\n    color: #FFFFFF;\r\n}   \r\n\r\n.panel-heading {\r\n    border-bottom: 1px solid rgba(0, 0, 0, 0);\r\n    border-top-left-radius: 3px;\r\n    border-top-right-radius: 3px;\r\n    padding: 10px 15px;\r\n}   \r\n\r\n.panel-title {\r\n    font-size: 16px;\r\n    margin-bottom: 0;\r\n    margin-top: 0;\r\n}   \r\n\r\n.panel-body:before, .panel-body:after {\r\n    content: \" \";\r\n    display: table;\r\n}   \r\n\r\n.panel-body:before, .panel-body:after {\r\n    content: \" \";\r\n    display: table;\r\n}   \r\n\r\n.panel-body:after {\r\n    clear: both;\r\n}   \r\n\r\n.panel-body {\r\n    padding: 15px;\r\n}   \r\n\r\n.panel-footer {\r\n    background-color: #F5F5F5;\r\n    border-bottom-left-radius: 3px;\r\n    border-bottom-right-radius: 3px;\r\n    border-top: 1px solid #DDDDDD;\r\n    padding: 10px 15px;\r\n}   \r\n\r\n.user-row {\r\n    margin-bottom: 14px;\r\n}   \r\n\r\n.user-row:last-child {\r\n    margin-bottom: 0;\r\n}   \r\n\r\n.dropdown-user {\r\n    margin: 13px 0;\r\n    padding: 5px;\r\n    height: 100%;\r\n}   \r\n\r\n.dropdown-user:hover {\r\n    cursor: pointer;\r\n}   \r\n\r\n.table-user-information > tbody > tr {\r\n    border-top: 1px solid rgb(221, 221, 221);\r\n}   \r\n\r\n.table-user-information > tbody > tr:first-child {\r\n    border-top: 0;\r\n}   \r\n\r\n.table-user-information > tbody > tr > td {\r\n    border-top: 0;\r\n}\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/admin/material-component/profile/profile.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/admin/material-component/profile/profile.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"mat-elevation-z8 size\">\n\n  <mat-card *ngIf=\"userDetails\">\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n    <div class=\"row-fluid user-infos cyruxx\">\n      <div class=\"span10 offset1\">\n        <div class=\"panel panel-primary\">\n          <div class=\"panel-heading\">\n            <h3 class=\"panel-title\">ข้อมูลผู้ใช้งาน</h3>\n          </div>\n          <div class=\"panel-body container\">\n            <br>\n            <table class=\"table table-hover\">\n              <tbody>\n                <tr>\n\n                  <td class=\"with-icon\">\n                    <mat-icon class=\"colorOne-icon\">assignment_ind</mat-icon><strong>ชื่อผู้ใช้งาน :</strong>\n                  </td>\n                  <td>{{userDetails.username}}</td>\n                </tr>\n                <tr>\n                  <td class=\"with-icon\">\n                    <mat-icon class=\"colorOne-icon\">assignment</mat-icon><strong>ชื่อ :</strong>\n                  </td>\n                  <td>{{userDetails.firstname.substring(0,\n                    1).toUpperCase()}}{{userDetails.firstname.substring(1,userDetails.firstname. length)}}</td>\n                </tr>\n                <tr>\n\n                  <td class=\"with-icon\">\n                    <mat-icon class=\"colorOne-icon\">chrome_reader_mode</mat-icon><strong>นามสกุล:</strong>\n                  </td>\n                  <td>{{userDetails.lastname.substring(0,\n                    1).toUpperCase()}}{{userDetails.lastname.substring(1,userDetails.lastname. length)}}</td>\n                </tr>\n\n                <tr>\n\n                  <td class=\"with-icon\">\n                    <mat-icon class=\"colorOne-icon\">https</mat-icon><strong>ระดับสิทธิผู้ใช้งาน :</strong>\n                  </td>\n                  <td>Administrator</td>\n                </tr>\n                <tr>\n\n                  <td class=\"with-icon\">\n                    <mat-icon class=\"colorOne-icon\">email</mat-icon><strong>อีเมล :</strong>\n                  </td>\n                  <td>{{userDetails.email}}</td>\n                </tr>\n                <tr>\n\n                  <td class=\"with-icon\">\n                    <mat-icon class=\"colorOne-icon\">home</mat-icon><strong>ชื่อห้อง :</strong>\n                  </td>\n                  <td>{{userDetails.room}}</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n    <br>\n    <br>\n    <br>\n    <br>\n    <br>\n  </mat-card>\n</div>"

/***/ }),

/***/ "./src/app/admin/material-component/profile/profile.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/admin/material-component/profile/profile.component.ts ***!
  \***********************************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/user.service */ "./src/app/shared/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(userService) {
        this.userService = userService;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserProfile().subscribe(function (res) {
            _this.userDetails = res['user'];
        }, function (err) {
            console.log(err);
        });
    };
    ProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/admin/material-component/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/admin/material-component/profile/profile.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/admin/material-component/statistic-admin/st.html":
/*!******************************************************************!*\
  !*** ./src/app/admin/material-component/statistic-admin/st.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"search-div\">\r\n    <mat-form-field class=\"search-form-field\" floatLabel=\"never\">\r\n        <input matInput [(ngModel)]=\"searchKeyReport\" placeholder=\"ค้นหา\" autocomplete=\"off\" (keyup)=\"applyFilterReport()\">\r\n        <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"searchKeyReport\" (click)=\"onSearchClearReport()\">\r\n            <mat-icon>close</mat-icon>\r\n        </button>\r\n    </mat-form-field>\r\n\r\n</div>\r\n<mat-dialog-content class=\"mat-typography\">\r\n    <div class=\"mat-elevation-z8 size\">\r\n        <mat-table [dataSource]=\"dataSource\" matSort>\r\n            <ng-container matColumnDef=\"ActiveEnergy\">\r\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ค่าพลังงานไฟฟ้า</mat-header-cell>\r\n                <mat-cell *matCellDef=\"let element\">{{element.ActiveEnergy}}</mat-cell>\r\n            </ng-container>\r\n            <!-- <ng-container matColumnDef=\"Frequency\" sticky>\r\n                <mat-header-cell *matHeaderCellDef mat-sort-header>ความถี่</mat-header-cell>\r\n                <mat-cell *matCellDef=\"let element\">{{element.Frequency}}</mat-cell>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"LineCurrent\">\r\n                <mat-header-cell *matHeaderCellDef>กระแสไฟฟ้าที่สาย</mat-header-cell>\r\n                <mat-cell *matCellDef=\"let element\">\r\n                    {{element.LineCurrent}}\r\n                </mat-cell>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"LineVoltage\">\r\n                <mat-header-cell *matHeaderCellDef>แรงดันระหว่างสาย</mat-header-cell>\r\n                <mat-cell *matCellDef=\"let element\">\r\n                    {{element.LineVoltage}}\r\n                </mat-cell>\r\n            </ng-container> -->\r\n            <ng-container matColumnDef=\"date\">\r\n                <mat-header-cell *matHeaderCellDef>เวลาที่บันทึก</mat-header-cell>\r\n                <mat-cell *matCellDef=\"let element\">\r\n                    {{element.date}}\r\n                </mat-cell>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"noData\">\r\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\r\n                    ไม่มีข้อมูล\r\n                </mat-footer-cell>\r\n            </ng-container>\r\n            <ng-container matColumnDef=\"loading\">\r\n                <mat-footer-cell *matFooterCellDef colspan=\"6\">\r\n                    กำลังดาวน์โหลดข้อมูล\r\n                </mat-footer-cell>\r\n            </ng-container>\r\n            <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n            <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n            <mat-footer-row *matFooterRowDef=\"['noData']\" [ngClass]=\"{'hide':!(dataSource!=null && dataSource.data.length==0)}\"></mat-footer-row>\r\n            <mat-footer-row *matFooterRowDef=\"['loading']\" [ngClass]=\"{'hide':dataSource!=null}\"></mat-footer-row>\r\n        </mat-table>\r\n        <mat-paginator [pageSizeOptions]=\"[10, 20, 50, 100]\" [pageSize]=\"10\" showFirstLastButtons></mat-paginator>\r\n    </div>\r\n    <br>\r\n</mat-dialog-content>\r\n<div class=\"wrapper-center button-row\">\r\n    <button mat-raised-button color=\"primary\" (click)=\"exportAsXLSX()\">\r\n        <mat-icon>cloud_download</mat-icon> ดาวโหลด (.xlsx)\r\n    </button>\r\n    <button mat-raised-button color=\"warn\" (click)=\"onClear()\">\r\n        <mat-icon>clear</mat-icon>ปิด\r\n    </button>\r\n</div>"

/***/ }),

/***/ "./src/app/admin/material-component/statistic-admin/statistic-admin.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/admin/material-component/statistic-admin/statistic-admin.component.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/admin/material-component/statistic-admin/statistic-admin.component.html":
/*!*****************************************************************************************!*\
  !*** ./src/app/admin/material-component/statistic-admin/statistic-admin.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n      <mat-tab-group>\n        <mat-tab label=\"รายงานการใช้ไฟฟ้า\">\n          <mat-card-content>\n              <mat-form-field>\n                  <mat-select [(value)]=\"Monthselected\">\n                    <mat-option value=\"January\">มกราคม</mat-option>\n                    <mat-option value=\"February\">กุมภาพันธ์</mat-option>\n                    <mat-option value=\"March\">มีนาคม</mat-option>\n                    <mat-option value=\"April\">เมษายน</mat-option>\n                    <mat-option value=\"May\">พฤษภาคม</mat-option>\n                    <mat-option value=\"June\">มิถุนายน</mat-option>\n                    <mat-option value=\"July\">กรกฎาคม</mat-option>\n                    <mat-option value=\"August\">สิงหาคม</mat-option>\n                    <mat-option value=\"September\">กันยายน</mat-option>\n                    <mat-option value=\"October\">ตุลาคม</mat-option>\n                    <mat-option value=\"November\">พฤศจิกายน</mat-option>\n                    <mat-option value=\"December\">ธันวาคม</mat-option>\n                  </mat-select>\n                </mat-form-field>\n                <mat-form-field>\n                    <mat-select [(value)]=\"Yearselected\">\n                      <mat-option value=\"2018\">2561</mat-option>\n                    </mat-select>\n                  </mat-form-field>\n  \n            <div class=\"search-div\">\n              <mat-form-field class=\"search-form-field\" floatLabel=\"never\">\n                <input matInput [(ngModel)]=\"searchKey\" placeholder=\"ค้นหาห้อง\" autocomplete=\"off\" (keyup)=\"applyFilter()\">\n                <button mat-button matSuffix mat-icon-button aria-label=\"Clear\" *ngIf=\"searchKey\" (click)=\"onSearchClear()\">\n                  <mat-icon>close</mat-icon>\n                </button>\n              </mat-form-field>\n  \n            </div>\n            <div class=\"mat-elevation-z8 size\">\n              <mat-table [dataSource]=\"dataSource\" matSort>\n                <ng-container matColumnDef=\"room\" sticky>\n                  <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อห้อง</mat-header-cell>\n                  <mat-cell *matCellDef=\"let element\">{{element.room}}</mat-cell>\n                </ng-container>\n                <ng-container matColumnDef=\"username\" >\n                  <mat-header-cell *matHeaderCellDef mat-sort-header>ชื่อมิเตอร์ (Mac Address)</mat-header-cell>\n                  <mat-cell *matCellDef=\"let element\">{{element.Maddr}}</mat-cell>\n                </ng-container>\n                <ng-container matColumnDef=\"actions\">\n                  <mat-header-cell *matHeaderCellDef>ดูสถิติการใช้ไฟฟ้า</mat-header-cell>\n                  <mat-cell *matCellDef=\"let element\">\n                    <button mat-raised-button color=\"accent\" (click)=\"openDialog(element.room)\">\n                      <mat-icon>search</mat-icon> เลือก\n                    </button>\n                  </mat-cell>\n                </ng-container>\n                <ng-container matColumnDef=\"noData\">\n                  <mat-footer-cell *matFooterCellDef colspan=\"6\">\n                    No data.\n                  </mat-footer-cell>\n                </ng-container>\n                <ng-container matColumnDef=\"loading\">\n                  <mat-footer-cell *matFooterCellDef colspan=\"6\">\n                    Loading data...\n                  </mat-footer-cell>\n                </ng-container>\n                <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n                <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n                <mat-footer-row *matFooterRowDef=\"['noData']\" [ngClass]=\"{'hide':!(dataSource!=null && dataSource.data.length==0)}\"></mat-footer-row>\n                <mat-footer-row *matFooterRowDef=\"['loading']\" [ngClass]=\"{'hide':dataSource!=null}\"></mat-footer-row>\n              </mat-table>\n              <mat-paginator [pageSizeOptions]=\"[10, 20, 50, 100]\" [pageSize]=\"10\" showFirstLastButtons></mat-paginator>\n            </div>\n          </mat-card-content>\n        </mat-tab>\n  \n      </mat-tab-group>\n    </mat-card-content>\n  </mat-card>"

/***/ }),

/***/ "./src/app/admin/material-component/statistic-admin/statistic-admin.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/admin/material-component/statistic-admin/statistic-admin.component.ts ***!
  \***************************************************************************************/
/*! exports provided: StatisticAdminComponent, StatisticReportAdmin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticAdminComponent", function() { return StatisticAdminComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticReportAdmin", function() { return StatisticReportAdmin; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_meter_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/meter.service */ "./src/app/shared/meter.service.ts");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/user.service */ "./src/app/shared/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var StatisticAdminComponent = /** @class */ (function () {
    function StatisticAdminComponent(meterService, dialogMeter) {
        this.meterService = meterService;
        this.dialogMeter = dialogMeter;
        this.Yearselected = '2018';
        this.displayedColumns = ['room', 'username', 'actions']; //, 'shortCircuit'
    }
    StatisticAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.meterService.showAllMeter().subscribe(function (data) {
            if (!data) {
                return;
            }
            console.log(data);
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](data);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
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
        var time = new Date().getMonth();
        this.Monthselected = month[time];
    };
    StatisticAdminComponent.prototype.onSearchClear = function () {
        this.searchKey = "";
        this.applyFilter();
    };
    StatisticAdminComponent.prototype.applyFilter = function () {
        this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase();
    };
    StatisticAdminComponent.prototype.openDialog = function (element) {
        var _this = this;
        var dialogRef = this.dialogMeter.open(StatisticReportAdmin, {
            width: '80%',
            data: {
                month: this.Monthselected,
                year: this.Yearselected,
                room: element
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.ngOnInit();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], StatisticAdminComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], StatisticAdminComponent.prototype, "paginator", void 0);
    StatisticAdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-statistic-admin',
            template: __webpack_require__(/*! ./statistic-admin.component.html */ "./src/app/admin/material-component/statistic-admin/statistic-admin.component.html"),
            styles: [__webpack_require__(/*! ./statistic-admin.component.css */ "./src/app/admin/material-component/statistic-admin/statistic-admin.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_meter_service__WEBPACK_IMPORTED_MODULE_2__["MeterService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], StatisticAdminComponent);
    return StatisticAdminComponent;
}());

var StatisticReportAdmin = /** @class */ (function () {
    function StatisticReportAdmin(dialogRef, data, meterService, userService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.meterService = meterService;
        this.userService = userService;
        this.Data = [{}];
        this.DataTH = [{}];
        this.displayedColumns = ['date', 'ActiveEnergy'];
    }
    //, 'Frequency', 'LineCurrent', 'LineVoltage'
    StatisticReportAdmin.prototype.ngOnInit = function () {
        var _this = this;
        this.meterService.showStatistic(this.data.month, this.data.year, this.data.room).subscribe(function (data) {
            if (!data) {
                return;
            }
            _this.dataSource = data;
            _this.Data = data;
            for (var i = 0; i < data.length; i++) {
                _this.conTime(i);
            }
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](data);
            _this.dataSource.sort = _this.sort;
            _this.dataSource.paginator = _this.paginator;
        });
        this.meterService.showStatisticTH(this.data.month, this.data.year, this.data.room).subscribe(function (data) {
            if (!data) {
                return;
            }
            _this.DataTH = data['สถิติการใช้'];
            for (var i = 0; i < _this.DataTH.length; i++) {
                _this.conTimeLoad(i);
            }
        });
    };
    StatisticReportAdmin.prototype.conTimeLoad = function (index) {
        var time = this.DataTH[index].เวลาที่บันทึก.split(",", 5);
        var day = this.conDayTH(time[0]);
        var daynum = time[1];
        var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
        var year = this.conYearTh(time[3].split(" ", 2)[1]);
        var times = time[4];
        var data = times + daynum + " " + Month + " " + year;
        this.DataTH[index].เวลาที่บันทึก = data;
    };
    StatisticReportAdmin.prototype.conTime = function (index) {
        var time = this.Data[index].date.split(",", 5);
        var day = this.conDayTH(time[0]);
        var daynum = time[1];
        var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
        var year = this.conYearTh(time[3].split(" ", 2)[1]);
        var times = time[4];
        var data = times + daynum + " " + Month + " " + year;
        this.Data[index].date = data;
    };
    StatisticReportAdmin.prototype.conYearTh = function (selectedyear) {
        return parseInt(selectedyear) + 543;
    };
    StatisticReportAdmin.prototype.conMonthTh = function (selectedMonth) {
        var selectedMonthTH;
        if (selectedMonth == 'January') {
            selectedMonthTH = 'มกราคม';
        }
        else if (selectedMonth == 'February') {
            selectedMonthTH = 'กุมภาพันธ์';
        }
        else if (selectedMonth == 'March') {
            selectedMonthTH = 'มีนาคม';
        }
        else if (selectedMonth == 'April') {
            selectedMonthTH = 'เมษายน';
        }
        else if (selectedMonth == 'May') {
            selectedMonthTH = 'พฤษภาคม';
        }
        else if (selectedMonth == 'June') {
            selectedMonthTH = 'มิถุนายน';
        }
        else if (selectedMonth == 'July') {
            selectedMonthTH = 'กรกฎาคม';
        }
        else if (selectedMonth == 'August') {
            selectedMonthTH = 'สิงหาคม';
        }
        else if (selectedMonth == 'September') {
            selectedMonthTH = 'กันยายน';
        }
        else if (selectedMonth == 'October') {
            selectedMonthTH = 'ตุลาคม';
        }
        else if (selectedMonth == 'November') {
            selectedMonthTH = 'พฤศจิกายน';
        }
        else if (selectedMonth == 'December') {
            selectedMonthTH = 'ธันวาคม';
        }
        return selectedMonthTH;
    };
    StatisticReportAdmin.prototype.conDayTH = function (data) {
        var dayTH;
        if (data == 'Sunday') {
            dayTH = 'อาทิตย์';
        }
        else if (data == 'Monday') {
            dayTH = 'จันทร์';
        }
        else if (data == 'Tuesday') {
            dayTH = 'อังคาร';
        }
        else if (data == 'Wednesday') {
            dayTH = 'พุธ';
        }
        else if (data == 'Thursday') {
            dayTH = 'พฤหัสบดี';
        }
        else if (data == 'Friday') {
            dayTH = 'ศุกร์';
        }
        else if (data == 'Saturday') {
            dayTH = 'เสาร์';
        }
        else {
            dayTH = 'ไม่มีการบันทึกค่า';
        }
        return dayTH;
    };
    StatisticReportAdmin.prototype.exportAsXLSX = function () {
        var monthTH = this.conMonthTh(this.data.month);
        var yearTH = this.conYearTh(this.data.year);
        this.userService.exportAsExcelFile(this.DataTH, "สถิติการใช้ไฟห้อง" + this.data.room + "_ประจำเดือน" + monthTH + yearTH);
    };
    StatisticReportAdmin.prototype.onSearchClearReport = function () {
        this.searchKeyReport = "";
        this.applyFilterReport();
    };
    StatisticReportAdmin.prototype.applyFilterReport = function () {
        this.dataSource.filter = this.searchKeyReport.trim().toLocaleLowerCase();
    };
    StatisticReportAdmin.prototype.onClear = function () {
        this.dialogRef.close();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], StatisticReportAdmin.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], StatisticReportAdmin.prototype, "paginator", void 0);
    StatisticReportAdmin = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-ReportData',
            template: __webpack_require__(/*! ./st.html */ "./src/app/admin/material-component/statistic-admin/st.html")
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _shared_meter_service__WEBPACK_IMPORTED_MODULE_2__["MeterService"],
            _shared_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], StatisticReportAdmin);
    return StatisticReportAdmin;
}());



/***/ }),

/***/ "./src/app/admin/material-component/system-setting/system-setting.component.css":
/*!**************************************************************************************!*\
  !*** ./src/app/admin/material-component/system-setting/system-setting.component.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  .mat-button-toggle-checked {\r\n    background-color:rgba(7, 65, 255, 0.712);\r\n    color: white;\r\n  }\r\n\r\n\r\n\r\n  "

/***/ }),

/***/ "./src/app/admin/material-component/system-setting/system-setting.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/admin/material-component/system-setting/system-setting.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\">\n  <div fxFlex.gt-sm=\"50%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>เวลาที่มิเตอร์ไฟฟ้าส่งค่าไฟฟ้าให้ Server (นาที)</mat-card-title>\n        <mat-card-subtitle></mat-card-subtitle>\n        <mat-button-toggle-group appearance=\"legacy\" name=\"fontStyle\" aria-label=\"Font Style\">\n          <mat-button-toggle value=\"1\" (click)=\"time(1)\"  checked={{bt1}}>1</mat-button-toggle>\n          <mat-button-toggle value=\"5\" (click)=\"time(5)\" checked={{bt5}}>5</mat-button-toggle>\n          <mat-button-toggle value=\"10\" (click)=\"time(10)\" checked={{bt10}}>10</mat-button-toggle>\n          <mat-button-toggle value=\"15\" (click)=\"time(15)\" checked={{bt15}}>15</mat-button-toggle>\n          <mat-button-toggle value=\"30\" (click)=\"time(30)\" checked={{bt30}}>30</mat-button-toggle>\n          <mat-button-toggle value=\"45\" (click)=\"time(45)\" checked={{bt45}}>45</mat-button-toggle>\n          <mat-button-toggle value=\"60\" (click)=\"time(60)\" checked={{bt60}}>60</mat-button-toggle>\n        </mat-button-toggle-group>\n        <h5>\n          <br>\n          เวลาที่เลือก : <strong>{{userDetails}} </strong> นาที\n        </h5>\n      </mat-card-content>\n    </mat-card>\n  </div>\n  <div fxFlex.gt-sm=\"50%\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>ค่าไฟต่อหน่วย (บาท)</mat-card-title>\n        <mat-card-subtitle></mat-card-subtitle>\n        <mat-button-toggle-group appearance=\"legacy\" name=\"fontStyle\" aria-label=\"Font Style\">\n          <mat-button-toggle value=\"4\" (click)=\"bath(4)\"  checked={{bat1}}>4</mat-button-toggle>\n          <mat-button-toggle value=\"5\" (click)=\"bath(5)\" checked={{bat5}}>5</mat-button-toggle>\n          <mat-button-toggle value=\"6\" (click)=\"bath(6)\" checked={{bat10}}>6</mat-button-toggle>\n          <mat-button-toggle value=\"7\" (click)=\"bath(7)\" checked={{bat15}}>7</mat-button-toggle>\n          <mat-button-toggle value=\"8\" (click)=\"bath(8)\" checked={{bat30}}>8</mat-button-toggle>\n          <mat-button-toggle value=\"9\" (click)=\"bath(9)\" checked={{bat45}}>9</mat-button-toggle>\n          <mat-button-toggle value=\"10\" (click)=\"bath(10)\" checked={{bat60}}>10</mat-button-toggle>\n        </mat-button-toggle-group>\n        <h5>\n          <br>\n          ค่าเลือก : <strong>{{userDetailsBath}} </strong> บาท\n        </h5>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/admin/material-component/system-setting/system-setting.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/admin/material-component/system-setting/system-setting.component.ts ***!
  \*************************************************************************************/
/*! exports provided: SystemSettingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemSettingComponent", function() { return SystemSettingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_meter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/meter.service */ "./src/app/shared/meter.service.ts");
/* harmony import */ var _shared_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/notification.service */ "./src/app/shared/notification.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SystemSettingComponent = /** @class */ (function () {
    function SystemSettingComponent(meterService, notificationService, http) {
        this.meterService = meterService;
        this.notificationService = notificationService;
        this.http = http;
        this.bt1 = false;
        this.bt5 = false;
        this.bt10 = false;
        this.bt15 = false;
        this.bt30 = false;
        this.bt45 = false;
        this.bt60 = false;
        this.bat1 = false;
        this.bat5 = false;
        this.bat10 = false;
        this.bat15 = false;
        this.bat30 = false;
        this.bat45 = false;
        this.bat60 = false;
    }
    SystemSettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.meterService.showTimeDelay().subscribe(function (res) {
            _this.userDetails = res['timeDelay'];
            _this.btActive(_this.userDetails);
        }, function (err) {
            console.log(err);
        });
        this.meterService.showBathPerNum().subscribe(function (res) {
            _this.userDetailsBath = res['bathPerNum'];
            console.log(_this.userDetailsBath);
            _this.btActiveBath(_this.userDetailsBath);
        }, function (err) {
            console.log(err);
        });
    };
    SystemSettingComponent.prototype.btActive = function (state) {
        this.bt1 = false;
        this.bt5 = false;
        this.bt10 = false;
        this.bt15 = false;
        this.bt30 = false;
        this.bt45 = false;
        this.bt60 = false;
        if (state == 1) {
            this.bt1 = true;
        }
        else if (state == 5) {
            this.bt5 = true;
        }
        else if (state == 10) {
            this.bt10 = true;
        }
        else if (state == 15) {
            this.bt15 = true;
        }
        else if (state == 30) {
            this.bt30 = true;
        }
        else if (state == 45) {
            this.bt45 = true;
        }
        else if (state == 60) {
            this.bt60 = true;
        }
    };
    SystemSettingComponent.prototype.time = function (time) {
        var _this = this;
        this.meterService.updateSystem(time).subscribe(function (res) {
            _this.showSucessMessage = true;
            setTimeout(function () { return _this.showSucessMessage = false; }, 4000);
            _this.notificationService.success('Edit successfully !!!');
            _this.ngOnInit();
        }, function (err) {
            if (err.status === 422) {
                _this.serverErrorMessages = err.error.join('<br/>');
            }
            else {
                _this.notificationService.warn('Edit Fail!!!');
                _this.serverErrorMessages = 'Something went wrong.Please contact admin.';
            }
        });
    };
    SystemSettingComponent.prototype.btActiveBath = function (state) {
        this.bat1 = false;
        this.bat5 = false;
        this.bat10 = false;
        this.bat15 = false;
        this.bat30 = false;
        this.bat45 = false;
        this.bat60 = false;
        if (state == 4) {
            this.bat1 = true;
        }
        else if (state == 5) {
            this.bat5 = true;
        }
        else if (state == 6) {
            this.bat10 = true;
        }
        else if (state == 7) {
            this.bat15 = true;
        }
        else if (state == 8) {
            this.bat30 = true;
        }
        else if (state == 9) {
            this.bat45 = true;
        }
        else if (state == 10) {
            this.bat60 = true;
        }
    };
    SystemSettingComponent.prototype.bath = function (time) {
        var _this = this;
        this.meterService.updateBath(time).subscribe(function (res) {
            _this.showSucessMessage = true;
            setTimeout(function () { return _this.showSucessMessage = false; }, 4000);
            _this.notificationService.success('Edit successfully !!!');
            _this.ngOnInit();
        }, function (err) {
            if (err.status === 422) {
                _this.serverErrorMessages = err.error.join('<br/>');
            }
            else {
                _this.notificationService.warn('Edit Fail!!!');
                _this.serverErrorMessages = 'Something went wrong.Please contact admin.';
            }
        });
    };
    SystemSettingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-system-setting',
            template: __webpack_require__(/*! ./system-setting.component.html */ "./src/app/admin/material-component/system-setting/system-setting.component.html"),
            styles: [__webpack_require__(/*! ./system-setting.component.css */ "./src/app/admin/material-component/system-setting/system-setting.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_meter_service__WEBPACK_IMPORTED_MODULE_1__["MeterService"],
            _shared_notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], SystemSettingComponent);
    return SystemSettingComponent;
}());



/***/ }),

/***/ "./src/app/shared/notification.service.ts":
/*!************************************************!*\
  !*** ./src/app/shared/notification.service.ts ***!
  \************************************************/
/*! exports provided: NotificationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationService", function() { return NotificationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationService = /** @class */ (function () {
    function NotificationService(snackBar) {
        this.snackBar = snackBar;
        this.config = {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
        };
    }
    NotificationService.prototype.success = function (msg) {
        this.config['panelClass'] = ['notification', 'success'];
        this.snackBar.open(msg, '', this.config);
    };
    NotificationService.prototype.warn = function (msg) {
        this.config['panelClass'] = ['notification', 'warn'];
        this.snackBar.open(msg, '', this.config);
    };
    NotificationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], NotificationService);
    return NotificationService;
}());



/***/ })

}]);
//# sourceMappingURL=admin-material-component-material-module.js.map