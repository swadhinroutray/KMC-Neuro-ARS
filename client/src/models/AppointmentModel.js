import { observable, action, makeObservable } from 'mobx';
import { toast } from 'react-toastify'
import { get, post } from '../utils/api'

class AppointmentModel {
    _appointments = []
    isConfirmDialogOpen = false
    selectedAppointmentId = -1
    
    constructor() {
        makeObservable(this, {
            _appointments: observable,
            isConfirmDialogOpen: observable,
            deleteAppointment: action,
            deleteAppointmentControl: action, 
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

        try {
            post('/api/cancel', {
                patientID: this._appointments[index]["patientID"],
                appointVal: this._appointments[index]["appointmentType"]
            }).then(res => this.deleteAppointmentControl(res, index));
        }   
        catch (err) {
            console.err(err);
            toast.error("Error: An error occured. Couldn't delete the appointment", {
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

    deleteAppointmentControl(res, index) {
        if (res.success) {
            console.log("Deleted appointment " + this._appointments[index]["appointmentType"])
            // Remove from the local array too. 
            this._appointments.splice(index, 1)
        }
        else {
            toast.error("Error: An error occured. Couldn't delete the appointment", {
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
            // Add separate appointment entries for each date.
            this._appointments = res.data.flatMap(function (patientRecord) {
                let _expandedAppointments = []
                if ("appointmentDate1" in patientRecord && patientRecord.appointmentDate1 !== null) {
                    _expandedAppointments.push({
                        id: patientRecord.patientID.concat("oneMonth"),
                        col1: patientRecord.name,
                        col2: patientRecord.appointmentDate1,
                        col3: patientRecord.diagnosis,
                        col4: patientRecord.hospitalContact,
                        appointmentType: 1,
                        patientID: patientRecord.patientID
                    })
                }
                if ("appointmentDate3" in patientRecord && patientRecord.appointmentDate3 !== null) {
                    _expandedAppointments.push({
                        id: patientRecord.patientID.concat("threeMonths"),
                        col1: patientRecord.name,
                        col2: patientRecord.appointmentDate3,
                        col3: patientRecord.diagnosis,
                        col4: patientRecord.hospitalContact,
                        appointmentType: 3,
                        patientID: patientRecord.patientID
                    })
                }
                if ("appointmentDate6" in patientRecord && patientRecord.appointmentDate6 !== null) {
                    _expandedAppointments.push({
                        id: patientRecord.patientID.concat("sixMonths"),
                        col1: patientRecord.name,
                        col2: patientRecord.appointmentDate6,
                        col3: patientRecord.diagnosis,
                        col4: patientRecord.hospitalContact,
                        appointmentType: 6,
                        patientID: patientRecord.patientID
                    })
                }
                if ("appointmentDate12" in patientRecord && patientRecord.appointmentDate12 !== null) {
                    _expandedAppointments.push({
                        id: patientRecord.patientID.concat("twelveMonths"),
                        col1: patientRecord.name,
                        col2: patientRecord.appointmentDate12,
                        col3: patientRecord.diagnosis,
                        col4: patientRecord.hospitalContact,
                        appointmentType: 12,
                        patientID: patientRecord.patientID
                    })
                }
                if ("customAppointmentDate" in patientRecord && patientRecord.customAppointmentDate !== null) {
                    _expandedAppointments.push({
                        id: patientRecord.patientID.concat("custom"),
                        col1: patientRecord.name,
                        col2: patientRecord.customAppointmentDate,
                        col3: patientRecord.diagnosis,
                        col4: patientRecord.hospitalContact,
                        appointmentType: 420,
                        patientID: patientRecord.patientID
                    })
                }
                return _expandedAppointments;
            })
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