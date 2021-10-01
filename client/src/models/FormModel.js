import { observable, action, makeObservable, computed } from 'mobx';
import { addMonths, subWeeks, closestTo, nextSunday, nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, nextSaturday } from 'date-fns'
import { toMaterialFormat } from '../utils/helpers'
import { post } from '../utils/api'
import { toast } from 'react-toastify';
import history from '../routes/history';

const dayOfWeekMapping = { "sun": 0, "mon": 1, "tue": 2, "wed": 3, "thu": 4, "fri": 5, "sat": 6 };
const getNextWeekdayOccurence = (weekday, date) => {
    switch (weekday) {
        case 0: return nextSunday(date);
        case 1: return nextMonday(date);
        case 2: return nextTuesday(date);
        case 3: return nextWednesday(date);
        case 4: return nextThursday(date);
        case 5: return nextFriday(date);
        case 6: return nextSaturday(date);
        default:
            throw new Error("An invalid weekday was passed.");
    }
}

class FormModel {
    constructor() {
        makeObservable(this, {
            patientName: observable,
            hospitalNumber: observable,
            diagnosis: observable,
            mobileNumber: observable,
            dateDischarge: observable,
            dayOfWeek: observable,
            dateOneMonth: observable,
            dateThreeMonths: observable,
            dateSixMonths: observable,
            dateOneYear: observable,
            dateAdditional: observable,
            dateToday: observable,
            wasReferred: observable,
            referrerName: observable,
            referrerMobileNumber: observable,

            appointmentsControl: observable,
            appointmentDefaults: computed.struct,
            findClosestWeekDay: action,
            submit: action, handleResponse: action,
            isSubmitted: observable, 

            setAppointmentControl: action,
            setDischargeDate: action,
            setDate: action,
            setDayOfWeek: action,
            setHospitalNumber: action,
            setMobileNumber: action,
            setPatientName: action,
            setDiagnosis: action,
            setDateOneMonth: action,
            setDateThreeMonths: action,
            setDateSixMonths: action,
            setDateOneYear: action,
            setDateAdditional: action,
            setReferrerName: action,
            setReferrerMobileNumber: action,
            setWasReferred: action
        })

    }
    patientName = ""
    hospitalNumber = ""
    diagnosis = ""
    mobileNumber = ""
    dateDischarge = this.setDate(new Date())
    dateOneMonth = this.setDate(addMonths(new Date(), 1))
    dateThreeMonths = this.setDate(addMonths(new Date(), 3))
    dateSixMonths = this.setDate(addMonths(new Date(), 6))
    dateOneYear = this.setDate(addMonths(new Date(), 12))
    dateAdditional = ""
    dateToday = this.setDate(new Date())
    dayOfWeek = ""
    isSubmitted = false;

    // Optional Referral Details
    wasReferred = false
    referrerName = ""
    referrerMobileNumber = ""

    // Booleans and Dates for common FU appointments
    appointmentsControl = {
        "oneMonth": false,
        "threeMonths": false,
        "sixMonths": false,
        "oneYear": false,
        "additional": false,
    }
    get appointmentDefaults() {
        return {
            "oneMonth": this.setDate(addMonths(new Date(this.dateDischarge), 1)),
            "threeMonths": this.setDate(addMonths(new Date(this.dateDischarge), 3)),
            "sixMonths": this.setDate(addMonths(new Date(this.dateDischarge), 6)),
            "oneYear": this.setDate(addMonths(new Date(this.dateDischarge), 12)),
            "additional": ""
        }
    }

    setAppointmentControl(fieldName, state) {
        this.appointmentsControl[fieldName] = state
    }

    setDischargeDate(date) {
        this.dateDischarge = this.setDate(new Date(date))

        // When the discharge date is changed, update common FU dates accordingly
        this.dateOneMonth = this.setDate(addMonths(new Date(date), 1))
        this.dateThreeMonths = this.setDate(addMonths(new Date(date), 3))
        this.dateSixMonths = this.setDate(addMonths(new Date(date), 6))
        this.dateOneYear = this.setDate(addMonths(new Date(date), 12))

        this.setDayOfWeek(this.dayOfWeek)

        console.log(this.appointmentDefaults)
    }

