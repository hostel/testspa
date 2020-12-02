import {AUTH} from 'constants/actions/auth';
import request, {AxiosPromise, AxiosResponse} from 'axios';

export interface SendAuthParams {
    login: string;
    password: string;
}

export interface SendAuthPromise {
    type: typeof AUTH.SEND;
    payload: AxiosPromise<{
        result: string;
        error?: string;
    }>;
}

export interface SendAuthResponse {
    type: typeof AUTH.SEND;
    payload: AxiosResponse<{
        result: string;
        error?: string;
    }>;
}

export interface SetLoggedResponse {
    type: typeof AUTH.SET_LOGGED;
    payload: boolean;
}

export interface SetErrorResponse {
    type: typeof AUTH.SET_ERROR;
    payload: string;
}

export type AuthTypeActions = SetErrorResponse | SetLoggedResponse | SendAuthPromise;

/**
 * Send data to auth user
 *
 * @param {SendAuthParams} data - User data
 * @returns {SendAuthPromise} promise
 */
export const sendAuth = (data: SendAuthParams): SendAuthPromise => {
    return {
        type: AUTH.SEND,
        payload: request({
            method: 'POST',
            url: `http://130.211.109.15/api.php`,
            data: {
                action: 'login',
                ...data,
            },
        }),
    };
};

/**
 * Set logged status
 *
 * @param {boolean} isLogged - login status
 * @returns {SendAuthResponse} response
 */
export const setLogged = (isLogged: boolean): SetLoggedResponse => ({
    type: AUTH.SET_LOGGED,
    payload: isLogged,
});

/**
 * Set error
 *
 * @param {string} error - error
 * @returns {SendAuthResponse} response
 */
export const setError = (error: string): SetErrorResponse => ({
    type: AUTH.SET_ERROR,
    payload: error,
});
