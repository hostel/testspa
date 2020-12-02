import React, {useRef, useState} from 'react';
import styled, {css, StyledComponent} from 'astroturf';
import classnames from 'classnames';

import ArrowDropdown from 'static/dropdownArrow.svg';
import {useOnClickOutside} from './hooks';

interface Props {
    value: string;
    children: React.ReactNode;
    onChange: (value: string) => void;
}

const Wrap = styled('div')`
    position: relative;
`;

const WrapValue = styled('span')`
    margin-right: 6px;
`;

const WrapArrow: StyledComponent<'div', {isOpen: boolean}> = styled('div')`
    &.isOpen {
        transform: scale(-1, -1);
        margin-top: 6px;
    }
`;

const s = css`
    .field {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 9px 10px;
        height: 40px;
        font-size: 16px;
        line-height: 22px;
        color: var(--color-black);
        border-radius: 5px;
        background: var(--color-white);
        border: 1px solid var(--color-jacksons-purple);

        &.open {
            border-radius: 5px 5px 0 0;
        }
    }

    .list {
        position: absolute;
        width: 100%;
        display: none;
        background: var(--color-white);
        border-radius: 0 0 5px 5px;
        border-left: 1px solid var(--color-jacksons-purple);
        border-right: 1px solid var(--color-jacksons-purple);
        border-bottom: 1px solid var(--color-jacksons-purple);

        &.open {
            display: block;
        }
    }
`;

/**
 * Main component for dropdown
 *
 * @param {Props} props - props component
 * @returns {React.ReactElement}  - element
 */
export const Dropdown = ({value, children, onChange}: Props): React.ReactElement => {
    const list = useRef(null);
    const [visibility, setVisibility] = useState(false);
    useOnClickOutside(list, () => setVisibility(false));

    const listItems = React.Children.map(children, (item: React.ReactElement) => {
        return React.cloneElement(item, {
            onClick: () => {
                onChange(item.props.value);
                setVisibility(false);
            },
        });
    });

    /**
     * Method for show dropdown and add event listener
     */
    const onShow = (): void => {
        setVisibility(true);
    };

    return (
        <Wrap>
            <div className={classnames(s.field, {[s.open]: visibility})} onClick={onShow}>
                <WrapValue>{value}</WrapValue>
                <WrapArrow isOpen={visibility}>
                    <ArrowDropdown />
                </WrapArrow>
            </div>
            <div ref={list} className={classnames(s.list, {[s.open]: visibility})}>
                {listItems}
            </div>
        </Wrap>
    );
};
