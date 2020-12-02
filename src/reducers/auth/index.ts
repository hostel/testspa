import {HYDRATE} from 'next-redux-wrapper';
import {ActionType} from 'redux-promise-middleware';

import {AuthTypeActions} from 'actions/auth';
import {AUTH} from 'constants/actions/auth';

interface AuthStore {
    isLoading: boolean;
    isLogged: boolean;
    error: string;
}

const initialState: AuthStore = {
    isLoading: false,
    isLogged: false,
    error: '',
};

/**
 * Reducers fro auth
 *
 * @param {AuthStore} state - current store
 * @param {AuthTypeActions} action - actions
 */
export const auth = (state: AuthStore = initialState, action: AuthTypeActions): AuthStore => {
    switch (action.type) {
        case HYDRATE:
            const {auth} = action.payload as any;
            return {
                ...state,
                ...(auth || {}),
            };
        case `${AUTH.SEND}_${ActionType.Pending}`:
            return {
                ...state,
                isLoading: true,
            };
        case AUTH.SET_LOGGED:
            return {
                ...state,
                isLogged: action.payload as boolean,
                isLoading: false,
            };
        case AUTH.SET_ERROR:
            return {
                ...state,
                error: action.payload as string,
            };
        default:
            return state;
    }
};
