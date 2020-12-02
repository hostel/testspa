import {SagaIterator} from 'redux-saga';
import {put, takeEvery, call} from 'redux-saga/effects';
import {ActionType} from 'redux-promise-middleware';

import {setError, setDeals, FetchHistoryResponse} from 'actions/history';
import {HISTORY} from 'constants/actions/history';
import {getSortedDeals} from './utils';

/**
 * Saga for set error or set upgrade deals
 *
 * @param {FetchHistoryResponse} response - response action
 */
function* setUpgradeDeals({payload}: FetchHistoryResponse): SagaIterator {
    const {data} = payload;

    if (data.result === 'error') {
        const setErrorAction = yield call(setError, data.error);
        yield put(setErrorAction);
    } else {
        const deals = yield call(getSortedDeals, data.deals);
        const setDealsAction = yield call(setDeals, deals);
        yield put(setDealsAction);
    }
}

/**
 * Root Deals Saga
 */
export default function* dealsSaga(): SagaIterator {
    yield takeEvery(`${HISTORY.FETCH}_${ActionType.Fulfilled}`, setUpgradeDeals);
}
