import {all} from 'redux-saga/effects';

import authSaga from './auth';
import quotesSaga from './quotes';
import converterSaga from './converter';
import dealsSaga from './history';

/**
 * Root Saga
 */
export default function* rootSaga() {
    yield all([authSaga(), quotesSaga(), converterSaga(), dealsSaga()]);
}
