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

    System.findOne({ }, { __v: false, _id: false }, (err, time) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else if (time) {
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(time);
        }
        else {
            system.timeDelay = 30;
            system.save();
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json({timeDelay:30});
        }
    }).sort({ date: -1 })//.limit(2);

}