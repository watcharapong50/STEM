const mongoose = require('mongoose');
var dateFormat = require('dateformat');

const Elec = mongoose.model('Elec');
const Meter = mongoose.model('Meter');
const System = mongoose.model('System');

module.exports.addElecData = (req, res, next) => {
    dateFormat.masks.hammerDate = 'dddd, dd, mmmm, yyyy, HH:MM';
    var time = dateFormat(new Date(), "hammerDate").toString();
    var elec = new Elec();
    Meter.findOne({ Maddr: req.body.Maddr }, (err, data) => {
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } if (data) {
            elec.Maddr = req.body.Maddr;
            elec.LineVoltage = req.body.LineVoltage;
            elec.Frequency = req.body.Frequency;
            elec.ActiveEnergy = req.body.ActiveEnergy;
            elec.LineCurrent = req.body.LineCurrent;
            elec.date = time;
            elec.sort = Date.now();
            elec.save((err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    if (err.code == 11000)
                        res.status(422).send(['Error.']);
                    else
                        return next(err);
                }
            });
        } else {
            return res.status(404).json({ success: false, message: 'can\'t Find Meter ' });
        }
    })
};

module.exports.showElec = (req, res, next) => {
    Elec.find({}, { __v: false, _id: false }, (err, elec) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else {
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(elec);
        }
    }).sort({ sort: -1 });
}

module.exports.showMyElec = (req, res, next) => {
    if (req.params.Maddr == null || req.params.Maddr == '') {
        return res.status(404).json({ success: false, message: 'can\'t find Meter : ' });
    } else {
        Elec.find({ Maddr: req.params.Maddr }, { __v: false, _id: false, Maddr: false }, (err, elec) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
            if (err) {
                return res.status(404).json({ success: false, message: 'Err : ' + err });
            } else {
                return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(elec);
            }
        }).sort({ sort: -1 }).limit(24);
    }
}

module.exports.showStatistic = (req, res, next) => {
    let time = req.params.month + ", " + req.params.year;
    Meter.findOne({ room: req.params.room }, { __v: false, _id: false, shortCircuit: false, status: false, timeDelay: false, date: false, room: false }, (error, Maddr) => {
        if (error) {
            return res.status(404).json({ success: false, message: 'Err : ' + error });
        } else if (Maddr) {
            Elec.find({ "date": { '$regex': time }, Maddr: Maddr.Maddr }, { __v: false, _id: false, Maddr: false, sort: false }, (err, data) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
                if (err) {
                    return res.status(404).json({ success: false, message: 'Err : ' + err });
                } else if (data) {
                    return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(data);
                } else {
                    return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + err });
                }
            }).sort({ sort: 1 })
        } else {
            return res.status(404).json({ success: false, message: 'can\'t find room: ' + error });
        }
    })

}

module.exports.showStatisticTH = (req, res, next) => {
    let time = req.params.month + ", " + req.params.year;
    Meter.findOne({ room: req.params.room }, { __v: false, _id: false, shortCircuit: false, status: false, timeDelay: false, date: false, room: false }, (error, Maddr) => {
        if (error) {
            return res.status(404).json({ success: false, message: 'Err : ' + error });
        } else if (Maddr) {
            Elec.find({ "date": { '$regex': time }, Maddr: Maddr.Maddr }, { __v: false, _id: false, Maddr: false, sort: false }, (err, data) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
                if (err) {
                    return res.status(404).json({ success: false, message: 'Err : ' + err });
                } else if (data) {
                    var dataArray = new Array();
                    for (let i = 0; i < data.length; i++) {
                        dataArray.push({ หน่วยไฟที่ใช้: data[i].ActiveEnergy, เวลาที่บันทึก: data[i].date });
                    }
                    return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json({ สถิติการใช้: dataArray });
                } else {
                    return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + err });
                }
            }).sort({ sort: 1 })
        } else {
            return res.status(404).json({ success: false, message: 'can\'t find room: ' + error });
        }
    })

}

