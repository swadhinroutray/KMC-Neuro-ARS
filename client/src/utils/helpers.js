import { lightFormat } from 'date-fns'

// Format date instance to the format used by MaterialUI Textfield Datepicker
const toMaterialFormat = (date) => {
    if (date instanceof Date === false) {
        throw new Error('formatDate: not a date instance');
    }

    return lightFormat(date, 'yyyy-MM-dd')
}

export { toMaterialFormat }