import { observable, action, makeObservable } from 'mobx';
import { toast } from 'react-toastify'

class AppointmentModel {
    //TODO: Remove placeholder data later. 
    _appointments = [
        { id: 1, col1: 'Dennis', col2: 'J123', col3: 'Trauma' },
        { id: 2, col1: 'Jennis', col2: 'G123', col3: 'Heart Disease' },
        { id: 3, col1: 'Lennis', col2: 'E123', col3: 'Bad bad' },
        { id: 4, col1: 'Dennis', col2: 'J123', col3: 'Trauma' },
        { id: 5, col1: 'Jennis', col2: 'G123', col3: 'Heart Disease' },
        { id: 6, col1: 'Dennis', col2: 'J123', col3: 'Trauma' },
        { id: 7, col1: 'Jennis', col2: 'G123', col3: 'Heart Disease' },
        { id: 8, col1: 'Dennis', col2: 'J123', col3: 'Trauma' }
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
            toast.error("Error: An error occured. Couldn't delete the appointment", {
				position: 'top-right',
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
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