module.exports.showBillUser = (req, res, next) => {
    dateFormat.masks.hammerDate = 'mmmm';
    var month = dateFormat(new Date(), "hammerDate").toString();
    dateFormat.masks.hammerDate = 'yyyy';
    var year = dateFormat(new Date(), "hammerDate").toString();
    let newyear = year;
    let startmonth;
    if (month == 'January') { startmonth = 'December'; year = year - 1 } else if (month == 'February') { startmonth = 'January' } else if (month == 'March') { startmonth = 'February' } else if (month == 'April') { startmonth = 'March' } else if (month == 'May') { startmonth = 'April' } else if (month == 'June') { startmonth = 'May' } else if (month == 'July') { startmonth = 'June' } else if (month == 'August') { startmonth = 'July' } else if (month == 'September') { startmonth = 'August' } else if (month == 'October') { startmonth = 'September' } else if (month == 'November') { startmonth = 'October' } else if (month == 'December') { startmonth = 'November' } else { startmonth = 'False' }
    let startFullTime = startmonth + ', ' + year;
    let lastFullTime = month + ', ' + newyear;
    Elec.findOne({ "date": { '$regex': lastFullTime }, "Maddr": req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, date: false }, (err, elec) => {
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else if (elec) { //มีค่าสุดท้ายของเดือนที่หา
            //หาค่าสุดท้ายของเดือนที่แล้ว
            Elec.findOne({ "date": { '$regex': startFullTime }, Maddr: req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, date: false }, (error, startelec) => {
                if (error) {
                    return res.status(404).json({ success: false, message: 'Err : ' + error });
                } else if (startelec) { // มีค่าสุดท้ายของเดือนที่แล้ว
                    return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json({ startFullTime: startelec, lastFullTime: elec });
                } else if (elec) { // ไม่มีค่าสุดท้ายของเดือนที่แล้ว
                    // หาค่าแรกของเดือนที่หาแทน
                    Elec.findOne({ "date": { '$regex': lastFullTime }, Maddr: req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, date: false }, (err, data) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
                        if (err) {
                            return res.status(404).json({ success: false, message: 'Err : ' + err });
                        } else if (data) {
                            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json({ startFullTime: data, lastFullTime: elec });
                        } else {
                            return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + err });
                        }
                    }).sort({ sort: 1 })
                } else {
                    return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + error });
                }
            }).sort({ sort: -1 })
        } else {
            return res.status(404).json({ success: false, message: 'can\'t find lastFullTime: ' + err });
        }
    }).sort({ sort: -1 })
}

module.exports.showBill = (req, res, next) => {
    System.findOne({}, { __v: false, _id: false, timeDelay: false }, (err, time) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else if (time) {
            const dataArray = new Array();

            Meter.find({}, { __v: false, _id: false, shortCircuit: false, status: false, timeDelay: false, date: false }, (err, meter) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
                if (err) {
                    return res.status(404).json({ success: false, message: 'Err : ' + err });
                } else {
                    var month = req.params.month;
                    var year = req.params.year;
                    let newyear = year;
                    let startmonth;
                    if (month == 'January') { startmonth = 'December'; year = year - 1 } else if (month == 'February') { startmonth = 'January' } else if (month == 'March') { startmonth = 'February' } else if (month == 'April') { startmonth = 'March' } else if (month == 'May') { startmonth = 'April' } else if (month == 'June') { startmonth = 'May' } else if (month == 'July') { startmonth = 'June' } else if (month == 'August') { startmonth = 'July' } else if (month == 'September') { startmonth = 'August' } else if (month == 'October') { startmonth = 'September' } else if (month == 'November') { startmonth = 'October' } else if (month == 'December') { startmonth = 'November' } else { startmonth = 'False' }
                    let startFullTime = startmonth + ', ' + year;
                    let lastFullTime = month + ', ' + newyear;

                    for (let meterDetails of meter) {
                        let room = meterDetails.room
                        let Maddr = meterDetails.Maddr

                        Elec.findOne({ "date": { '$regex': lastFullTime }, "Maddr": meterDetails.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false }, (err, elec) => {
                            if (err) {
                                return res.status(404).json({ success: false, message: 'Err : ' + err });
                            } else if (elec) { //มีค่าสุดท้ายของเดือนที่หา
                                //หาค่าสุดท้ายของเดือนที่แล้ว
                                Elec.findOne({ "date": { '$regex': startFullTime }, Maddr: meterDetails.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false }, (error, startelec) => {
                                    if (error) {
                                        return res.status(404).json({ success: false, message: 'Err : ' + error });
                                    } else if (startelec) { // มีค่าสุดท้ายของเดือนที่แล้ว
                                        var bill2 = ((elec.ActiveEnergy - startelec.ActiveEnergy) * time['bathPerNum']).toFixed(0)
                                        dataArray.push({ Room: room, Date_Start: startelec.date, Date_End: elec.date, startActiveEnergy: startelec.ActiveEnergy, endActiveEnergy: elec.ActiveEnergy, Bill: bill2 });
                                        if (dataArray.length == meter.length) {
                                            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(dataArray);
                                        }
                                    } else if (elec) { // ไม่มีค่าสุดท้ายของเดือนที่แล้ว
                                        // หาค่าแรกของเดือนที่หาแทน
                                        Elec.findOne({ "date": { '$regex': lastFullTime }, Maddr: meterDetails.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, }, (err, data) => {
                                            if (err) {
                                                return res.status(404).json({ success: false, message: 'Err : ' + err });
                                            } else if (data) {
                                                var bill = ((elec.ActiveEnergy - data.ActiveEnergy) * time['bathPerNum']).toFixed(0)
                                                dataArray.push({ Room: room, Date_Start: data.date, Date_End: elec.date, startActiveEnergy: data.ActiveEnergy, endActiveEnergy: elec.ActiveEnergy, Bill: bill });
                                                if (dataArray.length == meter.length) {
                                                    return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(dataArray);
                                                }
                                            } else {
                                                console.log('Can\'t find');
                                                //return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + err });
                                            }
                                        }).sort({ sort: 1 })
                                    } else {
                                        console.log('Can\'t find');
                                        //return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + error });
                                    }
                                }).sort({ sort: -1 })
                            } else {
                                dataArray.push({ Room: room, Date_Start: "ไม่มีการบันทึกค่าไฟ", Date_End: "ไม่มีการบันทึกค่าไฟ", startActiveEnergy: '0', endActiveEnergy: '0', Bill: '0' });
                                if (dataArray.length == meter.length) {
                                    return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(dataArray);
                                }
                                //return res.status(404).json({ success: false, message: 'can\'t find lastFullTime: ' + err });
                            }
                        }).sort({ sort: -1 })
                    }
                }
            }).sort({ sort: -1 })
        }
        else {
            system.bathPerNum = 4;
            system.save();
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json({ bathPerNum: 4 });
        }
    }).sort({ date: -1 })//.limit(2);

}

