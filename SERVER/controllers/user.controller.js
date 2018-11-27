const mongoose = require('mongoose');
var dateFormat = require('dateformat');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');


module.exports.register = (req, res, next) => {
    dateFormat.masks.hammerDate = 'dddd, dd, mmmm, yyyy, HH:MM';
    var time = dateFormat(new Date(), "hammerDate").toString();
    var user = new User();
    user.username = req.body.username;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.password = req.body.password;
    user.email = req.body.email;
    user.room = req.body.room;
    user.date = time;
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
};

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt(), "permission": user.permission });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['firstname', 'lastname', 'email', 'username', 'room','Maddr']) });
        }
    );
}

module.exports.showAllUser = (req, res, next) => {
    User.find({}, { __v: false, _id: false, password: false, saltSecret: false }, (err, user) => {// .find({}, { _id: false, name: true }).limit(5).sort({ name: -1 })
        if (err) {
            return res.status(404).json({ success: false, message: 'Err : ' + err });
        } else {
            return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json(user);
        }
    }).sort({ date: -1 })//.limit(2);
}

module.exports.deleteUser = (req, res, next) => {
    if (req.params.username == null || req.params.username == '') {
        return res.status(404).json({ status: false, message: 'User record not found.' });
    } else {
        User.deleteMany({ username: req.params.username }, function (err) {
            if (err) {
                return res.status(404).json({ success: false, message: 'Err : ' + err });
            } else {
                return res.header('Access-Control-Allow-Origin', '*') + res.status(200).json('deleted');
            }
        });
    }
}

module.exports.updateUser = (req, res, next) => {
    let madrr;
    if (req.body.Maddr == null || req.body.Maddr == '') {
        req.body.Maddr = "Don't Have";
    }
    if (req.body.firstname == null || req.body.firstname == '' ||
        req.body.lastname == null || req.body.lastname == '' ||
        req.body.username == null || req.body.username == '' ||
        req.body.permission == null || req.body.permission == '' ||
        // req.body.password == null || req.body.password == '' ||
        req.body.room == null || req.body.room == '' ||
        req.body.email == null || req.body.email == '') {
        return res.status(404).json({ success: false, message: 'Empty Data' });
    } else {
        User.findOne({ username: req.body.username }).updateOne({
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                permission: req.body.permission,
                // password: req.body.password,
                email: req.body.email,
                room: req.body.room,
                Maddr: req.body.Maddr
            }
        }, (err, todo) => {
            if (!err) {
                return res.status(200).json(todo);
            } else {
                if (err.code == 11000)
                    res.status(422).send(['Duplicate email adrress found.']);
                else
                    return next(err);
            }
        })
    }
}

module.exports.test = (req, res, next) => {
    console.log("hello form test" + req.params.id);
    res.status(200).json('deleted');
}


// dateFormat.masks.hammerDate = 'dddd, dd, mmmm, yyyy, HH:MM:ss';
// var time = dateFormat(new Date(), "hammerDate").toString();
// var user = new User();
// user.username = req.body.username;
// user.firstname = req.body.firstname;
// user.lastname = req.body.lastname;
// user.password = req.body.password;
// user.email = req.body.email;
// user.room = req.body.room;
// user.date = time;
// user.save((err, doc) => {
//     if (!err) {
//         res.send(doc);
//     } else {
//         if (err.code == 11000)
//             res.status(422).send(['Duplicate email adrress found.']);
//         else
//             return next(err);
//     }
// });