"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDayjsDate = createDayjsDate;
var dayjs_1 = __importDefault(require("dayjs"));
function createDayjsDate(args) {
    var now = (0, dayjs_1.default)(); // Get the current date and time
    var _a = args.year, year = _a === void 0 ? now.year() : _a, // Default to the current year
    _b = args.month, // Default to the current year
    month = _b === void 0 ? now.month() : _b, // Default to the current month (0-11)
    _c = args.date, // Default to the current month (0-11)
    date = _c === void 0 ? now.date() : _c, // Default to the current day of the month
    _d = args.hour, // Default to the current day of the month
    hour = _d === void 0 ? now.hour() : _d, // Default to the current hour
    _e = args.minute, // Default to the current hour
    minute = _e === void 0 ? now.minute() : _e;
    return (0, dayjs_1.default)(new Date(year, month, date, hour, minute));
}
