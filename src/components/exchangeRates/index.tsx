import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled, {StyledComponent} from 'astroturf';

import {fetchQuotes, setFavorite, ModifiedAsset} from 'actions/quotes';
import {QuotesStore} from 'reducers/quotes';
import {GridContent, WrapError, WrapHeader, CellHead, Cell} from 'components/tabs/styles';
import {Loader} from 'components/loader';
import {EXCHANGE_RATES_COLUMNS} from 'constants/exchangeRates';
import Star from 'static/star.svg';

const Wrap = styled('div')`
    background: var(--color-white);
    padding-bottom: 33px;
    border-radius: 0 20px 20px 20px;
`;

const GridHead = styled(WrapHeader)`
    display: grid;
    grid-template-columns: 100px 1fr 1fr 1fr;
`;

const Content = styled(GridContent)`
    grid-template-columns: 100px 1fr 1fr 1fr;
    padding-top: 33px;
`;

const WrapStar: StyledComponent<'div', {isActive: boolean}> = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -15px;
    border-bottom: 1px solid var(--color-mercury);
    cursor: pointer;

    &.isActive {
        svg {
            fill: var(--color-jacksons-purple);
        }
    }
`;

/**
 * Component ExchangeRates from content in tab
 *
 * @returns {React.ReactElement} - element
 */
export const ExchangeRates = React.memo(
    (): React.ReactElement => {
        const {assets, error, isLoading} = useSelector(({quotes}: {quotes: QuotesStore}) => quotes);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(fetchQuotes());
        }, []);

        /**
         * Set favorite asset
         *
         * @param {ModifiedAsset} item - asset
         */
        const onClick = (item: ModifiedAsset) => {
            dispatch(setFavorite(item));
        };

        return (
            <Wrap>
                <GridHead>
                    <CellHead />
                    {EXCHANGE_RATES_COLUMNS.map((item) => (
                        <CellHead key={item}>{item}</CellHead>
                    ))}
                </GridHead>
                {isLoading ? (
                    <Loader />
                ) : (
                    <React.Fragment>
                        {error ? (
                            <WrapError>Что-то пошло не так</WrapError>
                        ) : (
                            <Content>
                                {assets.map((item: ModifiedAsset) => (
                                    <React.Fragment key={item.asset}>
                                        <WrapStar isActive={item.isFavorite}>
                                            <div
                                                onClick={() => {
                                                    onClick(item);
                                                }}
                                            >
                                                <Star />
                                            </div>
                                        </WrapStar>
                                        <Cell>{item.asset}</Cell>
                                        <Cell>{item.quote}</Cell>
                                        <Cell>{item.startDate}</Cell>
                                    </React.Fragment>
                                ))}
                            </Content>
                        )}
                    </React.Fragment>
                )}
            </Wrap>
        );
    },
);
