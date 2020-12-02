import {createStore, applyMiddleware, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createPromise} from 'redux-promise-middleware';
import createSagaMiddleware, {Task} from 'redux-saga';
import {createWrapper} from 'next-redux-wrapper';

import {rootReducers} from 'reducers';
import rootSaga from 'sagas';

export interface SagaStore extends Store {
    sagaTask?: Task;
}

const initialState = {};

const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [
        createPromise({
            // Custom configuration
            promiseTypeDelimiter: '_',
        }),
        sagaMiddleware,
    ];

    const store = createStore(
        rootReducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware)),
    );

    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

export const wrapper = createWrapper(makeStore, {debug: true});
