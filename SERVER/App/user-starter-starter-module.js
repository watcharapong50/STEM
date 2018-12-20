(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["user-starter-starter-module"],{

/***/ "./src/app/user/starter/starter.component.html":
/*!*****************************************************!*\
  !*** ./src/app/user/starter/starter.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"container\"></div>\r\n<div class=\"row\">\r\n    <div class=\"col-lg-4\">\r\n        <div class=\"col-sm-4\"></div>\r\n        <mat-card>\r\n            <mat-card-content *ngIf=\"userDetails\">\r\n                <h4>ชื่อผู้ใช้งาน: {{userDetails.username}}<br>ชื่อ: {{userDetails.firstname.substring(0,\r\n                    1).toUpperCase()}}{{userDetails.firstname.substring(1,userDetails.firstname. length)}}\r\n                    {{userDetails.lastname.substring(0,\r\n                    1).toUpperCase()}}{{userDetails.lastname.substring(1,userDetails.lastname. length)}}</h4>\r\n            </mat-card-content>\r\n        </mat-card>\r\n    </div>\r\n    <div class=\"col-lg-4\">\r\n        <mat-card>\r\n            <mat-card-content>\r\n                <h4>ชื่อห้อง: {{roomName}}<br>ชื่อมิเตอร์ไฟฟ้า: {{Maddr}}</h4>\r\n            </mat-card-content>\r\n        </mat-card>\r\n    </div>\r\n    <div class=\"col-lg-4\">\r\n        <mat-card>\r\n            <mat-card-content>\r\n                <h4>หน่วยไฟที่ใช้: {{startFullTime}} - {{lastFullTime}} <br>จำนวนเงินที่ต้องจ่าย: {{(lastFullTime-startFullTime)*userDetailsBath |number:'1.0-0'}} บาท</h4>\r\n            </mat-card-content>\r\n        </mat-card>\r\n    </div>\r\n    <div class=\"col-lg-6\">\r\n        <div fxLayout=\"row\" fxLayoutWrap=\"wrap\">\r\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\r\n                <mat-card>\r\n                    <mat-card-content>\r\n                        <div fxLayout=\"row\" fxLayoutWrap=\"wrap\">\r\n                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" *ngIf=\"Maddr userDetails \">\r\n                            </div>\r\n                        </div>\r\n                        <canvas id=\"ActiveEnergy\" width=\"800\" height=\"450\"></canvas>\r\n                    </mat-card-content>\r\n                </mat-card>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-lg-6\">\r\n        <div fxLayout=\"row\" fxLayoutWrap=\"wrap\">\r\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\r\n                <mat-card>\r\n                    <mat-card-content>\r\n                        <div fxLayout=\"row\" fxLayoutWrap=\"wrap\">\r\n                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" *ngIf=\"Maddr userDetails \">\r\n                            </div>\r\n                        </div>\r\n                        <canvas id=\"LineCurrent\" width=\"800\" height=\"450\"></canvas>\r\n                    </mat-card-content>\r\n                </mat-card>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-lg-6\">\r\n        <div fxLayout=\"row\" fxLayoutWrap=\"wrap\">\r\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\r\n                <mat-card>\r\n                    <mat-card-content>\r\n                        <div fxLayout=\"row\" fxLayoutWrap=\"wrap\">\r\n                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" *ngIf=\"Maddr userDetails \">\r\n                            </div>\r\n                        </div>\r\n                        <canvas id=\"Frequency\" width=\"800\" height=\"450\"></canvas>\r\n                    </mat-card-content>\r\n                </mat-card>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-lg-6\">\r\n        <div fxLayout=\"row\" fxLayoutWrap=\"wrap\">\r\n            <div fxFlex.gt-sm=\"100\" fxFlex.gt-xs=\"100\" fxFlex=\"100\">\r\n                <mat-card>\r\n                    <mat-card-content>\r\n                        <div fxLayout=\"row\" fxLayoutWrap=\"wrap\">\r\n                            <div fxFlex.gt-sm=\"50\" fxFlex.gt-xs=\"50\" *ngIf=\"Maddr userDetails \">\r\n                            </div>\r\n                        </div>\r\n                        <canvas id=\"LineVoltage\" width=\"800\" height=\"450\"></canvas>\r\n                    </mat-card-content>\r\n                </mat-card>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/user/starter/starter.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/user/starter/starter.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/user/starter/starter.component.ts":
/*!***************************************************!*\
  !*** ./src/app/user/starter/starter.component.ts ***!
  \***************************************************/
/*! exports provided: StarterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StarterComponent", function() { return StarterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/user.service */ "./src/app/shared/user.service.ts");
/* harmony import */ var _shared_meter_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/meter.service */ "./src/app/shared/meter.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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





var StarterComponent = /** @class */ (function () {
    function StarterComponent(userService, router, meterService) {
        this.userService = userService;
        this.router = router;
        this.meterService = meterService;
        this.LineChart = [];
        this.Maddr = 'none';
        this.lastFullTime = 0;
        this.startFullTime = 0;
    }
    // LineVoltage
    // Frequency
    // ActiveEnergy
    // LineCurrent
    StarterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.meterService.showBathPerNum().subscribe(function (res) {
            _this.userDetailsBath = res['bathPerNum'];
            console.log(_this.userDetailsBath);
        }, function (err) {
            console.log(err);
        });
        this.userService.getUserProfile().subscribe(function (res) {
            _this.roomName = res['user'].room;
            _this.userDetails = res['user'];
            _this.getmeter(_this.roomName);
        }, function (err) {
            console.log(err);
        });
        this.LineVoltage();
        this.ActiveEnergy();
        this.Frequency();
        this.LineCurrent();
    };
    StarterComponent.prototype.getmeter = function (room) {
        var _this = this;
        this.userService.MacFromRoom(room).subscribe(function (res) {
            _this.Maddr = res['Maddr'];
            _this.getElec(_this.Maddr);
            _this.elecData(_this.Maddr);
        }, function (err) {
            console.log(err);
        });
    };
    StarterComponent.prototype.conYearTh = function (selectedyear) {
        return parseInt(selectedyear) + 543;
    };
    StarterComponent.prototype.conMonthTh = function (selectedMonth) {
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
    StarterComponent.prototype.conDayTH = function (data) {
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
    StarterComponent.prototype.con = function (index) {
        console.log(this.timeTH[index]);
        var time = this.timeTH[index].split(",", 5);
        var day = this.conDayTH(time[0]);
        var daynum = time[1];
        var Month = this.conMonthTh(time[2].split(" ", 2)[1]);
        var year = this.conYearTh(time[3].split(" ", 2)[1]);
        var times = time[4];
        var data = times + daynum + " " + Month + " " + year;
        this.timeTH[index] = data;
    };
    StarterComponent.prototype.elecData = function (meter) {
        var _this = this;
        this.meterService.showMyElec(meter).subscribe(function (res) {
            var ActiveEnergy = Object.keys(res).map(function (personNamedIndex) {
                var data = res[personNamedIndex];
                return data.ActiveEnergy;
            });
            var Frequency = Object.keys(res).map(function (personNamedIndex) {
                var data = res[personNamedIndex];
                return data.Frequency;
            });
            var LineCurrent = Object.keys(res).map(function (personNamedIndex) {
                var data = res[personNamedIndex];
                return data.LineCurrent;
            });
            var LineVoltage = Object.keys(res).map(function (personNamedIndex) {
                var data = res[personNamedIndex];
                return data.LineVoltage;
            });
            var date = Object.keys(res).map(function (personNamedIndex) {
                var data = res[personNamedIndex];
                return data.date;
            });
            _this.timeTH = date;
            // for (let i = 0; i < date.length; i++) {
            //   this.con(i)
            // }
            console.log(_this.timeTH);
            // console.log(ActiveEnergy);
            // console.log(Frequency);
            // console.log(LineCurrent);
            // console.log(LineVoltage);
            // console.log(date);
            // ActiveEnergy
            _this.LineChart = new chart_js__WEBPACK_IMPORTED_MODULE_4__["Chart"]("ActiveEnergy", {
                type: 'line',
                data: {
                    labels: date,
                    datasets: [{
                            data: ActiveEnergy,
                            borderColor: "#e8c3b9",
                            fill: false
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'ค่าพลังงานไฟฟ้า (หน่วย) '
                    },
                    scales: {
                        xAxes: [{
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        quarter: 'MMM YYYY'
                                    }
                                }
                            }]
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
                    }
                }
            });
            // Frequency
            _this.LineChart = new chart_js__WEBPACK_IMPORTED_MODULE_4__["Chart"]("Frequency", {
                type: 'line',
                data: {
                    labels: date,
                    datasets: [{
                            data: Frequency,
                            borderColor: "#3cba9f",
                            fill: false
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'ความถี่ไฟฟ้า (เฮิรตซ์)'
                    },
                    scales: {
                        xAxes: [{
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        quarter: 'MMM YYYY'
                                    }
                                }
                            }]
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
                    }
                }
            });
            // LineCurrent
            _this.LineChart = new chart_js__WEBPACK_IMPORTED_MODULE_4__["Chart"]("LineCurrent", {
                type: 'line',
                data: {
                    labels: date,
                    datasets: [{
                            data: LineCurrent,
                            label: "LineCurrent",
                            borderColor: "#8e5ea2",
                            fill: false
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'กระแสไฟฟ้าที่ใช้ (แอมแปร์)'
                    },
                    scales: {
                        xAxes: [{
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        quarter: 'MMM YYYY'
                                    }
                                }
                            }]
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
                    }
                }
            });
            // LineVoltage
            _this.LineChart = new chart_js__WEBPACK_IMPORTED_MODULE_4__["Chart"]("LineVoltage", {
                type: 'line',
                data: {
                    labels: date,
                    datasets: [{
                            data: LineVoltage,
                            label: "LineVoltage",
                            borderColor: "#3e95cd",
                            fill: false
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'แรงดันไฟฟ้า (โวลต์)'
                    },
                    scales: {
                        xAxes: [{
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        quarter: 'MMM YYYY'
                                    }
                                }
                            }]
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
                    }
                }
            });
        }, function (err) {
            console.log(err);
        });
    };
    StarterComponent.prototype.getElec = function (data) {
        var _this = this;
        this.userService.showBillUser(data).subscribe(function (res) {
            _this.lastFullTime = res['lastFullTime'].ActiveEnergy;
            _this.startFullTime = res['startFullTime'].ActiveEnergy;
        }, function (err) {
            console.log(err);
        });
    };
    StarterComponent.prototype.LineVoltage = function () {
        // this.LineChart = new Chart("LineVoltage", {
        //   type: 'line',
        //   data: {
        //     labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        //     datasets: [{
        //       data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
        //       label: "Africa",
        //       borderColor: "#3e95cd",
        //       fill: false
        //     }
        //     ]
        //   },
        //   options: {
        //     title: {
        //       display: true,
        //       text: 'LineVoltage (V)'
        //     }
        //   }
        // });
    };
    StarterComponent.prototype.LineCurrent = function () {
        // this.LineChart = new Chart("LineCurrent", {
        //   type: 'line',
        //   data: {
        //     labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        //     datasets: [{
        //       data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
        //       label: "Asia",
        //       borderColor: "#8e5ea2",
        //       fill: false
        //     }
        //     ]
        //   },
        //   options: {
        //     title: {
        //       display: true,
        //       text: 'LineCurrent (A)'
        //     }
        //   }
        // });
    };
    StarterComponent.prototype.Frequency = function () {
        // this.LineChart = new Chart("Frequency", {
        //   type: 'line',
        //   data: {
        //     labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        //     datasets: [{
        //       data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
        //       label: "Europe",
        //       borderColor: "#3cba9f",
        //       fill: false
        //     }
        //     ]
        //   },
        //   options: {
        //     title: {
        //       display: true,
        //       text: 'Frequency (Hz)'
        //     }
        //   }
        // });
    };
    StarterComponent.prototype.ActiveEnergy = function () {
        // this.LineChart = new Chart("ActiveEnergy", {
        //   type: 'line',
        //   data: {
        //     labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        //     datasets: [{
        //       data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
        //       label: "Latin America",
        //       borderColor: "#e8c3b9",
        //       fill: false
        //     }
        //     ]
        //   },
        //   options: {
        //     title: {
        //       display: true,
        //       text: 'ActiveEnergy (W)'
        //     }
        //   }
        // });
    };
    StarterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'starter',
            template: __webpack_require__(/*! ./starter.component.html */ "./src/app/user/starter/starter.component.html"),
            styles: [__webpack_require__(/*! ./starter.component.scss */ "./src/app/user/starter/starter.component.scss")]
        }),
        __metadata("design:paramtypes", [_shared_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _shared_meter_service__WEBPACK_IMPORTED_MODULE_2__["MeterService"]])
    ], StarterComponent);
    return StarterComponent;
}());



