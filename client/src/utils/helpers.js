import { lightFormat } from 'date-fns'

const formatDate = (date) => {
    if (date instanceof Date === false) {
        throw new Error('formatDate: not a date instance');
    }

    return lightFormat(date, 'yyyy-MM-dd')
}

export { formatDate }