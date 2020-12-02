import {SagaIterator} from 'redux-saga';
import {put, takeEvery, select, call} from 'redux-saga/effects';

import {getCurrencyWithQuote} from 'selectors/qoutes';
import {setTotal, setError, CalculateExchangeResponse} from 'actions/converter';
import {CONVERTER} from 'constants/actions/converter';

/**
 * Util saga for set prepared data
 *
 * @param {number} total - total after converting
 */
export function* setData(total: number): SagaIterator {
    const setTotalAction = yield call(setTotal, total);
    yield put(setTotalAction);
}

/**
 * Saga for prepare data or set error
 *
 * @param {CalculateExchangeResponse} response - response action
 */
export function* prepareDataOrSetError({
    payload: {currencyTwo, currencyOne, value},
}: CalculateExchangeResponse): SagaIterator {
    const currencyWithQuote = yield select(getCurrencyWithQuote);

    const setErrorAction = yield call(setError, '');
    yield put(setErrorAction);

    if (currencyWithQuote[`${currencyOne}/${currencyTwo}`]) {
        const quote = currencyWithQuote[`${currencyOne}/${currencyTwo}`];
        yield call(setData, Math.ceil(Number(value) * Number(quote)));
    } else if (currencyWithQuote[`${currencyTwo}/${currencyOne}`]) {
        const quote = currencyWithQuote[`${currencyTwo}/${currencyOne}`];
        yield call(setData, Math.ceil(Number(value) / Number(quote)));
    } else {
        const setErrorAction = yield call(setError, 'Данной валютной пары нет');
        yield put(setErrorAction);
    }
}

/**
 * Root convert Saga
 */
export default function* converterSaga(): SagaIterator {
    yield takeEvery(CONVERTER.CALCULATE_EXCHANGE, prepareDataOrSetError);
}
