import {HistoryActionsType, IDeal} from 'actions/history';
import {HISTORY} from 'constants/actions/history';
import {ActionType} from 'redux-promise-middleware';

export interface HistoryStore {
    isLoading: boolean;
    deals: IDeal[];
    error: string;
}

const initialState: HistoryStore = {
    isLoading: false,
    deals: [],
    error: '',
};

/**
 * Reducer for history
 *
 * @param {HistoryStore} state - current state
 * @param {HistoryActionsType} action - actions
 */
export const history = (
    state: HistoryStore = initialState,
    action: HistoryActionsType,
): HistoryStore => {
    switch (action.type) {
        case `${HISTORY.FETCH}_${ActionType.Pending}`:
            return {
                ...state,
                isLoading: true,
            };
        case HISTORY.SET_DEALS:
            return {
                ...state,
                deals: action.payload as IDeal[],
                isLoading: false,
            };
        case HISTORY.SET_ERROR:
            return {
                ...state,
                error: action.payload as string,
                isLoading: false,
            };
        default:
            return state;
    }
};
