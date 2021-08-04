import { observable, action, makeObservable, computed } from 'mobx';
import { addMonths, subWeeks, closestTo, nextSunday, nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, nextSaturday } from 'date-fns'
import { toMaterialFormat } from '../utils/helpers'

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
            dateDischarge: observable,
            dayOfWeek: observable,
            commonAppointmentsControl: observable,
            commonAppointmentDates: computed.struct,
            dateOneMonth: observable,
            dateThreeMonths: observable,
            dateSixMonths: observable,
            dateOneYear: observable,
            setAppointmentControl: action,
            setDischargeDate: action,
            setDate: action,
            setDayOfWeek: action,
            findClosestWeekDay: action,
            submit: action
        })

    }
    patientName = ""
    hospitalNumber = ""
    diagnosis = ""
    dateDischarge = this.setDate(new Date())
    dateOneMonth = this.setDate(addMonths(new Date(), 1))
    dateThreeMonths = this.setDate(addMonths(new Date(), 3))
    dateSixMonths = this.setDate(addMonths(new Date(), 6))
    dateOneYear = this.setDate(addMonths(new Date(), 12))
    dayOfWeek = ""

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
    get commonAppointmentDates() {
        return {
            "oneMonth": this.setDate(addMonths(new Date(this.dateDischarge), 1)),
            "threeMonths": this.setDate(addMonths(new Date(this.dateDischarge), 3)),
            "sixMonths": this.setDate(addMonths(new Date(this.dateDischarge), 6)),
            "oneYear": this.setDate(addMonths(new Date(this.dateDischarge), 12))
        }
    }

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

        this.setDayOfWeek(this.dayOfWeek)

        console.log(this.commonAppointmentDates)
    }

    findClosestWeekDay(selectedWeekDay, originalDate) {
        let preferredWeekDayNumber = dayOfWeekMapping[selectedWeekDay];

        // Convert from MaterialUI datepicker formatting
        let formattedDate = new Date(originalDate)

        // Choose the preferred weekday that's closest to the default date
        let previousOccurence = getNextWeekdayOccurence(preferredWeekDayNumber, subWeeks(formattedDate, 1));
        let nextOccurence = getNextWeekdayOccurence(preferredWeekDayNumber, formattedDate);

        console.log(closestTo(formattedDate, [previousOccurence, nextOccurence]))
        return closestTo(formattedDate, [previousOccurence, nextOccurence])
    }

    setDayOfWeek(weekday) {
        this.dayOfWeek = weekday;
        console.log(weekday)

        if (this.dayOfWeek && this.dayOfWeek.trim() !== "") {
            this.dateOneMonth = this.setDate(this.findClosestWeekDay(this.dayOfWeek, this.commonAppointmentDates["oneMonth"]))
            this.dateThreeMonths = this.setDate(this.findClosestWeekDay(this.dayOfWeek, this.commonAppointmentDates["threeMonths"]))
            this.dateSixMonths = this.setDate(this.findClosestWeekDay(this.dayOfWeek, this.commonAppointmentDates["sixMonths"]))
            this.dateOneYear = this.setDate(this.findClosestWeekDay(this.dayOfWeek, this.commonAppointmentDates["oneYear"]))
        }
        else {
            // Reset to defaults
            console.log("Default")
            this.dateOneMonth = this.commonAppointmentDates["oneMonth"]
            this.dateThreeMonths = this.commonAppointmentDates["threeMonths"]
            this.dateSixMonths = this.commonAppointmentDates["sixMonths"]
            this.dateOneYear = this.commonAppointmentDates["oneYear"]
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

    submit() {
        alert("Submit Form")
    }
}

const store = new FormModel();
export default store;