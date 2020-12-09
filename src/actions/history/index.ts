import request, {AxiosPromise, AxiosResponse} from 'axios';

import {HISTORY} from 'constants/actions/history';

export interface IDeal {
    asset: string;
    startDate: Date;
    startQuote: string;
    finishDate: Date;
    finishQuote: string;
    profit: string;
}

export interface FormatedSortedDeal {
    asset: string;
    startDate: string;
    startQuote: string;
    finishDate: string;
    finishQuote: string;
    profit: number;
}

export interface FetchHistoryResponse {
    type: typeof HISTORY.FETCH;
    payload: AxiosResponse<{
        result: string;
        deals: IDeal[];
        error?: string;
    }>;
}

export interface FetchHistoryPromise {
    type: typeof HISTORY.FETCH;
    payload: AxiosPromise<{
        result: string;
        deals: IDeal[];
        error?: string;
    }>;
}

export interface SetDealsResponse {
    type: typeof HISTORY.SET_DEALS;
    payload: IDeal[];
}

export interface SetErrorResponse {
    type: typeof HISTORY.SET_ERROR;
    payload: string;
}

export type HistoryActionsType =
    | FetchHistoryPromise
    | SetErrorResponse
    | SetDealsResponse
    | SetDealsResponse;

/**
 * Fetch history deals
 *
 * @returns {FetchHistoryPromise} promise
 */
export const fetchHistory = (): FetchHistoryPromise => {
    return {
        type: HISTORY.FETCH,
        payload: request({
            method: 'POST',
            url: `api.php`,
            data: {
                action: 'history',
            },
        }),
    };
};

/**
 * Set deals
 *
 * @param {IDeal[]} deals - array of deals
 * @returns {SetDealsResponse} - response
 */
export const setDeals = (deals: IDeal[]): SetDealsResponse => ({
    type: HISTORY.SET_DEALS,
    payload: deals,
});

/**
 * Set error
 *
 * @param {string} error - error as string
 * @returns {SetErrorResponse} - response
 */
export const setError = (error: string): SetErrorResponse => ({
    type: HISTORY.SET_ERROR,
    payload: error,
});