/***/ }),

/***/ "./src/app/user/starter/starter.module.ts":
/*!************************************************!*\
  !*** ./src/app/user/starter/starter.module.ts ***!
  \************************************************/
/*! exports provided: StarterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StarterModule", function() { return StarterModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/user/demo-material-module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _starter_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./starter.component */ "./src/app/user/starter/starter.component.ts");
/* harmony import */ var _starter_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./starter.routing */ "./src/app/user/starter/starter.routing.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var StarterModule = /** @class */ (function () {
    function StarterModule() {
    }
    StarterModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_3__["DemoMaterialModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_starter_routing__WEBPACK_IMPORTED_MODULE_6__["StarterRoutes"])
            ],
            declarations: [_starter_component__WEBPACK_IMPORTED_MODULE_5__["StarterComponent"]]
        })
    ], StarterModule);
    return StarterModule;
}());



/***/ }),

/***/ "./src/app/user/starter/starter.routing.ts":
/*!*************************************************!*\
  !*** ./src/app/user/starter/starter.routing.ts ***!
  \*************************************************/
/*! exports provided: StarterRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StarterRoutes", function() { return StarterRoutes; });
/* harmony import */ var _starter_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./starter.component */ "./src/app/user/starter/starter.component.ts");

var StarterRoutes = [{
        path: '',
        component: _starter_component__WEBPACK_IMPORTED_MODULE_0__["StarterComponent"]
    }];


/***/ })

}]);
//# sourceMappingURL=user-starter-starter-module.js.map