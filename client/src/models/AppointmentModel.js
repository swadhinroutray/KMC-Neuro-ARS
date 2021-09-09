import { observable, action, makeObservable } from 'mobx';

class AppointmentModel {
    //TODO: Remove dummmy data later. 
    _appointments = [
        { id: 1, col1: 'Dennis', col2: 'J123', col3: 'Dead' },
        { id: 2, col1: 'Jennis', col2: 'G123', col3: 'Almost Dead' },
        { id: 3, col1: 'Lennis', col2: 'E123', col3: 'Pretty Deaf' }
    ]
    
    constructor() {
        makeObservable(this, { _appointments: observable });
    }

    get appointments(){     
        return this._appointments.slice()
    }
   
}

const store = new AppointmentModel();
export default store;