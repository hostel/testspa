import {createSelector} from 'reselect';

import {IDeal} from 'actions/history';
import {HistoryStore} from 'reducers/history';
import {sortingDeals} from './utils';

/**
 * Get deals
 *
 * @param {any} store - all store
 * @returns {HistoryStore} deals store
 *
 */
export const getHistory = (store: any): HistoryStore => store.history;

/**
 * Get sorted deals from history
 *
 * @param {HistoryStore} deals - history store
 * @returns {IDeal[]} deals
 *
 */
export const getSortedDeals = createSelector(getHistory, ({deals}: HistoryStore): IDeal[] => {
    const sortedArraysWithDeals = sortingDeals(deals);
    return sortedArraysWithDeals.reduce((acc, array) => {
        return [...acc, ...array];
    }, []);
});
