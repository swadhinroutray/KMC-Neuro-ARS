import { observable, action, makeObservable } from 'mobx';
import { addMonths } from 'date-fns'
import { formatDate } from '../utils/helpers'

class FormModel {
    constructor() {
        makeObservable(this, {
            dateDischarge: observable,
            dayOfWeek: observable,
            commonAppointmentsControl: observable,
            dateOneMonth: observable,
            dateThreeMonths: observable,
            dateSixMonths: observable,
            dateOneYear: observable,
            setAppointmentControl: action,
            setDischargeDate: action,
            setDate: action,
            submit: action
        })

    }
    patientName = ""
    hospitalNumber = ""
    diagnosis = ""
    dateDischarge = this.setDate(new Date())
    dayOfWeek = "tue"

    // Optional Referral Details
    wasReferred = false
    referrerName = ""
    referrerMob = ""

    appointments = {}

    // Booleans and Dates for common FU appointments
    commonAppointmentsControl = {
        "oneMonth": false,
        "threeMonths": false,
        "sixMonths": false,
        "oneYear": false
    }
    dateOneMonth = this.setDate(addMonths(new Date(), 1))
    dateThreeMonths = this.setDate(addMonths(new Date(), 3))
    dateSixMonths = this.setDate(addMonths(new Date(), 6))
    dateOneYear = this.setDate(addMonths(new Date(), 12))

    setAppointmentControl(fieldName, state) {
        this.commonAppointmentsControl[fieldName] = state
    }

    setDischargeDate(date) {
        this.dateDischarge = this.setDate(new Date(date))

        // When the discharge date is changed, update common FU dates accordingly
        this.dateOneMonth = this.setDate(addMonths(new Date(date), 1))
        this.dateThreeMonths = this.setDate(addMonths(new Date(date), 3))
        this.dateSixMonths = this.setDate(addMonths(new Date(date), 6))
        this.dateOneYear = this.setDate(addMonths(new Date(date), 12))
    }

    setDate(date) {
        try {
            return formatDate(date);
        }
        catch (err) {
            console.error("ERROR: Date provided is invalid")
        }
    }

    submit() {
        alert("Submit Form")
    }
}

const store = new FormModel();
export default store;