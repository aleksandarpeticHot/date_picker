var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "lodash/isNil", "lodash/isArray", "lodash/isString", "lodash/compact", "dayjs", "../util", "dayjs/plugin/customParseFormat"], function (require, exports, isNil_1, isArray_1, isString_1, compact_1, dayjs_1, util_1, customParseFormat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TIME_FORMAT = void 0;
    exports.parseValue = parseValue;
    exports.parseArrayOrValue = parseArrayOrValue;
    exports.getInitializer = getInitializer;
    exports.buildValue = buildValue;
    exports.dateValueToString = dateValueToString;
    exports.parseDatesRange = parseDatesRange;
    isNil_1 = __importDefault(isNil_1);
    isArray_1 = __importDefault(isArray_1);
    isString_1 = __importDefault(isString_1);
    compact_1 = __importDefault(compact_1);
    dayjs_1 = __importDefault(dayjs_1);
    customParseFormat_1 = __importDefault(customParseFormat_1);
    exports.TIME_FORMAT = {
        24: 'HH:mm',
        AMPM: 'hh:mm A',
        ampm: 'hh:mm a',
    };
    dayjs_1.default.extend(customParseFormat_1.default);
    /** Parse string, moment, Date.
     *
     * Return unedfined on invalid input.
     */
    function parseValue(value, dateFormat, localization) {
        if (!(0, isNil_1.default)(value) && !(0, isNil_1.default)(dateFormat)) {
            var date = (0, dayjs_1.default)(value, dateFormat); // Parse the date using the format
            if (date.isValid()) {
                return date.locale(localization); // Apply localization if the date is valid
            }
        }
        return undefined; // Return undefined if parsing fails
    }
    /** Parse string, moment, Date, string[], moment[], Date[].
     *
     * Return array of moments. Returned value contains only valid moments.
     * Return undefined if none of the input values are valid.
     */
    function parseArrayOrValue(data, dateFormat, localization) {
        if ((0, isArray_1.default)(data)) {
            var parsed = (0, compact_1.default)(data.map(function (item) { return parseValue(item, dateFormat, localization); }));
            if (parsed.length > 0) {
                return parsed;
            }
        }
        var parsedValue = parseValue(data, dateFormat, localization);
        return parsedValue && [parsedValue];
    }
    /** Create moment.
     *
     * Creates moment using `dateParams` or `initialDate` arguments (if provided).
     * Precedense order: dateParams -> initialDate -> default value
     */
    function getInitializer(context) {
        var dateParams = context.dateParams, initialDate = context.initialDate, dateFormat = context.dateFormat, localization = context.localization;
        if (dateParams) {
            var dayjsDateParams = (0, util_1.createDayjsDate)(dateParams);
            var parsedParams = localization ? (0, dayjs_1.default)(dayjsDateParams).locale(localization) : (0, dayjs_1.default)(dayjsDateParams);
            if (parsedParams.isValid()) {
                return parsedParams;
            }
        }
        var parsedInitialDate = parseValue(initialDate, dateFormat, localization);
        if (parsedInitialDate) {
            return parsedInitialDate;
        }
        return localization ? (0, dayjs_1.default)().locale(localization) : (0, dayjs_1.default)();
    }
    /** Creates moment instance from provided value or initialDate.
     *  Creates today by default.
     */
    function buildValue(value, initialDate, localization, dateFormat, defaultVal) {
        if (defaultVal === void 0) { defaultVal = (0, dayjs_1.default)(); }
        var valueParsed = parseValue(value, dateFormat, localization);
        if (valueParsed) {
            return valueParsed;
        }
        var initialDateParsed = parseValue(initialDate, dateFormat, localization);
        if (initialDateParsed) {
            return initialDateParsed;
        }
        var _defaultVal = defaultVal ? defaultVal.clone() : defaultVal;
        if (_defaultVal) {
            _defaultVal.locale(localization);
        }
        return _defaultVal;
    }
    function dateValueToString(value, dateFormat, locale) {
        if ((0, isString_1.default)(value)) {
            return value;
        }
        if (dayjs_1.default.isDayjs(value)) {
            var _value = value.clone();
            _value.locale(locale);
            return _value.format(dateFormat);
        }
        var date = (0, dayjs_1.default)(value, dateFormat);
        if (date.isValid()) {
            date.locale(locale);
            return date.format(dateFormat);
        }
        return '';
    }
    function cleanDate(inputString, dateFormat) {
        var formattedDateLength = (0, dayjs_1.default)().format(dateFormat).length;
        return inputString.trim().slice(0, formattedDateLength);
    }
    /**
     * Extract start and end dates from input string.
     * Return { start: Moment|undefined, end: Moment|undefined }
     * @param {string} inputString Row input string from user
     * @param {string} dateFormat Moment formatting string
     * @param {string} inputSeparator Separator for split inputString
     */
    function parseDatesRange(inputString, dateFormat, inputSeparator) {
        if (inputString === void 0) { inputString = ''; }
        if (dateFormat === void 0) { dateFormat = ''; }
        if (inputSeparator === void 0) { inputSeparator = ' - '; }
        var dates = inputString.split(inputSeparator)
            .map(function (date) { return cleanDate(date, dateFormat); });
        var result = {};
        var start;
        var end;
        start = (0, dayjs_1.default)(dates[0], dateFormat);
        if (dates.length === 2) {
            end = (0, dayjs_1.default)(dates[1], dateFormat);
        }
        if (start && start.isValid()) {
            result.start = start;
        }
        if (end && end.isValid()) {
            result.end = end;
        }
        return result;
    }
});