module.exports.showBillTH = (req, res, next) => {
    System.findOne({}, { __v: false, _id: false, timeDelay: false }, (err, time) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else if (time) {
            const dataArray = new Array();

            Meter.find({}, { __v: false, _id: false, shortCircuit: false, status: false, timeDelay: false, date: false }, (err, meter) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
                if (err) {
                    return res.status(404).json({ success: false, message: 'Err : ' + err });
                } else {
                    var month = req.params.month;
                    var year = req.params.year;
                    let newyear = year;
                    let startmonth;
                    if (month == 'January') { startmonth = 'December'; year = year - 1 } else if (month == 'February') { startmonth = 'January' } else if (month == 'March') { startmonth = 'February' } else if (month == 'April') { startmonth = 'March' } else if (month == 'May') { startmonth = 'April' } else if (month == 'June') { startmonth = 'May' } else if (month == 'July') { startmonth = 'June' } else if (month == 'August') { startmonth = 'July' } else if (month == 'September') { startmonth = 'August' } else if (month == 'October') { startmonth = 'September' } else if (month == 'November') { startmonth = 'October' } else if (month == 'December') { startmonth = 'November' } else { startmonth = 'False' }
                    let startFullTime = startmonth + ', ' + year;
                    let lastFullTime = month + ', ' + newyear;

                    for (let meterDetails of meter) {
                        let room = meterDetails.room
                        let Maddr = meterDetails.Maddr

                        Elec.findOne({ "date": { '$regex': lastFullTime }, "Maddr": meterDetails.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false }, (err, elec) => {
                            if (err) {
                                return res.status(404).json({ success: false, message: 'Err : ' + err });
                            } else if (elec) { //มีค่าสุดท้ายของเดือนที่หา
                                //หาค่าสุดท้ายของเดือนที่แล้ว
                                Elec.findOne({ "date": { '$regex': startFullTime }, Maddr: meterDetails.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false }, (error, startelec) => {
                                    if (error) {
                                        return res.status(404).json({ success: false, message: 'Err : ' + error });
                                    } else if (startelec) { // มีค่าสุดท้ายของเดือนที่แล้ว
                                        var bill2 = ((elec.ActiveEnergy - startelec.ActiveEnergy) * time['bathPerNum']).toFixed(0)
                                        ///////////////////////////////////////////////////////////////////////////////
                                        dataArray.push({ ชื่อห้อง: room, เวลาที่เริ่มบันทึก: startelec.date, เวลาสิ้นสุด: elec.date, หน่วยไฟที่เรื่มจด: startelec.ActiveEnergy, หน่วยไฟสิ้นสุด: elec.ActiveEnergy, ค่าไฟ: bill2 });
                                        if (dataArray.length == meter.length) {
                                            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(dataArray);
                                        }
                                    } else if (elec) { // ไม่มีค่าสุดท้ายของเดือนที่แล้ว
                                        // หาค่าแรกของเดือนที่หาแทน
                                        Elec.findOne({ "date": { '$regex': lastFullTime }, Maddr: meterDetails.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, }, (err, data) => {
                                            if (err) {
                                                return res.status(404).json({ success: false, message: 'Err : ' + err });
                                            } else if (data) {
                                                var bill = ((elec.ActiveEnergy - data.ActiveEnergy) * time['bathPerNum']).toFixed(0)
                                                ///////////////////////////////////////////////////////////////////////////////
                                                dataArray.push({ ชื่อห้อง: room, เวลาที่เริ่มบันทึก: data.date, เวลาสิ้นสุด: elec.date, หน่วยไฟที่เรื่มจด: data.ActiveEnergy, หน่วยไฟสิ้นสุด: elec.ActiveEnergy, ค่าไฟ: bill });
                                                if (dataArray.length == meter.length) {
                                                    return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(dataArray);
                                                }
                                            } else {
                                                console.log('Can\'t find');
                                                //return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + err });
                                            }
                                        }).sort({ sort: 1 })
                                    } else {
                                        console.log('Can\'t find');
                                        //return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + error });
                                    }
                                }).sort({ sort: -1 })
                            } else {
                                ///////////////////////////////////////////////////////////////////////////////
                                dataArray.push({ ชื่อห้อง: room, เวลาที่เริ่มบันทึก: "ไม่มีการบันทึกค่าไฟ", เวลาสิ้นสุด: "ไม่มีการบันทึกค่าไฟ", หน่วยไฟที่เรื่มจด: '0', หน่วยไฟสิ้นสุด: '0', ค่าไฟ: '0' });
                                if (dataArray.length == meter.length) {
                                    return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(dataArray);
                                }
                                //return res.status(404).json({ success: false, message: 'can\'t find lastFullTime: ' + err });
                            }
                        }).sort({ sort: -1 })
                    }
                }
            }).sort({ sort: -1 })
        }
        else {
            system.bathPerNum = 4;
            system.save();
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json({ bathPerNum: 4 });
        }
    }).sort({ date: -1 })//.limit(2);

}

