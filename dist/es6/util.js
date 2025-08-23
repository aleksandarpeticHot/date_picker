import dayjs from 'dayjs';
export function createDayjsDate(args) {
    var now = dayjs(); // Get the current date and time
    var _a = args.year, year = _a === void 0 ? now.year() : _a, // Default to the current year
    _b = args.month, // Default to the current year
    month = _b === void 0 ? now.month() : _b, // Default to the current month (0-11)
    _c = args.date, // Default to the current month (0-11)
    date = _c === void 0 ? now.date() : _c, // Default to the current day of the month
    _d = args.hour, // Default to the current day of the month
    hour = _d === void 0 ? now.hour() : _d, // Default to the current hour
    _e = args.minute, // Default to the current hour
    minute = _e === void 0 ? now.minute() : _e;
    return dayjs(new Date(year, month, date, hour, minute));
}
