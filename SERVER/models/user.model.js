const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    username: { type: String, required: 'Username can\'t be empty', lowercase: true, unique: true },
    firstname: { type: String, required: 'Fistname can\'t be empty', lowercase: true },
    lastname: { type: String, required: 'Lastname can\'t be empty', lowercase: true },
    email: { type: String, required: 'email can\'t be empty', lowercase: true, unique: true },
    room: { type: String, required: 'room can\'t be empty' },
    permission: { type: String, required: false, default:"genaral"},
    Maddr: { type: String, required: false, default: "Don't Have" },
    date: { type: String, required: true },
    password: { type: String, required: true },
    saltSecret: String
});


// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}

mongoose.model('User', userSchema);