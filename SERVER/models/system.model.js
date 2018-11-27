const mongoose = require('mongoose');

var systemSchema = new mongoose.Schema({
    timeDelay: { type: Number, required: false, default: "30" },
});

mongoose.model('System', systemSchema);