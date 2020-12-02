import {IDeal, FormatedSortedDeal} from 'actions/history';

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
export const getSortedDeals = (deals: IDeal[]): FormatedSortedDeal[] => {
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

    let arr = [];

    const sortingDeals = (deals: FormatedSortedDeal[]) => {
        const result = [];
        const others = [];
        const counters = {
            negativeProfit: 0,
            profitMore100: 0,
            assets: {},
            lengthArr: 0,
        };

        for (let deal of deals) {
            if (!counters.assets[deal.asset]) {
                counters.assets[deal.asset] = 0;
            }

            if (counters.assets[deal.asset] < 2 && counters.lengthArr < 10) {
                if (deal.profit < 0 && counters.negativeProfit < 2) {
                    result.push(deal);
                    counters.negativeProfit++;
                    counters.assets[deal.asset]++;
                    counters.lengthArr++;
                }

                if (deal.profit > 100 && counters.profitMore100 < 2) {
                    result.push(deal);
                    counters.profitMore100++;
                    counters.assets[deal.asset]++;
                    counters.lengthArr++;
                }

                if (deal.profit > 0 && deal.profit < 100) {
                    result.push(deal);
                    counters.assets[deal.asset]++;
                    counters.lengthArr++;
                }
            }

            if (counters.lengthArr >= 10) {
                others.push(deal);
                counters.lengthArr++;
            }
        }

        if (result.length && result.length === 10) arr = [...arr, ...result];

        if (others.length !== deals.length) {
            sortingDeals(others);
        }
    };

    sortingDeals(dealsWithFormatedDates);

    return arr;
};