module.exports.showBillUserAll = (req, res, next) => {
    const dataArray = new Array();

    Meter.find({}, { __v: false, _id: false, shortCircuit: false, status: false, timeDelay: false, date: false }, (err, meter) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else {

            dateFormat.masks.hammerDate = 'mmmm';
            var month = dateFormat(new Date(), "hammerDate").toString();
            dateFormat.masks.hammerDate = 'yyyy';
            var year = dateFormat(new Date(), "hammerDate").toString();
            let newyear = year;
            let startmonth;
            if (month == 'January') { startmonth = 'December'; year = year - 1 } else if (month == 'February') { startmonth = 'January' } else if (month == 'March') { startmonth = 'February' } else if (month == 'April') { startmonth = 'March' } else if (month == 'May') { startmonth = 'April' } else if (month == 'June') { startmonth = 'May' } else if (month == 'July') { startmonth = 'June' } else if (month == 'August') { startmonth = 'July' } else if (month == 'September') { startmonth = 'August' } else if (month == 'October') { startmonth = 'September' } else if (month == 'November') { startmonth = 'October' } else if (month == 'December') { startmonth = 'November' } else { startmonth = 'False' }
            let startFullTime = startmonth + ', ' + year;
            let lastFullTime = month + ', ' + newyear;

            for (let meterDetails of meter) {
                let room = meterDetails.room
                let Maddr = meterDetails.Maddr

                Elec.findOne({ "date": { '$regex': lastFullTime }, "Maddr": meterDetails.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, date: false }, (err, elec) => {
                    if (err) {
                        return res.status(404).json({ success: false, message: 'Err : ' + err });
                    } else if (elec) { //มีค่าสุดท้ายของเดือนที่หา
                        //หาค่าสุดท้ายของเดือนที่แล้ว
                        Elec.findOne({ "date": { '$regex': startFullTime }, Maddr: meterDetails.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, date: false }, (error, startelec) => {
                            if (error) {
                                return res.status(404).json({ success: false, message: 'Err : ' + error });
                            } else if (startelec) { // มีค่าสุดท้ายของเดือนที่แล้ว
                                dataArray.push({ start: startelec.ActiveEnergy, end: elec.ActiveEnergy, room: room, Maddr: Maddr });
                                if (dataArray.length == meter.length) {
                                    return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(dataArray);
                                }
                            } else if (elec) { // ไม่มีค่าสุดท้ายของเดือนที่แล้ว
                                // หาค่าแรกของเดือนที่หาแทน
                                Elec.findOne({ "date": { '$regex': lastFullTime }, Maddr: meterDetails.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, date: false }, (err, data) => {
                                    if (err) {
                                        return res.status(404).json({ success: false, message: 'Err : ' + err });
                                    } else if (data) {
                                        dataArray.push({ start: data.ActiveEnergy, end: elec.ActiveEnergy, room: room, Maddr: Maddr });
                                        if (dataArray.length == meter.length) {
                                            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(dataArray);
                                        }
                                    } else {
                                        console.log('Can\'t find');
                                        //return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + err });
                                    }
                                }).sort({ sort: 1 })
                            } else {
                                console.log('Can\'t find');
                                //return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + error });
                            }
                        }).sort({ sort: -1 })
                    } else {
                        dataArray.push({ start: '0', end: '0', room: room, Maddr: Maddr });
                        if (dataArray.length == meter.length) {
                            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(dataArray);
                        }
                        //return res.status(404).json({ success: false, message: 'can\'t find lastFullTime: ' + err });
                    }
                }).sort({ sort: -1 })
            }
        }
    }).sort({ sort: -1 })
}

