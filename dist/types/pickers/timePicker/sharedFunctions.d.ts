import { Dayjs } from 'dayjs';
import { TimeFormat } from '../BasePicker';
export declare function buildTimeStringWithSuffix(hour: string, minute: string, timeFormat: TimeFormat): string;
export declare function isNextPageAvailable(date: Dayjs, maxDate: Dayjs): boolean;
export declare function isPrevPageAvailable(date: Dayjs, minDate: Dayjs): boolean;
export declare function getCurrentDate(date: Dayjs): string;
