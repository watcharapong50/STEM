const mongoose = require('mongoose');

var meterSchema = new mongoose.Schema({
    Maddr: { type: String, required: 'Madrr can\'t be empty', unique: true },
    room: { type: String, required: 'room can\'t be empty' ,unique: true },
    shortCircuit: { type: String, required: false, default: "false" },
    status: { type: String, required: false, default: "NoOwner" },
    date: { type: String, required: true },
});

mongoose.model('Meter', meterSchema);