module.exports.showBillUserReport = (req, res, next) => {
    var month = req.params.month;
    var year = req.params.year;
    let newyear = year;
    let startmonth;
    if (month == 'January') { startmonth = 'December'; year = year - 1 } else if (month == 'February') { startmonth = 'January' } else if (month == 'March') { startmonth = 'February' } else if (month == 'April') { startmonth = 'March' } else if (month == 'May') { startmonth = 'April' } else if (month == 'June') { startmonth = 'May' } else if (month == 'July') { startmonth = 'June' } else if (month == 'August') { startmonth = 'July' } else if (month == 'September') { startmonth = 'August' } else if (month == 'October') { startmonth = 'September' } else if (month == 'November') { startmonth = 'October' } else if (month == 'December') { startmonth = 'November' } else { startmonth = 'False' }
    let startFullTime = startmonth + ', ' + year;
    let lastFullTime = month + ', ' + newyear;
    Elec.findOne({ "date": { '$regex': lastFullTime }, "Maddr": req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false }, (err, elec) => {
        if (err) {
            return res.status(200).json({ startFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' }, lastFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' } });
        } else if (elec) { //มีค่าสุดท้ายของเดือนที่หา
            //หาค่าสุดท้ายของเดือนที่แล้ว
            Elec.findOne({ "date": { '$regex': startFullTime }, Maddr: req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false }, (error, startelec) => {
                if (error) {
                    return res.status(200).json({ startFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' }, lastFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' } });
                } else if (startelec) { // มีค่าสุดท้ายของเดือนที่แล้ว
                    return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json({ startFullTime: startelec, lastFullTime: elec });
                } else if (elec) { // ไม่มีค่าสุดท้ายของเดือนที่แล้ว
                    // หาค่าแรกของเดือนที่หาแทน
                    Elec.findOne({ "date": { '$regex': lastFullTime }, Maddr: req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false }, (err, data) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
                        if (err) {
                            return res.status(404).json({ success: false, message: 'Err : ' + err });
                        } else if (data) {
                            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json({ startFullTime: data, lastFullTime: elec });
                        } else {
                            return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + err });
                        }
                    }).sort({ sort: 1 })
                } else {
                    return res.status(200).json({ startFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' }, lastFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' } });
                }
            }).sort({ sort: -1 })
        } else {
            return res.status(200).json({ startFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' }, lastFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' } });
        }
    }).sort({ sort: -1 })
}


