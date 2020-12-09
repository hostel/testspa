import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'astroturf';

import {fetchHistory, FormatedSortedDeal} from 'actions/history';
import {HistoryStore} from 'reducers/history';
import {WrapHeader, WrapError, GridContent, CellHead, Cell} from 'components/tabs/styles';
import {Loader} from 'components/loader';
import {HISTORY_COLUMNS} from 'constants/history';
import {Pagination} from 'components/pagination';
import {usePagination} from 'components/pagination/hooks';
import {getSortedDeals} from 'selectors/deals';

const Wrap = styled('div')`
    background: var(--color-white);
    border-radius: 0 20px 20px 20px;
`;

const GridHead = styled(WrapHeader)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
`;

const HeadItem = styled(CellHead)`
    padding-left: 30px;
`;

const ContentItem = styled(Cell)`
    padding-left: 30px;
`;

const Content = styled(GridContent)`
    grid-template-columns: repeat(6, 1fr);
    padding-top: 10px;
`;

/**
 * Component for render list of deals
 *
 * @param {React.ReactElement} - element
 */
export const History = (): React.ReactElement => {
    const {deals, isLoading, error} = useSelector((state) => ({
        deals: getSortedDeals(state),
        isLoading: state.history.isLoading,
        error: state.history.error,
    }));
    const dispatch = useDispatch();
    const {next, prev, jump, currentData, currentPage, maxPage} = usePagination(deals, 10);

    useEffect(() => {
        dispatch(fetchHistory());
    }, []);

    return (
        <Wrap>
            <GridHead>
                {HISTORY_COLUMNS.map((item, index) => (
                    <HeadItem key={`${item}_${index}`}>{item}</HeadItem>
                ))}
            </GridHead>
            {isLoading ? (
                <Loader />
            ) : (
                <React.Fragment>
                    {error ? (
                        <WrapError>Что-то пошло не так</WrapError>
                    ) : (
                        <React.Fragment>
                            <Content>
                                {currentData.map((item: FormatedSortedDeal) => (
                                    <React.Fragment key={`${item.asset}_${item.finishDate}`}>
                                        <ContentItem>{item.asset}</ContentItem>
                                        <ContentItem>{item.startDate}</ContentItem>
                                        <ContentItem>{item.startQuote}</ContentItem>
                                        <ContentItem>{item.finishDate}</ContentItem>
                                        <ContentItem>{item.finishQuote}</ContentItem>
                                        <ContentItem>{item.profit}</ContentItem>
                                    </React.Fragment>
                                ))}
                            </Content>
                            <Pagination
                                next={next}
                                prev={prev}
                                jump={jump}
                                maxPage={maxPage}
                                currentPage={currentPage}
                            />
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </Wrap>
    );
};
