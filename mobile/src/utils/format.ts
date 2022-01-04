import moment from 'moment';

export function formatDate(date: Date) {
  const formatted = moment(date).format('DD/MM/YYYY');
  return formatted;
}
