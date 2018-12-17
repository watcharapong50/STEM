const mongoose = require('mongoose');
var dateFormat = require('dateformat');

const Meter = mongoose.model('Meter');

module.exports.addMeter = (req, res, next) => {
    dateFormat.masks.hammerDate = 'dddd, dd, mmmm, yyyy, HH:MM';
    var time = dateFormat(new Date(), "hammerDate").toString();
    var meter = new Meter();
    meter.Maddr = req.body.Maddr;
    meter.room = req.body.room;
    meter.date = time;
    meter.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            if (err.code == 11000)
                res.status(422).send(['Meter is Already.']);
            else
                return next(err);
        }
    });
};



module.exports.showMeter = (req, res, next) => {
    Meter.find({}, { __v: false, _id: false }, (err, meter) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else {
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(meter);
        }
    }).sort({ date: -1 })//.limit(2);
}

module.exports.deleteMeter = (req, res, next) => {
    if (req.params.Maddr == null || req.params.Maddr == '') {
        return res.status(404).json({ status: false, message: 'Meter record not found.' });
    } else {
        Meter.deleteMany({ Maddr: req.params.Maddr }, function (err) {
            if (err) {
                return res.status(404).json({ success: false, message: 'Err : ' + err });
            } else {
                return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json('deleted');
            }
        });
    }
}


module.exports.powerCut = (req, res, next) => {
    if (req.params.shortCircuit == null || req.params.shortCircuit == '' || req.params.Maddr == null || req.params.Maddr == '') {
        return res.status(404).json({ success: false, message: 'Empty Data' });
    } else {
        Meter.findOne({ Maddr: req.params.Maddr }).updateOne({
            $set: {
                shortCircuit: req.params.shortCircuit,
            }
        }, (err, todo) => {
            if (!err) {
                return res.status(200).json(todo);
            } else {
                if (err.code == 11000)
                    res.status(422).send(['Duplicate Maddr found.']);
                else
                    return next(err);
            }
        })
    }
    // if (req.body.shortCircuit == null || req.body.shortCircuit == '' || req.body.Maddr == null || req.body.Maddr == '') {
    //     return res.status(404).json({ success: false, message: 'Empty Data' });
    // } else {
    //     Meter.findOne({ Maddr: req.body.Maddr }).updateOne({
    //         $set: {
    //             shortCircuit: req.body.shortCircuit,
    //         }
    //     }, (err, todo) => {
    //         if (!err) {
    //             return res.status(200).json(todo);
    //         } else {
    //             if (err.code == 11000)
    //                 res.status(422).send(['Duplicate Maddr found.']);
    //             else
    //                 return next(err);
    //         }
    //     })
    // }
}
module.exports.showPowerCut = (req, res, next) => {
    Meter.find({}, { __v: false, _id: false, date: false, timeDelay: false, status: false }, (err, meter) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else {
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(meter);
        }
    }).sort({ date: -1 })//.limit(2);
}


const User = mongoose.model('User');


module.exports.showMeterRoom = (req, res, next) => {
    User.find({ Maddr: { "$ne": "Don't Have" } },
        {
            __v: false,
            _id: false,
            permission: false,
            username: false,
            firstname: false,
            lastname: false,
            password: false,
            email: false,
            date: false,
            saltSecret: false,
            // room:false 
        }, (err, user) => {
            if (err) {
                return res.status(404).json({ success: false, message: 'Err : ' + err });
            } else {
                // Meter.find({ Maddr:  { __v: false, _id: false }, (err, meter) => {
                //     if (err) {
                //         return res.status(404).json({ success: false, message: 'Err : ' + err });
                //     } else {
                //         return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(meter);
                //     }
                // })
                return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(user);
            }
        }).sort({ date: -1 })//.limit(2);
}

module.exports.updateMeter = (req, res, next) => {
    if (req.body.Maddr == null || req.body.Maddr == '' ||
        req.body.room == null || req.body.room == ''
    ) {
        return res.status(404).json({ success: false, message: 'Empty Data' });
    } else {
        Meter.findOne({ Maddr: req.body.Maddr }).updateOne({
            $set: {
                room: req.body.room,
            }
        }, (err, todo) => {
            if (!err) {
                return res.status(200).json(todo);
            } else {
                if (err.code == 11000)
                    res.status(422).send(['Duplicate Maddr adrress found.']);
                else
                    return next(err);
            }
        })
    }
}


module.exports.statusMeter = (req, res, next) => {
    Meter.findOne({ Maddr: req.body.Maddr }).select('Maddr timeDelay shortCircuit status').exec(function (err, meter) {
        if (err) {
            res.json({ message: err });
        }
        if (!meter) { //ถ้าไม่เจอ Maddr
            res.json({ shortCircuit: 'false', status: 'false' });
        } else {
            res.json({ shortCircuit: meter.shortCircuit, status: meter.status });
        }
    })
}

module.exports.MacFromRoom = (req, res, next) => {
    Meter.findOne({ room: req.params.room }, { __v: false, _id: false, shortCircuit: false, status: false, timeDelay: false, date: false, room: false }, (error, Maddr) => {
        if (error) {
            return res.status(404).json({ success: false, message: 'Err : ' + error });
        } else if (Maddr) {
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(Maddr);
        } else {
            return res.status(404).json({ success: false, message: 'can\'t find room: ' + error });
        }
    })
}
