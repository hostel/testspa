import {ModifiedAsset, IQuotes} from 'actions/quotes';

/**
 * Get formated date
 *
 * @param {string} date - date
 */
const getFormatedDate = (date: string): string => {
    const d = new Date(date);
    const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d);
    const month = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d);
    const day = new Intl.DateTimeFormat('en', {day: 'numeric'}).format(d);

    return `${day}.${month}.${year}`;
};

/**
 * Get collected currency from assets
 *
 * @param {ModifiedAsset[]} assets - array of assets
 * @returns {string[]} - array of currency
 */
export const getCollectedCurrency = (assets: ModifiedAsset[]): string[] => {
    const arrWithCurrency = assets.reduce((acc, item) => {
        const splited = item.asset.split('/');
        acc.push(splited[0]);
        acc.push(splited[1]);
        return acc;
    }, []);

    return [...new Set(arrWithCurrency)];
};

/**
 * Get modified assets
 *
 * @param {IQuotes[]} assets - array of assets
 * @returns {ModifiedAsset[]} - array with modified assets
 */
export const getModifiedAssets = (assets: IQuotes[]): ModifiedAsset[] => {
    return assets.map((item, index) => ({
        ...item,
        isFavorite: false,
        index,
        startDate: getFormatedDate(item.startDate),
    }));
};

/**
 * Utility function for sorting assets
 *
 * @param {ModifiedAsset[]} assets - array of assets
 * @param {ModifiedAsset} asset - clicked asset
 * @return {ModifiedAsset[]} - updated array with assets
 */
export const changeIsFavoriteStatus = (
    assets: ModifiedAsset[],
    asset: ModifiedAsset,
): ModifiedAsset[] => {
    if (asset.isFavorite) {
        const favoriteAssets = assets.filter(
            (item) => item.isFavorite && item.index !== asset.index,
        );
        const NotFavoriteAssets = assets.filter(
            (item) => !item.isFavorite && item.index !== asset.index,
        );
        const sortedAssets = [...NotFavoriteAssets, {...asset, isFavorite: false}].sort(
            (a, b) => a.index - b.index,
        );
        return [...favoriteAssets, ...sortedAssets];
    }

    const newArrayWithAssets = assets.filter((item) => item.index !== asset.index);
    newArrayWithAssets.unshift({...asset, isFavorite: true});

    return newArrayWithAssets;
};
