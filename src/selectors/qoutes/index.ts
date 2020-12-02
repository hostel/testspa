import {createSelector} from 'reselect';
import {ModifiedAsset} from 'actions/quotes';
import {QuotesStore} from 'reducers/quotes';

/**
 * Get Quotes
 *
 * @param {any} store - all store
 * @return {QuotesStore} quotes store
 */
const getQuotes = (store: any): QuotesStore => store.quotes;

/**
 * Get assets from quotes
 *
 * @param {QuotesStore} quotes - quotes store
 * @returns {ModifiedAsset[]} assets
 *
 */
export const getAssets = createSelector(
    getQuotes,
    ({assets}: QuotesStore): ModifiedAsset[] => assets,
);

/**
 * Get currency with quote
 *
 * @param {ModifiedAsset[]} assets - array of assets
 * @returns {{[key in string]: string}} - currency and quote
 */
export const getCurrencyWithQuote = createSelector(getAssets, (assets: ModifiedAsset[]) => {
    return assets.reduce((acc, item) => {
        return {
            ...acc,
            [item.asset]: item.quote,
        };
    }, {});
});
