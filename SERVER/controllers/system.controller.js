const mongoose = require('mongoose');
const System = mongoose.model('System');

module.exports.updateSystem = (req, res, next) => {
    if (req.params.timeDelay == null || req.params.timeDelay == ''
    ) {
        return res.status(404).json({ success: false, message: 'Empty Data' });
    } else {
        System.findOne().updateOne({
            $set: {
                timeDelay: req.params.timeDelay,
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

module.exports.showTimeDelay = (req, res, next) => {
    var system = new System();

    System.findOne({}, { __v: false, _id: false, bathPerNum: false }, (err, time) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else if (time) {
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(time);
        }
        else {
            system.timeDelay = 30;
            system.save();
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json({ timeDelay: 30 });
        }
    }).sort({ date: -1 })//.limit(2);
}
module.exports.showTimeDelayPost = (req, res) => {
    var system = new System();
    System.findOne({}, { __v: false, _id: false, bathPerNum: false }, (err, time) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else if (time) {
            return res.status(200).json(time);
        }
        else {
            system.timeDelay = 30;
            system.save();
            return res.status(200).json({ timeDelay: 30 });
        }
    }).sort({ date: -1 })//.limit(2);

}


//showTimeDelay

module.exports.showBathPerNum = (req, res, next) => {
    var system = new System();

    System.findOne({}, { __v: false, _id: false, timeDelay: false }, (err, time) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else if (time) {
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(time);
        }
        else {
            system.bathPerNum = 4;
            system.save();
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json({ bathPerNum: 4 });
        }
    }).sort({ date: -1 })//.limit(2);
}

module.exports.updateBath = (req, res, next) => {
    if (req.params.bath == null || req.params.bath == ''
    ) {
        return res.status(404).json({ success: false, message: 'Empty Data' });
    } else {
        System.findOne().updateOne({
            $set: {
                bathPerNum: req.params.bath,
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