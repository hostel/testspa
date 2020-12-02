import {ConverterTypeActions} from 'actions/converter';
import {CONVERTER} from 'constants/actions/converter';

interface ConverterStore {
    currency: string[];
    total: number;
    error: string;
}

const initialState: ConverterStore = {
    currency: [],
    total: 0,
    error: '',
};

/**
 * Reducer for converter
 *
 * @param {ConverterStore} state - current state
 * @param {ConverterTypeActions} action - actions
 */
export const converter = (state: ConverterStore = initialState, action: ConverterTypeActions) => {
    switch (action.type) {
        case CONVERTER.SET_LIST_CURRENCY:
            return {
                ...state,
                currency: action.payload,
            };
        case CONVERTER.SET_TOTAL:
            return {
                ...state,
                total: action.payload,
            };
        case CONVERTER.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
