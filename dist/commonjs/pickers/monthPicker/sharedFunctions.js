"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrevPageAvailable = exports.isNextPageAvailable = exports.getDisabledPositions = exports.getInitialDatePosition = exports.buildCalendarValues = void 0;
var range_1 = __importDefault(require("lodash/range"));
var includes_1 = __importDefault(require("lodash/includes"));
var isNil_1 = __importDefault(require("lodash/isNil"));
var isArray_1 = __importDefault(require("lodash/isArray"));
var uniq_1 = __importDefault(require("lodash/uniq"));
var some_1 = __importDefault(require("lodash/some"));
require("dayjs/locale/en");
require("dayjs/locale/de");
require("dayjs/locale/nl");
require("dayjs/locale/fr");
require("dayjs/locale/nl-be");
var dayjs_1 = __importDefault(require("dayjs"));
var const_1 = require("./const");
var buildCalendarValues = function (localization) {
    /*
      Return array of months (strings) like ['Aug', 'Sep', ...]
      that is used to populate the calendar's page.
    */
    if (localization) {
        dayjs_1.default.locale(localization); // Dynamically set locale
    }
    var localLocale = dayjs_1.default.localeData();
    return localLocale.monthsShort(); // Return an array of short month names
};
exports.buildCalendarValues = buildCalendarValues;
var getInitialDatePosition = function (selectable, currentDate) {
    if (selectable.indexOf(currentDate.month()) < 0) {
        return selectable[0];
    }
    return currentDate.month();
};
exports.getInitialDatePosition = getInitialDatePosition;
var getDisabledPositions = function (enable, disable, maxDate, minDate, currentDate) {
    /*
      Return position numbers of months that should be displayed as disabled
      (position in array returned by `this.buildCalendarValues`).
    */
    var disabled = [];
    if ((0, isArray_1.default)(enable)) {
        var enabledMonthPositions_1 = enable
            .filter(function (monthMoment) { return monthMoment.isSame(currentDate, 'year'); })
            .map(function (monthMoment) { return monthMoment.month(); });
        disabled = disabled.concat((0, range_1.default)(0, const_1.MONTHS_IN_YEAR)
            .filter(function (monthPosition) { return !(0, includes_1.default)(enabledMonthPositions_1, monthPosition); }));
    }
    if ((0, isArray_1.default)(disable)) {
        disabled = disabled.concat(disable
            .filter(function (monthMoment) { return monthMoment.year() === currentDate.year(); })
            .map(function (monthMoment) { return monthMoment.month(); }));
    }
    if (!(0, isNil_1.default)(maxDate)) {
        if (maxDate.year() === currentDate.year()) {
            disabled = disabled.concat((0, range_1.default)(maxDate.month() + 1, const_1.MONTHS_IN_YEAR));
        }
        if (maxDate.year() < currentDate.year()) {
            disabled = (0, range_1.default)(0, const_1.MONTHS_IN_YEAR);
        }
    }
    if (!(0, isNil_1.default)(minDate)) {
        if (minDate.year() === currentDate.year()) {
            disabled = disabled.concat((0, range_1.default)(0, minDate.month()));
        }
        if (minDate.year() > currentDate.year()) {
            disabled = (0, range_1.default)(0, const_1.MONTHS_IN_YEAR);
        }
    }
    if (disabled.length > 0) {
        return (0, uniq_1.default)(disabled);
    }
};
exports.getDisabledPositions = getDisabledPositions;
var isNextPageAvailable = function (maxDate, enable, currentDate) {
    if ((0, isArray_1.default)(enable)) {
        return (0, some_1.default)(enable, function (enabledMonth) { return enabledMonth.isAfter(currentDate, 'year'); });
    }
    if ((0, isNil_1.default)(maxDate)) {
        return true;
    }
    return currentDate.year() < maxDate.year();
};
exports.isNextPageAvailable = isNextPageAvailable;
var isPrevPageAvailable = function (minDate, enable, currentDate) {
    if ((0, isArray_1.default)(enable)) {
        return (0, some_1.default)(enable, function (enabledMonth) { return enabledMonth.isBefore(currentDate, 'year'); });
    }
    if ((0, isNil_1.default)(minDate)) {
        return true;
    }
    return currentDate.year() > minDate.year();
};
exports.isPrevPageAvailable = isPrevPageAvailable;
