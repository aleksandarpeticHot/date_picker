"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var isNil_1 = __importDefault(require("lodash/isNil"));
var invoke_1 = __importDefault(require("lodash/invoke"));
var dayjs_1 = __importDefault(require("dayjs"));
var React = __importStar(require("react"));
var lib_1 = require("../lib");
var HourPicker_1 = __importDefault(require("../pickers/timePicker/HourPicker"));
var MinutePicker_1 = __importDefault(require("../pickers/timePicker/MinutePicker"));
var InputView_1 = __importDefault(require("../views/InputView"));
var BaseInput_1 = __importStar(require("./BaseInput"));
var parse_1 = require("./parse");
function getNextMode(currentMode) {
    if (currentMode === 'hour') {
        return 'minute';
    }
    return 'hour';
}
var TimeInput = /** @class */ (function (_super) {
    __extends(TimeInput, _super);
    function TimeInput(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSelect = function (e, _a) {
            var value = _a.value;
            (0, lib_1.tick)(_this.handleSelectUndelayed, e, { value: value });
        };
        _this.formatHour = function (hour, timeFormat, minute) {
            // Create a Dayjs instance for today and set the hour, minute, and second
            var time = (0, dayjs_1.default)().set('hour', hour).set('minute', minute || 0).set('second', 0);
            // Format the time using the specified format from TIME_FORMAT
            return time.format(parse_1.TIME_FORMAT[timeFormat]);
        };
        _this.handleSelectUndelayed = function (e, _a) {
            var value = _a.value;
            var hour = value.hour, minute = value.minute;
            var _b = _this.props, timeFormat = _b.timeFormat, disableMinute = _b.disableMinute;
            var outputTimeString = '';
            if (_this.state.mode === 'hour' && !(0, isNil_1.default)(hour)) {
                outputTimeString = _this.formatHour(hour, timeFormat);
            }
            else if (!(0, isNil_1.default)(hour) && !(0, isNil_1.default)(minute)) {
                outputTimeString = _this.formatHour(hour, timeFormat, minute);
            }
            (0, invoke_1.default)(_this.props, 'onChange', e, __assign(__assign({}, _this.props), { value: outputTimeString }));
            if (_this.props.closable && (_this.state.mode === 'minute' || _this.props.disableMinute)) {
                _this.closePopup();
            }
            if (!disableMinute) {
                _this.switchToNextMode();
            }
        };
        _this.switchToNextMode = function () {
            _this.setState(function (_a) {
                var mode = _a.mode;
                return { mode: getNextMode(mode) };
            }, _this.onModeSwitch);
        };
        _this.state = {
            mode: 'hour',
            popupIsClosed: true,
        };
        return _this;
    }
    TimeInput.prototype.render = function () {
        var _this = this;
        var _a = this.props, value = _a.value, timeFormat = _a.timeFormat, closable = _a.closable, disableMinute = _a.disableMinute, rest = __rest(_a, ["value", "timeFormat", "closable", "disableMinute"]);
        return (React.createElement(InputView_1.default, __assign({ popupIsClosed: this.state.popupIsClosed, onMount: this.onInputViewMount, closePopup: this.closePopup, openPopup: this.openPopup }, rest, { value: value, renderPicker: function () { return _this.getPicker(); } })));
    };
    TimeInput.prototype.getPicker = function () {
        var _a = this.props, value = _a.value, timeFormat = _a.timeFormat, inline = _a.inline, localization = _a.localization, tabIndex = _a.tabIndex, pickerStyle = _a.pickerStyle, pickerWidth = _a.pickerWidth;
        var currentValue = (0, parse_1.parseValue)(value, parse_1.TIME_FORMAT[timeFormat], localization);
        var pickerProps = {
            inline: inline,
            onCalendarViewMount: this.onCalendarViewMount,
            isPickerInFocus: this.isPickerInFocus,
            isTriggerInFocus: this.isTriggerInFocus,
            hasHeader: false,
            pickerWidth: pickerWidth,
            pickerStyle: pickerStyle,
            onHeaderClick: function () { return undefined; },
            closePopup: this.closePopup,
            initializeWith: (0, parse_1.buildValue)(currentValue, null, localization, parse_1.TIME_FORMAT[timeFormat]),
            value: (0, parse_1.buildValue)(currentValue, null, parse_1.TIME_FORMAT[timeFormat], localization, null),
            onChange: this.handleSelect,
            timeFormat: timeFormat,
            tabIndex: tabIndex,
            localization: localization,
        };
        if (this.state.mode === 'hour') {
            return React.createElement(HourPicker_1.default, __assign({}, pickerProps));
        }
        return React.createElement(MinutePicker_1.default, __assign({}, pickerProps));
    };
    /**
     * Component responsibility:
     *  - parse time input string
     *  - switch between modes ['hour', 'minute']
     *  - handle HourPicker/MinutePicker change (format { hour: number, minute: number } into output time string)
     */
    TimeInput.defaultProps = __assign(__assign({}, BaseInput_1.default.defaultProps), { icon: 'time', timeFormat: '24', disableMinute: false });
    TimeInput.propTypes = __assign(__assign(__assign({}, BaseInput_1.BaseInputPropTypes), BaseInput_1.MultimodePropTypes), BaseInput_1.TimeRelatedPropTypes);
    return TimeInput;
}(BaseInput_1.default));
exports.default = TimeInput;
