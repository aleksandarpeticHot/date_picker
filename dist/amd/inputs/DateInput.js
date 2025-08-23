var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "lodash/isNil", "lodash/invoke", "dayjs", "prop-types", "react", "../pickers/dayPicker/DayPicker", "../pickers/monthPicker/MonthPicker", "../pickers/YearPicker", "../views/InputView", "./BaseInput", "../util", "../lib", "./parse", "./shared"], function (require, exports, isNil_1, invoke_1, dayjs_1, PropTypes, React, DayPicker_1, MonthPicker_1, YearPicker_1, InputView_1, BaseInput_1, util_1, lib_1, parse_1, shared_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    isNil_1 = __importDefault(isNil_1);
    invoke_1 = __importDefault(invoke_1);
    dayjs_1 = __importDefault(dayjs_1);
    PropTypes = __importStar(PropTypes);
    React = __importStar(React);
    DayPicker_1 = __importDefault(DayPicker_1);
    MonthPicker_1 = __importDefault(MonthPicker_1);
    YearPicker_1 = __importDefault(YearPicker_1);
    InputView_1 = __importDefault(InputView_1);
    BaseInput_1 = __importStar(BaseInput_1);
    function getNextMode(currentMode) {
        if (currentMode === 'year') {
            return 'month';
        }
        if (currentMode === 'month') {
            return 'day';
        }
        return 'year';
    }
    function getPrevMode(currentMode) {
        if (currentMode === 'day') {
            return 'month';
        }
        if (currentMode === 'month') {
            return 'year';
        }
        return 'day';
    }
    var DateInput = /** @class */ (function (_super) {
        __extends(DateInput, _super);
        function DateInput(props) {
            var _this = _super.call(this, props) || this;
            _this.componentDidUpdate = function (prevProps) {
                // update internal date if ``value`` prop changed and successuffly parsed
                if (prevProps.value !== _this.props.value) {
                    var parsed = (0, parse_1.parseValue)(_this.props.value, _this.props.dateFormat, _this.props.localization);
                    if (parsed) {
                        _this.setState({
                            year: parsed.year(),
                            month: parsed.month(),
                            date: parsed.date(),
                        });
                    }
                }
            };
            _this.getPicker = function () {
                var _a = _this.props, value = _a.value, initialDate = _a.initialDate, dateFormat = _a.dateFormat, disable = _a.disable, minDate = _a.minDate, maxDate = _a.maxDate, enable = _a.enable, inline = _a.inline, marked = _a.marked, markColor = _a.markColor, localization = _a.localization, tabIndex = _a.tabIndex, pickerWidth = _a.pickerWidth, pickerStyle = _a.pickerStyle;
                var pickerProps = {
                    isPickerInFocus: _this.isPickerInFocus,
                    isTriggerInFocus: _this.isTriggerInFocus,
                    inline: inline,
                    onCalendarViewMount: _this.onCalendarViewMount,
                    closePopup: _this.closePopup,
                    tabIndex: tabIndex,
                    pickerWidth: pickerWidth,
                    pickerStyle: pickerStyle,
                    onChange: _this.handleSelect,
                    onHeaderClick: _this.switchToPrevMode,
                    initializeWith: (0, parse_1.buildValue)(_this.parseInternalValue(), initialDate, localization, dateFormat),
                    value: (0, parse_1.buildValue)(value, null, localization, dateFormat, null),
                    enable: (0, parse_1.parseArrayOrValue)(enable, dateFormat, localization),
                    minDate: (0, parse_1.parseValue)(minDate, dateFormat, localization),
                    maxDate: (0, parse_1.parseValue)(maxDate, dateFormat, localization),
                    localization: localization,
                };
                var disableParsed = (0, parse_1.parseArrayOrValue)(disable, dateFormat, localization);
                var markedParsed = (0, parse_1.parseArrayOrValue)(marked, dateFormat, localization);
                var mode = _this.state.mode;
                if (mode === 'year') {
                    return (React.createElement(YearPicker_1.default, __assign({}, pickerProps, { disable: (0, shared_1.getDisabledYears)(disableParsed) })));
                }
                if (mode === 'month') {
                    return (React.createElement(MonthPicker_1.default, __assign({}, pickerProps, { hasHeader: true, disable: (0, shared_1.getDisabledMonths)(disableParsed) })));
                }
                return React.createElement(DayPicker_1.default, __assign({}, pickerProps, { disable: disableParsed, marked: markedParsed, markColor: markColor }));
            };
            _this.switchToNextModeUndelayed = function () {
                _this.setState(function (_a) {
                    var mode = _a.mode;
                    return { mode: getNextMode(mode) };
                }, _this.onModeSwitch);
            };
            _this.switchToNextMode = function () {
                (0, lib_1.tick)(_this.switchToNextModeUndelayed);
            };
            _this.switchToPrevModeUndelayed = function () {
                _this.setState(function (_a) {
                    var mode = _a.mode;
                    return { mode: getPrevMode(mode) };
                }, _this.onModeSwitch);
            };
            _this.switchToPrevMode = function () {
                (0, lib_1.tick)(_this.switchToPrevModeUndelayed);
            };
            _this.onFocus = function () {
                if (!_this.props.preserveViewMode) {
                    _this.setState({ mode: _this.props.startMode });
                }
            };
            _this.handleSelect = function (e, _a) {
                var value = _a.value;
                if (_this.state.mode === 'day' && _this.props.closable) {
                    _this.closePopup();
                }
                _this.setState(function (prevState) {
                    var mode = prevState.mode;
                    if (mode === 'day') {
                        var date = (0, util_1.createDayjsDate)(value);
                        var outValue = (0, dayjs_1.default)(date).format(_this.props.dateFormat);
                        (0, invoke_1.default)(_this.props, 'onChange', e, __assign(__assign({}, _this.props), { value: outValue }));
                    }
                    return {
                        year: value.year,
                        month: value.month,
                        date: value.date,
                    };
                }, function () { return _this.state.mode !== 'day' && _this.switchToNextMode(); });
            };
            /** Keeps internal state in sync with input field value. */
            _this.onInputValueChange = function (e, _a) {
                var value = _a.value;
                var parsedValue = (0, dayjs_1.default)(value, _this.props.dateFormat);
                if (parsedValue.isValid()) {
                    _this.setState({
                        year: parsedValue.year(),
                        month: parsedValue.month(),
                        date: parsedValue.date(),
                    });
                }
                (0, invoke_1.default)(_this.props, 'onChange', e, __assign(__assign({}, _this.props), { value: value }));
            };
            var parsedValue = (0, parse_1.parseValue)(props.value, props.dateFormat, props.localization);
            _this.state = {
                mode: props.startMode,
                popupIsClosed: true,
                year: parsedValue ? parsedValue.year() : undefined,
                month: parsedValue ? parsedValue.month() : undefined,
                date: parsedValue ? parsedValue.date() : undefined,
            };
            return _this;
        }
        DateInput.prototype.render = function () {
            var _this = this;
            var _a = this.props, value = _a.value, dateFormat = _a.dateFormat, initialDate = _a.initialDate, disable = _a.disable, enable = _a.enable, maxDate = _a.maxDate, minDate = _a.minDate, preserveViewMode = _a.preserveViewMode, startMode = _a.startMode, closable = _a.closable, markColor = _a.markColor, marked = _a.marked, localization = _a.localization, onChange = _a.onChange, rest = __rest(_a, ["value", "dateFormat", "initialDate", "disable", "enable", "maxDate", "minDate", "preserveViewMode", "startMode", "closable", "markColor", "marked", "localization", "onChange"]);
            return (React.createElement(InputView_1.default, __assign({ closePopup: this.closePopup, openPopup: this.openPopup, popupIsClosed: this.state.popupIsClosed, onMount: this.onInputViewMount, onFocus: this.onFocus, onChange: this.onInputValueChange }, rest, { renderPicker: function () { return _this.getPicker(); }, value: (0, parse_1.dateValueToString)(value, dateFormat, localization) })));
        };
        DateInput.prototype.parseInternalValue = function () {
            /*
              Creates dayjs instance from values stored in component's state
              (year, month, date) in order to pass this dayjs instance to
              underlying picker.
              Return undefined if none of these state fields has value.
            */
            var _a = this.state, year = _a.year, month = _a.month, date = _a.date;
            if (!(0, isNil_1.default)(year) || !(0, isNil_1.default)(month) || !(0, isNil_1.default)(date)) {
                var currentYear = year !== null && year !== void 0 ? year : (0, dayjs_1.default)().year();
                var currentMonth = month !== null && month !== void 0 ? month : 0; // Default to January if month is not provided
                var currentDate = date !== null && date !== void 0 ? date : 1; // Default to 1 if date is not provided
                return (0, dayjs_1.default)(new Date(currentYear, currentMonth, currentDate));
            }
        };
        /**
         * Component responsibility:
         *  - parse input value
         *  - handle underlying picker change
         */
        DateInput.defaultProps = __assign(__assign({}, BaseInput_1.default.defaultProps), { dateFormat: 'DD-MM-YYYY', startMode: 'day', preserveViewMode: true, icon: 'calendar' });
        DateInput.propTypes = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, BaseInput_1.BaseInputPropTypes), BaseInput_1.DateRelatedPropTypes), BaseInput_1.MultimodePropTypes), BaseInput_1.DisableValuesPropTypes), BaseInput_1.EnableValuesPropTypes), BaseInput_1.MarkedValuesPropTypes), BaseInput_1.MinMaxValuePropTypes), {
            /** Display mode to start. */
            startMode: PropTypes.oneOf(['year', 'month', 'day']),
        });
        return DateInput;
    }(BaseInput_1.default));
    exports.default = DateInput;
});
