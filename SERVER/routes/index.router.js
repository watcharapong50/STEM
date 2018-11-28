const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlMeter = require('../controllers/meter.controller');
const ctrlElec = require('../controllers/elecData.controller')
const ctrlSystem = require('../controllers/system.controller')
const jwtHelper = require('../config/jwtHelper');

// User
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/showAllUser',ctrlUser.showAllUser);
router.delete('/deleteUser/:username', ctrlUser.deleteUser);
router.put('/updateUser', ctrlUser.updateUser);
router.get('/test/:id', ctrlUser.test);

//Meter
router.post('/addMeter', ctrlMeter.addMeter);
router.get('/showAllMeter', ctrlMeter.showMeter);
router.delete('/deleteMeter/:Maddr', ctrlMeter.deleteMeter);
router.put('/powerCut/:Maddr/:shortCircuit', ctrlMeter.powerCut);
router.put('/updateMeter', ctrlMeter.updateMeter);

router.get('/showPowerCut', ctrlMeter.showPowerCut);
router.get('/showMeterRoom', ctrlMeter.showMeterRoom);
router.post('/statusMeter', ctrlMeter.statusMeter);
router.get('/MacFromRoom/:room', ctrlMeter.MacFromRoom);

//ElecMData
router.post('/addElecData', ctrlElec.addElecData);
router.get('/showElec', ctrlElec.showElec);
router.get('/showMyElec/:Maddr', ctrlElec.showMyElec);
router.get('/showBill/:month/:year', ctrlElec.showBill);
router.get('/showBillUser/:Maddr', ctrlElec.showBillUser);
router.get('/showBillUserAll', ctrlElec.showBillUserAll);
router.get('/showStatistic/:room/:month/:year', ctrlElec.showStatistic);
router.get('/showBillUserReport/:Maddr/:month/:year', ctrlElec.showBillUserReport);
// System
router.get('/updateSystem/:timeDelay', ctrlSystem.updateSystem);
router.get('/showTimeDelay', ctrlSystem.showTimeDelay);
router.post('/showTimeDelayPost', ctrlSystem.showTimeDelayPost);

module.exports = router;



