import dayjs, { Dayjs } from 'dayjs';
export declare const TIME_FORMAT: {
    24: string;
    AMPM: string;
    ampm: string;
};
type ParseValueData = string | Dayjs | Date;
/** Parse string, moment, Date.
 *
 * Return unedfined on invalid input.
 */
export declare function parseValue(value: ParseValueData, dateFormat: string, localization: string): Dayjs | undefined;
type ParseArrayOrValueData = ParseValueData | ParseValueData[];
/** Parse string, moment, Date, string[], moment[], Date[].
 *
 * Return array of moments. Returned value contains only valid moments.
 * Return undefined if none of the input values are valid.
 */
export declare function parseArrayOrValue(data: ParseArrayOrValueData, dateFormat: string, localization: string): dayjs.Dayjs[];
interface DateParams {
    year?: number;
    month?: number;
    date?: number;
    hour?: number;
    minute?: number;
}
interface GetInitializerParams {
    dateParams?: DateParams;
    initialDate?: ParseValueData;
    dateFormat?: string;
    localization?: string;
}
/** Create moment.
 *
 * Creates moment using `dateParams` or `initialDate` arguments (if provided).
 * Precedense order: dateParams -> initialDate -> default value
 */
export declare function getInitializer(context: GetInitializerParams): Dayjs;
type InitialDate = string | Dayjs | Date;
type DateValue = InitialDate;
/** Creates moment instance from provided value or initialDate.
 *  Creates today by default.
 */
export declare function buildValue(value: ParseValueData, initialDate: InitialDate, localization: string, dateFormat: string, defaultVal?: dayjs.Dayjs): Dayjs;
export declare function dateValueToString(value: DateValue, dateFormat: string, locale: string): string;
interface Range {
    start?: Dayjs;
    end?: Dayjs;
}
/**
 * Extract start and end dates from input string.
 * Return { start: Moment|undefined, end: Moment|undefined }
 * @param {string} inputString Row input string from user
 * @param {string} dateFormat Moment formatting string
 * @param {string} inputSeparator Separator for split inputString
 */
export declare function parseDatesRange(inputString?: string, dateFormat?: string, inputSeparator?: string): Range;
export {};
