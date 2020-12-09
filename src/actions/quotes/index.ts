import request, {AxiosPromise, AxiosResponse} from 'axios';

import {QUOTES} from 'constants/actions/quotes';

export interface IQuotes {
    asset: string;
    startDate: string;
    quote: string;
}

export interface ModifiedAsset extends IQuotes {
    index: number;
    isFavorite: boolean;
}

export interface FetchQuotesResponse {
    type: typeof QUOTES.FETCH;
    payload: AxiosResponse<{
        result: string;
        assets: IQuotes[];
        error?: string;
    }>;
}

export interface FetchQuotesPromise {
    type: typeof QUOTES.FETCH;
    payload: AxiosPromise<{
        result: string;
        assets: IQuotes[];
        error?: string;
    }>;
}

export interface SetAssetsResponse {
    type: typeof QUOTES.SET_ASSETS;
    payload: ModifiedAsset[];
}

export interface SetErrorResponse {
    type: typeof QUOTES.SET_ERROR;
    payload: string;
}

export interface SetFavoriteResponse {
    type: typeof QUOTES.SET_FAVORITE;
    payload: ModifiedAsset;
}

export type QuotesActionsType = SetAssetsResponse | SetErrorResponse | FetchQuotesPromise;

/**
 * Fetch quotes
 *
 * @returns {FetchQuotesPromise} response
 */
export const fetchQuotes = (): FetchQuotesPromise => {
    return {
        type: QUOTES.FETCH,
        payload: request({
            method: 'POST',
            url: `api.php`,
            data: {
                action: 'quote',
            },
        }),
    };
};

/**
 * Set assets
 *
 * @param {ModifiedAssets[]} assets - modified assets
 * @returns {SetAssetsResponse} - response
 */
export const setAssets = (assets: ModifiedAsset[]): SetAssetsResponse => ({
    type: QUOTES.SET_ASSETS,
    payload: assets,
});

/**
 * Set assets
 *
 * @param {string} error - error
 * @returns {SetErrorResponse} - response
 */
export const setError = (error: string): SetErrorResponse => ({
    type: QUOTES.SET_ERROR,
    payload: error,
});

/**
 * Set favorite
 *
 * @param {ModifiedAsset} error - error
 * @returns {SetErrorResponse} - response
 */
export const setFavorite = (asset: ModifiedAsset): SetFavoriteResponse => ({
    type: QUOTES.SET_FAVORITE,
    payload: asset,
});
