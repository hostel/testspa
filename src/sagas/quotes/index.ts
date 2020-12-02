import {SagaIterator} from 'redux-saga';

import {put, takeEvery, select, all, call} from 'redux-saga/effects';
import {ActionType} from 'redux-promise-middleware';

import {setAssets, setError, SetFavoriteResponse, FetchQuotesResponse} from 'actions/quotes';
import {setListCurrency} from 'actions/converter';
import {getAssets} from 'selectors/qoutes';
import {QUOTES} from 'constants/actions/quotes';
import {getCollectedCurrency, getModifiedAssets, changeIsFavoriteStatus} from './utils';

/**
 * Saga for set new assets
 *
 * @param {SetFavoriteResponse} response - response action
 */
function* changeAsset({payload}: SetFavoriteResponse): SagaIterator {
    const assets = yield select(getAssets);
    const newAssets = yield call(changeIsFavoriteStatus, assets, payload);

    const setAssetsAction = yield call(setAssets, newAssets);
    yield put(setAssetsAction);
}

/**
 * Saga for set error or set currency and modified assets
 *
 * @param {FetchQuotesResponse} response - response action
 */
function* setDataQuote({payload}: FetchQuotesResponse): SagaIterator {
    const {data} = payload;

    if (data.result === 'error') {
        const setErrorAction = yield call(setError, data.error);
        yield put(setErrorAction);
    } else {
        const modifiedAssets = yield call(getModifiedAssets, data.assets);
        const currency = yield call(getCollectedCurrency, modifiedAssets);
        const setCurrencyAction = yield call(setListCurrency, currency);
        const setAssetsAction = yield call(setAssets, modifiedAssets);
        yield all([put(setCurrencyAction), put(setAssetsAction)]);
    }
}

/**
 * Root Quote Saga
 */
export default function* quotesSaga(): SagaIterator {
    yield takeEvery(`${QUOTES.FETCH}_${ActionType.Fulfilled}`, setDataQuote);
    yield takeEvery(`${QUOTES.SET_FAVORITE}`, changeAsset);
}