module.exports.showBillUserReportYear = (req, res) => {
    System.findOne({}, { __v: false, _id: false, timeDelay: false }, (err, time) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else if (time) {
            var month = req.params.month;
            var year = req.params.year;
            let newyear = year;
            let startmonth;
            var test = ['', '', '', '', '', '', '', '', '', '', '', '']
            mTH = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
            var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const A = new Array();
            for (let index in mL) {
                month = mL[index]
                if (month == 'January') { startmonth = 'December'; year = year - 1 } else if (month == 'February') { startmonth = 'January' } else if (month == 'March') { startmonth = 'February' } else if (month == 'April') { startmonth = 'March' } else if (month == 'May') { startmonth = 'April' } else if (month == 'June') { startmonth = 'May' } else if (month == 'July') { startmonth = 'June' } else if (month == 'August') { startmonth = 'July' } else if (month == 'September') { startmonth = 'August' } else if (month == 'October') { startmonth = 'September' } else if (month == 'November') { startmonth = 'October' } else if (month == 'December') { startmonth = 'November' } else { startmonth = 'False' }
                if (month != 'January') { year = newyear }
                let startFullTime = startmonth + ', ' + year;
                let lastFullTime = month + ', ' + newyear;
                Elec.findOne({ "date": { '$regex': lastFullTime }, "Maddr": req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, sort: false }, (err, elec) => {
                    if (err) {
                        return res.status(200).json({ startFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' }, lastFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' } });
                    } else if (elec) { //มีค่าสุดท้ายของเดือนที่หา
                        A.push('1')
                        //test[index] = { end: elec, start: elec }

                        Elec.findOne({ "date": { '$regex': startFullTime }, Maddr: req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, sort: false }, (error, startelec) => {
                            if (error) {
                                return res.status(200).json({ startFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' }, lastFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' } });
                            } else if (startelec) { // มีค่าสุดท้ายของเดือนที่แล้ว
                                test[index] = { month: mTH[index], startFullTime: startelec, lastFullTime: elec, num: (elec.ActiveEnergy - startelec.ActiveEnergy).toFixed(2), bill: ((elec.ActiveEnergy - startelec.ActiveEnergy) * time.bathPerNum).toFixed(0) }
                            } else if (elec) { // ไม่มีค่าสุดท้ายของเดือนที่แล้ว
                                // หาค่าแรกของเดือนที่หาแทน
                                Elec.findOne({ "date": { '$regex': lastFullTime }, Maddr: req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, sort: false }, (err, data) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
                                    if (err) {
                                        return res.status(404).json({ success: false, message: 'Err : ' + err });
                                    } else if (data) {
                                        test[index] = { month: mTH[index], startFullTime: data, lastFullTime: elec, num: (elec.ActiveEnergy - data.ActiveEnergy).toFixed(2), bill: ((elec.ActiveEnergy - data.ActiveEnergy) * time.bathPerNum).toFixed(0) }
                                    } else {
                                        return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + err });
                                    }
                                }).sort({ sort: 1 })
                            } else {
                                return res.status(200).json({ startFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' }, lastFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' } });
                            }
                        }).sort({ sort: -1 })

                    } else {
                        A.push('')
                    }
                }).sort({ sort: -1 })

            }
            setTimeout(function () {
                if (A.length == 12) {
                    for (let i in test) {
                        if (test[i] == '' || test[i] == null) {
                            test[i] = {
                                "month": mTH[i],
                                "startFullTime": {
                                    "ActiveEnergy": "0",
                                    "date": "ไม่มีการบันทึก",
                                },
                                "lastFullTime": {
                                    "ActiveEnergy": "0",
                                    "date": "ไม่มีการบันทึก"
                                }, "num": "0.0", "bill": 0
                            }
                        }
                    }
                    return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(test);
                }
            }, 1000)
        }
    })

}
module.exports.showBillUserReportYearTH = (req, res) => {
    System.findOne({}, { __v: false, _id: false, timeDelay: false }, (err, time) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else if (time) {
            var month = req.params.month;
            var year = req.params.year;
            let newyear = year;
            let startmonth;
            var test = ['', '', '', '', '', '', '', '', '', '', '', '']
            mTH = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
            var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const A = new Array();
            for (let index in mL) {
                month = mL[index]
                if (month == 'January') { startmonth = 'December'; year = year - 1 } else if (month == 'February') { startmonth = 'January' } else if (month == 'March') { startmonth = 'February' } else if (month == 'April') { startmonth = 'March' } else if (month == 'May') { startmonth = 'April' } else if (month == 'June') { startmonth = 'May' } else if (month == 'July') { startmonth = 'June' } else if (month == 'August') { startmonth = 'July' } else if (month == 'September') { startmonth = 'August' } else if (month == 'October') { startmonth = 'September' } else if (month == 'November') { startmonth = 'October' } else if (month == 'December') { startmonth = 'November' } else { startmonth = 'False' }
                if (month != 'January') { year = newyear }
                let startFullTime = startmonth + ', ' + year;
                let lastFullTime = month + ', ' + newyear;
                Elec.findOne({ "date": { '$regex': lastFullTime }, "Maddr": req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, sort: false }, (err, elec) => {
                    if (err) {
                        return res.status(200).json({ startFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' }, lastFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' } });
                    } else if (elec) { //มีค่าสุดท้ายของเดือนที่หา
                        A.push('1')
                        //test[index] = { end: elec, start: elec }

                        Elec.findOne({ "date": { '$regex': startFullTime }, Maddr: req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, sort: false }, (error, startelec) => {
                            if (error) {
                                return res.status(200).json({ startFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' }, lastFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' } });
                            } else if (startelec) { // มีค่าสุดท้ายของเดือนที่แล้ว
                                test[index] = { เดือน: mTH[index], หน่วยไฟที่เริ่มบันทึก: startelec.ActiveEnergy, เวลาที่เริ่มบันทึกหน่วยไฟ: startelec.date, หน่วยไฟสิ้นสุด: elec.ActiveEnergy, เวลาสิ้นสุดที่ทึกหน่วยไฟ: elec.date, จำนวนหน่วยไฟ: (elec.ActiveEnergy - startelec.ActiveEnergy).toFixed(2), ค่าไฟ: ((elec.ActiveEnergy - startelec.ActiveEnergy) * time.bathPerNum).toFixed(0) }
                            } else if (elec) { // ไม่มีค่าสุดท้ายของเดือนที่แล้ว
                                // หาค่าแรกของเดือนที่หาแทน
                                Elec.findOne({ "date": { '$regex': lastFullTime }, Maddr: req.params.Maddr }, { __v: false, _id: false, Maddr: false, LineVoltage: false, Frequency: false, LineCurrent: false, sort: false }, (err, data) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
                                    if (err) {
                                        return res.status(404).json({ success: false, message: 'Err : ' + err });
                                    } else if (data) {
                                        test[index] = { เดือน: mTH[index], หน่วยไฟที่เริ่มบันทึก: data.ActiveEnergy, เวลาที่เริ่มบันทึกหน่วยไฟ: data.date, หน่วยไฟสิ้นสุด: elec.ActiveEnergy, เวลาสิ้นสุดที่ทึกหน่วยไฟ: elec.date, จำนวนหน่วยไฟ: (elec.ActiveEnergy - data.ActiveEnergy).toFixed(2), ค่าไฟ: ((elec.ActiveEnergy - data.ActiveEnergy) * time.bathPerNum).toFixed(0) }
                                    } else {
                                        return res.status(404).json({ success: false, message: 'can\'t find startFullTime: ' + err });
                                    }
                                }).sort({ sort: 1 })
                            } else {
                                return res.status(200).json({ startFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' }, lastFullTime: { ActiveEnergy: 0, date: 'ไม่มีการบันทึกค่า' } });
                            }
                        }).sort({ sort: -1 })

                    } else {
                        A.push('')
                    }
                }).sort({ sort: -1 })

            }
            setTimeout(function () {
                if (A.length == 12) {
                    for (let i in test) {
                        if (test[i] == '' || test[i] == null) {
                            test[i] = {
                                "เดือน": mTH[i],
                                "หน่วยไฟที่เริ่มบันทึก": "0",
                                "เวลาที่เริ่มบันทึกหน่วยไฟ": "ไม่มีการบันทึก",
                                "หน่วยไฟสิ้นสุด": "0",
                                "เวลาสิ้นสุดที่ทึกหน่วยไฟ": "ไม่มีการบันทึก",
                                "จำนวนหน่วยไฟ": "0.00",
                                "ค่าไฟ": 0
                            }
                        }
                    }
                    return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(test);
                }
            }, 1000)
        }
    })

}