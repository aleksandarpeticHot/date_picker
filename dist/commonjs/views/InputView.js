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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isString_1 = __importDefault(require("lodash/isString"));
var invoke_1 = __importDefault(require("lodash/invoke"));
var React = __importStar(require("react"));
var semantic_ui_react_1 = require("semantic-ui-react");
var checkIE_1 = __importDefault(require("../lib/checkIE"));
var checkMobile_1 = __importDefault(require("../lib/checkMobile"));
var popupStyle = {
    padding: '0',
    filter: 'none', // prevents bluring popup when used inside Modal with dimmer="bluring" #28 #26
};
var FormInputWithRef = /** @class */ (function (_super) {
    __extends(FormInputWithRef, _super);
    function FormInputWithRef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormInputWithRef.prototype.render = function () {
        var _a = this.props, value = _a.value, clearable = _a.clearable, icon = _a.icon, clearIcon = _a.clearIcon, onClear = _a.onClear, innerRef = _a.innerRef, onFocus = _a.onFocus, onBlur = _a.onBlur, onMouseEnter = _a.onMouseEnter, rest = __rest(_a, ["value", "clearable", "icon", "clearIcon", "onClear", "innerRef", "onFocus", "onBlur", "onMouseEnter"]);
        var ClearIcon = (0, isString_1.default)(clearIcon) ?
            React.createElement(semantic_ui_react_1.Icon, { name: clearIcon, link: true, onClick: onClear }) :
            React.createElement(clearIcon.type, __assign({}, clearIcon.props, { link: true, onClick: onClear }));
        return (React.createElement(semantic_ui_react_1.Form.Input, __assign({ onFocus: onFocus, onBlur: onBlur, onClick: onFocus, onMouseEnter: onMouseEnter, icon: true }, rest),
            value && clearable ?
                ClearIcon
                :
                    React.createElement(semantic_ui_react_1.Icon, { name: icon }),
            React.createElement("input", { ref: innerRef, value: value })));
    };
    return FormInputWithRef;
}(React.Component));
var InputView = /** @class */ (function (_super) {
    __extends(InputView, _super);
    function InputView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onBlur = function (e) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var closePopup = _this.props.closePopup;
            if (e.relatedTarget !== _this.popupNode
                && e.relatedTarget !== _this.inputNode
                && !(0, checkIE_1.default)()) {
                invoke_1.default.apply(void 0, __spreadArray([_this.props, 'onBlur', e], args, false));
                closePopup();
            }
        };
        _this.onMouseLeave = function (e) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a = _this.props, closeOnMouseLeave = _a.closeOnMouseLeave, closePopup = _a.closePopup;
            if (e.relatedTarget !== _this.popupNode && e.relatedTarget !== _this.inputNode) {
                if (closeOnMouseLeave) {
                    invoke_1.default.apply(void 0, __spreadArray([_this.props, 'onMouseLeave', e], args, false));
                    _this.mouseLeaveTimeout = window.setTimeout(function () {
                        if (_this.mouseLeaveTimeout) {
                            closePopup();
                        }
                    }, 500);
                }
            }
        };
        _this.onMouseEnter = function (e) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var closeOnMouseLeave = _this.props.closeOnMouseLeave;
            invoke_1.default.apply(void 0, __spreadArray([_this.props, 'onMouseEnter', e], args, false));
            if (e.currentTarget === _this.popupNode || e.currentTarget === _this.inputNode) {
                if (closeOnMouseLeave) {
                    clearTimeout(_this.mouseLeaveTimeout);
                    _this.mouseLeaveTimeout = null;
                }
            }
        };
        _this.scrollListener = function () {
            var closePopup = _this.props.closePopup;
            closePopup();
        };
        return _this;
    }
    InputView.prototype.render = function () {
        var _this = this;
        var _a = this.props, renderPicker = _a.renderPicker, popupPosition = _a.popupPosition, inline = _a.inline, value = _a.value, closeOnMouseLeave = _a.closeOnMouseLeave, onChange = _a.onChange, onClear = _a.onClear, 
        // @ts-ignore
        children = _a.children, inlineLabel = _a.inlineLabel, popupIsClosed = _a.popupIsClosed, mountNode = _a.mountNode, tabIndex = _a.tabIndex, onMount = _a.onMount, closePopup = _a.closePopup, openPopup = _a.openPopup, animation = _a.animation, duration = _a.duration, pickerWidth = _a.pickerWidth, pickerStyle = _a.pickerStyle, iconPosition = _a.iconPosition, icon = _a.icon, readOnly = _a.readOnly, hideMobileKeyboard = _a.hideMobileKeyboard, rest = __rest(_a, ["renderPicker", "popupPosition", "inline", "value", "closeOnMouseLeave", "onChange", "onClear", "children", "inlineLabel", "popupIsClosed", "mountNode", "tabIndex", "onMount", "closePopup", "openPopup", "animation", "duration", "pickerWidth", "pickerStyle", "iconPosition", "icon", "readOnly", "hideMobileKeyboard"]);
        var inputElement = (React.createElement(FormInputWithRef, __assign({}, rest, { 
            // trying to use this hack https://stackoverflow.com/a/7610923 for hiding mobile keyboard
            readOnly: ((0, checkMobile_1.default)() && hideMobileKeyboard) || readOnly, icon: icon, iconPosition: icon && iconPosition !== 'right' ? iconPosition : undefined, innerRef: function (e) { _this.inputNode = e; onMount(e); }, value: value, tabIndex: tabIndex, inline: inlineLabel, onClear: function (e) { return (onClear || onChange)(e, __assign(__assign({}, rest), { value: '' })); }, onFocus: function (e) {
                (0, invoke_1.default)(_this.props, 'onFocus', e, _this.props);
                openPopup();
            }, onBlur: this.onBlur, onMouseEnter: this.onMouseEnter, onChange: onChange })));
        if (inline) {
            return renderPicker();
        }
        return (React.createElement(React.Fragment, null,
            inputElement,
            !readOnly
                &&
                    React.createElement(semantic_ui_react_1.Transition, { unmountOnHide: true, mountOnShow: true, visible: !popupIsClosed, animation: animation, duration: duration, onComplete: function () {
                            if (popupIsClosed) {
                                _this.unsetScrollListener();
                                // TODO: for some reason sometimes transition component
                                // doesn't hide even though `popupIsClosed === true`
                                // To hide it we need to rerender component
                                _this.forceUpdate();
                            }
                            else {
                                _this.setScrollListener();
                            }
                        } },
                        React.createElement(semantic_ui_react_1.Popup, { position: popupPosition, open: true, hoverable: closeOnMouseLeave, flowing: true, style: popupStyle, context: this.inputNode, on: 'hover', mountNode: mountNode },
                            React.createElement("div", { onBlur: this.onBlur, onMouseLeave: this.onMouseLeave, onMouseEnter: this.onMouseEnter, style: { outline: 'none' }, tabIndex: 0, ref: function (ref) { return _this.popupNode = ref; } }, renderPicker())))));
    };
    InputView.prototype.setScrollListener = function () {
        window.addEventListener('scroll', this.scrollListener);
    };
    InputView.prototype.unsetScrollListener = function () {
        window.removeEventListener('scroll', this.scrollListener);
    };
    InputView.defaultProps = {
        inline: false,
        closeOnMouseLeave: true,
        tabIndex: '0',
        clearable: false,
        clearIcon: 'remove',
        animation: 'scale',
        duration: 200,
        iconPosition: 'right',
    };
    return InputView;
}(React.Component));
exports.default = InputView;
