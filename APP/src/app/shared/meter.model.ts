export class MeterPowerCut {
    Maddr: string;
    shortCircuit: string;
    room: string;
}
export class showBill {
    start: string;
    end: string;
    meterDetails: {
        Maddr: string;
        room: string;
    }
}
export class Meter {
    Maddr: string;
    shortCircuit: string;
    date: string;
    status: string;
}
export class addMeter {
    Maddr: string;
    room: string;
}
export class updateMeter {
    Maddr: string;
    status: string;
}
export class system {
    timeDelay: number;
}

export class report {
    startActiveEnergy: string;
    endActiveEnergy: string;
    Room: string;
    Date_Start: string;
    Date_End: string;
    Bill: string;
}

export class showStatisticData {
    LineVoltage: string;
    Frequency: string;
    ActiveEnergy: string;
    LineCurrent: string;
    date: string;
}

export class showBillDataUser {
    startFullTime: {
        ActiveEnergy: string;
        date: string;
    }
    lastFullTime: {
        ActiveEnergy: string;
        date: string;
    }
}