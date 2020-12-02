import React from 'react';
import styled, {StyledComponent} from 'astroturf';

const Wrap: StyledComponent<'div', {isDisabled: boolean}> = styled('div')`
    height: 28px;
    padding: 4px 10px;
    font-size: 16px;
    line-height: 22px;
    color: var(--color-black);
    cursor: pointer;

    &:hover {
        background: rgba(var(--color-jacksons-purple), 0.2);
    }

    &.isDisabled {
        cursor: not-allowed;
        background: var(--color-white);
        color: rgba(var(--color-black), 0.5);
        pointer-events: none;
    }
`;

interface Props {
    children: React.ReactNode;
    value: React.ReactText;
    isDisabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

/**
 * Component Option for dropdown
 *
 * @param {Props} - props component
 * @returns {React.ReactElement} - element
 */
export const Option = ({children, onClick, isDisabled = false}: Props): React.ReactElement => (
    <Wrap onClick={onClick} isDisabled={isDisabled}>
        {children}
    </Wrap>
);
