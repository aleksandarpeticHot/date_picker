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
define(["require", "exports", "react", "dayjs", "../pickers/YearPicker", "../views/InputView", "./BaseInput", "./parse"], function (require, exports, React, dayjs_1, YearPicker_1, InputView_1, BaseInput_1, parse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    dayjs_1 = __importDefault(dayjs_1);
    YearPicker_1 = __importDefault(YearPicker_1);
    InputView_1 = __importDefault(InputView_1);
    BaseInput_1 = __importStar(BaseInput_1);
    var YearInput = /** @class */ (function (_super) {
        __extends(YearInput, _super);
        function YearInput(props) {
            var _this = _super.call(this, props) || this;
            _this.getPicker = function () {
                var _a = _this.props, value = _a.value, disable = _a.disable, maxDate = _a.maxDate, minDate = _a.minDate, initialDate = _a.initialDate, dateFormat = _a.dateFormat, localization = _a.localization;
                return (React.createElement(YearPicker_1.default, { isPickerInFocus: _this.isPickerInFocus, isTriggerInFocus: _this.isTriggerInFocus, inline: _this.props.inline, onCalendarViewMount: _this.onCalendarViewMount, closePopup: _this.closePopup, onChange: _this.handleSelect, initializeWith: (0, parse_1.buildValue)(value, initialDate, localization, dateFormat), value: (0, parse_1.buildValue)(value, null, localization, dateFormat, null), disable: (0, parse_1.parseArrayOrValue)(disable, dateFormat, localization), maxDate: (0, parse_1.parseValue)(maxDate, dateFormat, localization), minDate: (0, parse_1.parseValue)(minDate, dateFormat, localization), onHeaderClick: function () { return undefined; } }));
            };
            _this.handleSelect = function (e, _a) {
                var value = _a.value;
                var localization = _this.props.localization;
                var date = localization ? (0, dayjs_1.default)(new Date().setFullYear(value.year)).locale(localization) :
                    (0, dayjs_1.default)(new Date().setFullYear(value.year));
                var output = '';
                if (date.isValid()) {
                    output = date.format(_this.props.dateFormat);
                }
                var data = __assign(__assign({}, _this.props), { value: output });
                _this.props.onChange(e, data);
                if (_this.props.closable) {
                    _this.closePopup();
                }
            };
            _this.state = {
                popupIsClosed: true,
            };
            return _this;
        }
        YearInput.prototype.render = function () {
            var _a = this.props, value = _a.value, disable = _a.disable, maxDate = _a.maxDate, minDate = _a.minDate, initialDate = _a.initialDate, dateFormat = _a.dateFormat, closable = _a.closable, localization = _a.localization, rest = __rest(_a, ["value", "disable", "maxDate", "minDate", "initialDate", "dateFormat", "closable", "localization"]);
            return (React.createElement(InputView_1.default, __assign({ popupIsClosed: this.state.popupIsClosed, closePopup: this.closePopup, openPopup: this.openPopup }, rest, { value: value, onMount: this.onInputViewMount, renderPicker: this.getPicker })));
        };
        YearInput.defaultProps = __assign(__assign({}, BaseInput_1.default.defaultProps), { dateFormat: 'YYYY', icon: 'calendar' });
        YearInput.propTypes = __assign(__assign(__assign(__assign({}, BaseInput_1.BaseInputPropTypes), BaseInput_1.DateRelatedPropTypes), BaseInput_1.MinMaxValuePropTypes), BaseInput_1.DisableValuesPropTypes);
        return YearInput;
    }(BaseInput_1.default));
    exports.default = YearInput;
});
