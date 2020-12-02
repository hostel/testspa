import {combineReducers} from 'redux';

import {auth} from './auth';
import {quotes} from './quotes';
import {converter} from './converter';
import {history} from './history';

export const rootReducers = combineReducers({
    auth,
    quotes,
    converter,
    history,
});

export type RootState = ReturnType<typeof rootReducers>;
