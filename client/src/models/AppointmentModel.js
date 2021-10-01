import { observable, action, makeObservable } from 'mobx';
import { toast } from 'react-toastify'
import { get } from '../utils/api'

class AppointmentModel {
    _appointments = []
    isConfirmDialogOpen = false
    selectedAppointmentId = -1
    
    constructor() {
        makeObservable(this, {
            _appointments: observable,
            isConfirmDialogOpen: observable,
            deleteAppointment: action,
            selectedAppointmentId: observable,
            setSelectedAppointmentId: action, 
            setConfirmDialogOpen: action,
            fetchAppointments: action,
            fetchAppointmentsControl: action
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

    fetchAppointments = () => {
        try {
            get('/api/getpatients').then(this.fetchAppointmentsControl);
        }
        catch (err) {
            console.err(err);
        }
    }

    fetchAppointmentsControl = (res) =>  {
        console.log(res)
        if (res.success) {
            this._appointments = res.data.map(patientRecord => ({
                id:   (patientRecord.patientID? patientRecord.patientID: patientRecord._id),
                col1: patientRecord.name,
                col2: patientRecord.hospitalContact,
                col3: patientRecord.diagnosis
            }))
        }
        else {
            toast.error("Error: Could not fetch appointment information.", {
				position: 'top-right',
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
        }
    }
}

const store = new AppointmentModel();
export default store;