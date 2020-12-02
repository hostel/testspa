import {CONVERTER} from 'constants/actions/converter';

export interface SetListCurrencyResponse {
    type: typeof CONVERTER.SET_LIST_CURRENCY;
    payload: string[];
}

export interface CalculateExchangeParams {
    currencyTwo: string;
    currencyOne: string;
    value: string;
}

export interface CalculateExchangeResponse {
    type: typeof CONVERTER.CALCULATE_EXCHANGE;
    payload: CalculateExchangeParams;
}

export interface SetErrorResponse {
    type: typeof CONVERTER.SET_ERROR;
    payload: string;
}

export interface SetTotalResponse {
    type: typeof CONVERTER.SET_TOTAL;
    payload: number;
}

export type ConverterTypeActions = CalculateExchangeResponse | SetTotalResponse | SetErrorResponse;

/**
 * Set list of currency
 *
 * @param {string[]} - list of currency
 * @returns {SetListCurrencyResponse} - responce
 */
export const setListCurrency = (currency: string[]): SetListCurrencyResponse => ({
    type: CONVERTER.SET_LIST_CURRENCY,
    payload: currency,
});

/**
 * Calcutate exchange
 *
 * @param {CalculateExchangeParams} payload - data from form
 * @returns {CalculateExchangeResponse} response
 */
export const calculateExchange = (payload: CalculateExchangeParams): CalculateExchangeResponse => ({
    type: CONVERTER.CALCULATE_EXCHANGE,
    payload,
});

/**
 * Set total after calculate
 *
 * @param {number} total - total after calculate
 * @returns {SetTotalResponse} response
 */
export const setTotal = (total: number): SetTotalResponse => ({
    type: CONVERTER.SET_TOTAL,
    payload: total,
});

/**
 * Set error for convert form
 *
 * @param {string} error - error
 * @returns {SetErrorResponse} response
 */
export const setError = (error: string): SetErrorResponse => ({
    type: CONVERTER.SET_ERROR,
    payload: error,
});
