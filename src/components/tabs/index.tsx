import React, {useState} from 'react';
import styled, {StyledComponent} from 'astroturf';

import {ExchangeRates} from 'components/exchangeRates';
import {Converter} from 'components/converter';
import {History} from 'components/history';
import {LIST_TABS} from 'constants/tabs';

const Wrap: StyledComponent<'div', {isBigTable: boolean}> = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
    max-width: 750px;

    &.isBigTable {
        max-width: 1000px;
    }
`;

const InnerWrap = styled('div')`
    flex: 1 1 auto;
`;

const ListTabs = styled('div')`
    display: flex;
`;

const Tab: StyledComponent<'div', {isActive: boolean}> = styled('div')`
    flex: 0 0 180px;
    height: 40px;
    padding: 9px 0;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: var(--color-jacksons-purple);
    border: 1px solid var(--color-jacksons-purple);
    border-width: 1px 1px 0 1px;
    background: var(--color-white);
    cursor: pointer;

    &.isActive {
        color: var(--color-white);
        background: var(--color-jacksons-purple);
    }

    &:first-child {
        border-radius: 20px 0 0 0;
    }

    &:last-child {
        border-width: 1px 1px 0 0;
        border-radius: 0 20px 0 0;
    }
`;

const CONTENT = {
    1: <ExchangeRates />,
    2: <Converter />,
    3: <History />,
};

/**
 * Component Tabs
 *
 * @returns {React.ReactElement} - element
 */
export const Tabs = React.memo(
    (): React.ReactElement => {
        const [activeTab, setTab] = useState(LIST_TABS[0].id);

        /**
         * Change active tab
         * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event - event by click
         */
        const changeTab = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
            const target = event.target as HTMLDivElement;
            setTab(Number(target.dataset.id));
        };

        return (
            <Wrap isBigTable={activeTab === 3}>
                <InnerWrap>
                    <ListTabs>
                        {LIST_TABS.map((item) => (
                            <Tab
                                key={item.id}
                                isActive={activeTab === item.id}
                                onClick={changeTab}
                                data-id={item.id}
                            >
                                {item.name}
                            </Tab>
                        ))}
                    </ListTabs>
                    {CONTENT[activeTab]}
                </InnerWrap>
            </Wrap>
        );
    },
);

Tabs.displayName = 'Tabs';
