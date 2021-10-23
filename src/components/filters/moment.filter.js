import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

const dateFormat = 'YYYY/MM/DD H:mm';

export default function (date, type) {
	switch (type) {
		case 'month-week':
			return moment(date, dateFormat).format('D MMM, ddd');
		case 'time':
			return moment(date, dateFormat).format('HH:mm');
		default:
			return date;
	}
}
