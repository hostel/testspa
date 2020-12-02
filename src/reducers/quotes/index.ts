import {QuotesActionsType, ModifiedAsset} from 'actions/quotes';
import {QUOTES} from 'constants/actions/quotes';
import {ActionType} from 'redux-promise-middleware';

export interface QuotesStore {
    isLoading: boolean;
    assets: ModifiedAsset[];
    error: string;
}

const initialState: QuotesStore = {
    isLoading: false,
    assets: [],
    error: '',
};

/**
 * Reducer for Quotes
 *
 * @param {QuotesStore} state - current state
 * @param {QuotesActionsType} action - actions
 */
export const quotes = (
    state: QuotesStore = initialState,
    action: QuotesActionsType,
): QuotesStore => {
    switch (action.type) {
        case `${QUOTES.FETCH}_${ActionType.Pending}`:
            return {
                ...state,
                isLoading: true,
            };
        case QUOTES.SET_ASSETS:
            return {
                ...state,
                assets: action.payload as ModifiedAsset[],
                isLoading: false,
            };
        case QUOTES.SET_ERROR:
            return {
                ...state,
                error: action.payload as string,
                isLoading: false,
            };
        default:
            return state;
    }
};