    findClosestWeekDay(selectedWeekDay, originalDate) {
        let preferredWeekDayNumber = dayOfWeekMapping[selectedWeekDay];

        // Convert from MaterialUI datepicker formatting
        let formattedDate = new Date(originalDate)

        // Choose the preferred weekday that's closest to the default date
        let previousOccurence = getNextWeekdayOccurence(preferredWeekDayNumber, subWeeks(formattedDate, 1));
        let nextOccurence = getNextWeekdayOccurence(preferredWeekDayNumber, formattedDate);

        return closestTo(formattedDate, [previousOccurence, nextOccurence])
    }

    setDayOfWeek(weekday) {
        this.dayOfWeek = weekday;

        if (this.dayOfWeek && this.dayOfWeek.trim() !== "") {
            this.dateOneMonth = this.setDate(this.findClosestWeekDay(this.dayOfWeek, this.appointmentDefaults["oneMonth"]))
            this.dateThreeMonths = this.setDate(this.findClosestWeekDay(this.dayOfWeek, this.appointmentDefaults["threeMonths"]))
            this.dateSixMonths = this.setDate(this.findClosestWeekDay(this.dayOfWeek, this.appointmentDefaults["sixMonths"]))
            this.dateOneYear = this.setDate(this.findClosestWeekDay(this.dayOfWeek, this.appointmentDefaults["oneYear"]))
        }
        else {
            // Reset to defaults
            this.dateOneMonth = this.appointmentDefaults["oneMonth"]
            this.dateThreeMonths = this.appointmentDefaults["threeMonths"]
            this.dateSixMonths = this.appointmentDefaults["sixMonths"]
            this.dateOneYear = this.appointmentDefaults["oneYear"]
        }
    }

    setDate(date) {
        try {
            return toMaterialFormat(date);
        }
        catch (err) {
            console.error("ERROR: Date provided is invalid")
        }
    }

    setHospitalNumber(value) {
        this.hospitalNumber = value.trim();
    }
    setPatientName(value) {
        this.patientName = value.trim();
    }
    setDiagnosis(value) {
        this.diagnosis = value.trim();
    }
    setMobileNumber(value) {
        this.mobileNumber = value.trim();
    }
    setDateOneMonth(newDate) {
        this.dateOneMonth = this.setDate(new Date(newDate))
    }
    setDateThreeMonths(newDate) {
        this.dateThreeMonths = this.setDate(new Date(newDate))
    }
    setDateSixMonths(newDate) {
        this.dateSixMonths = this.setDate(new Date(newDate))
    }
    setDateOneYear(newDate) {
        this.dateOneYear = this.setDate(new Date(newDate))
    }
    setDateAdditional(newDate) {
        this.dateAdditional = this.setDate(new Date(newDate))
    }
    setWasReferred(state) {
        this.wasReferred = state;
    }
    setReferrerName(name) {
        this.referrerName = name.trim();
    }
    setReferrerMobileNumber(number) {
        this.referrerMobileNumber = number.trim();
    }
    setIsSubmitted(state) {
        this.isSubmitted = state;
    }
    submit() {
        // TODO: Remove ugly hack for unique emails once schema is updated.
        this.setIsSubmitted(false);
        const postBody = {
            name: this.patientName,
            email: "defult@gmail.com" + Date().substr(2, 8),
			contact: this.mobileNumber,
			hospitalContact: this.hospitalNumber,
			diagnosis: this.diagnosis,
			
			dischargeDate: this.dateDischarge,
			appointmentDate1: this.dateOneMonth,
			appointmentDate3: this.dateThreeMonths,
			appointmentDate6: this.dateSixMonths,
			appointmentDate12: this.dateOneYear,
            customAppointmentDate: this.dateAdditional,
            
            doctorName: this.referrerName,
            doctorNumber: this.referrerMobileNumber,
        }

        try {
            post('/api/patient', postBody).then(this.handleResponse);
        }
        catch (err) {
            console.err(err);
        }
    }
    handleResponse = res => {
        console.log(res.data)
        if (res.success === true) {
            toast.success('Appointment Record Added!', {
                position: 'top-right',
                autoClose: false,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
                draggable: false,
                progress:undefined
            });
            setTimeout(() => {window.location.reload();
            }, 3000)
        }
        else {
            toast.error(
                `Error: ${res.data ? JSON.stringify(res.data.errors) : "Couldn't add appointment record. Check all fields."}`
                , {
                    position: 'top-right',
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined
                });
        }
        this.setIsSubmitted(false);
    }
}

const store = new FormModel();
export default store;