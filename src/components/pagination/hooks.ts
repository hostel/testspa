import {useState} from 'react';
import {FormatedSortedDeal} from 'actions/history';

interface ReturnedData {
    maxPage: number;
    next: () => void;
    prev: () => void;
    jump: (page: number) => void;
    currentPage: number;
    currentData: FormatedSortedDeal[];
}

/**
 * Hook for pagaination
 *
 * @param {FormatedSortedDeal[]} data - array of deals
 * @param {number} itemsPerPage - count items per page
 * @returns
 */
export const usePagination = (data: FormatedSortedDeal[], itemsPerPage: number): ReturnedData => {
    const [currentPage, setCurrentPage] = useState(1);

    const maxPage = Math.ceil(data.length / itemsPerPage);

    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    const currentData = data.slice(begin, end);

    /**
     * Change page on next page
     */
    const next = (): void => {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    };

    /**
     * Change page on prev page
     */
    const prev = (): void => {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    };

    /**
     * Change page on page num
     *
     * @param {number} page - num page
     */
    const jump = (page: number): void => {
        const pageNumber = Math.max(1, page);
        setCurrentPage(() => Math.min(pageNumber, maxPage));
    };

    return {next, prev, jump, currentData, currentPage, maxPage};
};
