import { observable, action, makeObservable } from 'mobx';

class AppointmentModel {
    //TODO: Remove placeholder data later. 
    _appointments = [
        { id: 1, col1: 'Dennis', col2: 'J123', col3: 'Trauma' },
        { id: 2, col1: 'Jennis', col2: 'G123', col3: 'Heart Disease' },
        { id: 3, col1: 'Lennis', col2: 'E123', col3: 'Bad bad' }
    ]
    isConfirmDialogOpen = false
    selectedAppointmentId = -1
    
    constructor() {
        makeObservable(this, {
            _appointments: observable,
            isConfirmDialogOpen: observable,
            deleteAppointment: action,
            selectedAppointmentId: observable,
            setSelectedAppointmentId: action, 
            setConfirmDialogOpen: action
        });
    }

    get appointments(){     
        return this._appointments.slice()
    }

    deleteAppointment(appointmentId) {
        const index  = this._appointments.findIndex(entry => entry.id === appointmentId)
        
        // Check if appointmentId is valid.
        if (index === -1) {
            // Appointment ID not found.
            alert("An error occured. Couldn't delete the appointment")
            return
        }

        // TODO: Send delete request.
        this._appointments.splice(index, 1)
        console.log("Deleted ID ", this.selectedAppointmentId)
    }

    setConfirmDialogOpen(state) {
        this.isConfirmDialogOpen = state;
    }

    setSelectedAppointmentId(appointmentId) {
        this.selectedAppointmentId = appointmentId;
    }
}

const store = new AppointmentModel();
export default store;