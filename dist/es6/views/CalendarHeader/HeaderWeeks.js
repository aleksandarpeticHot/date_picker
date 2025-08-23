import dayjs from 'dayjs';
import * as React from 'react';
import { Table } from 'semantic-ui-react';
import localeData from 'dayjs/plugin/localeData';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(localeData); // Extend with localeData for weekday names
dayjs.extend(isoWeek); // Extend with isoWeek for consistent week start
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
var getWeekDayCells = function (m, localization) { return getWeekDays(m, localization).map(function (weekDay) { return (React.createElement(Table.HeaderCell, { key: weekDay, style: cellStyle, colSpan: '1' }, weekDay)); }); };
function HeaderWeeks(props) {
    var localization = props.localization;
    return (React.createElement(Table.Row, null, getWeekDayCells(dayjs, localization)));
}
export default HeaderWeeks;
