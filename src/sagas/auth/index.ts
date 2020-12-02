import {SagaIterator} from 'redux-saga';
import {put, takeEvery, call} from 'redux-saga/effects';
import {ActionType} from 'redux-promise-middleware';
import Router from 'next/router';

import {setLogged, setError, SendAuthResponse, SetLoggedResponse} from 'actions/auth';
import {AUTH} from 'constants/actions/auth';
import {PSEUDO_TOKEN} from 'constants/auth';

/**
 * Utilty function for set cookie
 *
 * @param {string} cookie - cookie in string
 */
export const setCookie = (cookie: string): void => {
    document.cookie = cookie;
};

/**
 * Called after change logges status
 */
export function* triggerChangeLogged({payload}: SetLoggedResponse): SagaIterator {
    if (!payload) {
        yield call(setCookie, `token=; max-age=0`);
        yield call([Router, 'push'], '/', '/', {shallow: true});
    }
}

/**
 * Set cookie and redirect to profile
 *
 * @param {SendAuthResponse} response - response action
 */
export function* setCookieAfterSuccessAuth({payload}: SendAuthResponse): SagaIterator {
    const {data} = payload;

    if (data.result === 'error') {
        const setErrorAction = yield call(setError, data.error);
        yield put(setErrorAction);
    } else {
        console.log('sasdasd');
        yield call(setCookie, `token=${PSEUDO_TOKEN}`);
        yield call([Router, 'push'], '/main', '/main', {shallow: true});
        const setLoggedAction = yield call(setLogged, true);
        yield put(setLoggedAction);
    }
}

/**
 * Root Auth Saga
 */
export default function* authSaga(): SagaIterator {
    yield takeEvery(`${AUTH.SEND}_${ActionType.Fulfilled}`, setCookieAfterSuccessAuth);
    yield takeEvery(`${AUTH.SET_LOGGED}`, triggerChangeLogged);
}
