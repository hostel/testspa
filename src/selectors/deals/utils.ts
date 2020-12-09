import {IDeal, FormatedSortedDeal} from 'actions/history';

const MAX_ITEMS_LIST = 10;
const MAX_ASSET_PER_LIST = 2;
const MAX_NEGATIVE_PROFIT = 2;
const MAX_PROFIT_MORE_100 = 2;

/**
 * Get formated date for deal
 *
 * @param {string} date - some date from deal
 * @returns {string} - formated deal
 */
const getFormatedDate = (date: Date): string => {
    const d = new Date(date);

    const time = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    }).format(d);
    const year = new Intl.DateTimeFormat('en-US', {year: '2-digit'}).format(d);
    const month = new Intl.DateTimeFormat('en-US', {month: '2-digit'}).format(d);
    const day = new Intl.DateTimeFormat('en-US', {day: 'numeric'}).format(d);

    return `${time} ${day}.${month}.${year}`;
};

/**
 * Get sorted deals
 *
 * @param {IDeal[]} deals - array of deals
 * @returns {FormatedSortedDeal[]} - sorted deals
 */
export const sortingDeals = (deals: IDeal[]): FormatedSortedDeal[] => {
    const counters = {
        negativeProfit: 0,
        profitMore100: 0,
        assets: {},
        lengthArr: 0,
    };

    const sortedDealsByFinishDate = deals.sort((a, b) => {
        const aDate: any = new Date(a.finishDate);
        const bDate: any = new Date(b.finishDate);

        return bDate - aDate;
    });

    const dealsWithFormatedDates: FormatedSortedDeal[] = sortedDealsByFinishDate.map((item) => ({
        ...item,
        startDate: getFormatedDate(item.startDate),
        finishDate: getFormatedDate(item.finishDate),
        profit: Number(item.profit),
    }));

    const result = dealsWithFormatedDates.reduce(
        (acc, deal) => {
            const currentTen = acc.length === 0 ? acc[0] : acc[acc.length - 1];

            if (!counters.assets[deal.asset]) {
                counters.assets[deal.asset] = 0;
            }

            if (
                counters.assets[deal.asset] < MAX_ASSET_PER_LIST &&
                counters.lengthArr < MAX_ITEMS_LIST
            ) {
                if (deal.profit < 0 && counters.negativeProfit < MAX_NEGATIVE_PROFIT) {
                    currentTen.push(deal);
                    counters.assets[deal.asset]++;
                    counters.negativeProfit++;
                    counters.lengthArr++;
                }

                if (deal.profit > 100 && counters.profitMore100 < MAX_PROFIT_MORE_100) {
                    currentTen.push(deal);
                    counters.assets[deal.asset]++;
                    counters.profitMore100++;
                    counters.lengthArr++;
                }

                if (deal.profit > 0 && deal.profit < 100) {
                    currentTen.push(deal);
                    counters.assets[deal.asset]++;
                    counters.lengthArr++;
                }
            }

            if (currentTen.length === MAX_ITEMS_LIST) {
                counters.assets = {};
                counters.negativeProfit = 0;
                counters.profitMore100 = 0;
                counters.lengthArr = 0;

                return [...acc, []];
            }

            return acc;
        },
        [[]],
    );

    if (result.length > 0 && result[result.length - 1].length < 10) {
        result.pop();
    } else {
        return [];
    }

    return result;
};
