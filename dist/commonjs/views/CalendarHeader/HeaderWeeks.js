"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
var React = __importStar(require("react"));
var semantic_ui_react_1 = require("semantic-ui-react");
var localeData_1 = __importDefault(require("dayjs/plugin/localeData"));
var isoWeek_1 = __importDefault(require("dayjs/plugin/isoWeek"));
dayjs_1.default.extend(localeData_1.default); // Extend with localeData for weekday names
dayjs_1.default.extend(isoWeek_1.default); // Extend with isoWeek for consistent week start
var getWeekDays = function (d, localization) {
    var weekDays = [];
    var day = localization
        ? d().locale(localization).startOf('week')
        : d().startOf('week');
    for (var i = 0; i < 7; i++) {
        weekDays[i] = day.add(i, 'day').format('dd'); // Short weekday names
    }
    return weekDays;
};
var cellStyle = {
    border: 'none',
    borderBottom: '1px solid rgba(34,36,38,.1)',
};
var getWeekDayCells = function (m, localization) { return getWeekDays(m, localization).map(function (weekDay) { return (React.createElement(semantic_ui_react_1.Table.HeaderCell, { key: weekDay, style: cellStyle, colSpan: '1' }, weekDay)); }); };
function HeaderWeeks(props) {
    var localization = props.localization;
    return (React.createElement(semantic_ui_react_1.Table.Row, null, getWeekDayCells(dayjs_1.default, localization)));
}
exports.default = HeaderWeeks;
