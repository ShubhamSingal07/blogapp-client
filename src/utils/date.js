import moment from 'moment';

export const convertToMonthDate = date => moment(date).format('MMM Do');
