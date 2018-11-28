const mongoose = require('mongoose');

var elecSchema = new mongoose.Schema({
    Maddr: { type: String, required: true },//, unique: true
    LineVoltage: { type: String, required: true },
    Frequency: { type: String, required: true },
    LineCurrent: { type: String, required: true },//, lowercase: true
    ActiveEnergy: { type: String, required: true },//,default: "genaral"
    date: { type: String, required: true },
    sort :{ type: String, required: true },
});

mongoose.model('Elec', elecSchema);