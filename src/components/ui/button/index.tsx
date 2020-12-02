import React from 'react';
import styled, {StyledComponent} from 'astroturf';

interface Props {
    disabled?: boolean;
    name?: string;
    type?: 'submit' | 'reset' | 'button';
    size?: 'small' | 'big';
    isTransparent?: boolean;
    isDisabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children: React.ReactNode;
}

const ButtonStyle: StyledComponent<
    'button',
    {isTransparent: boolean; size: 'big' | 'small'}
> = styled('button')`
    width: 100%;
    font-size: 16px;
    font-family: var(--font-openSans);
    color: var(--color-white);
    background: var(--color-jacksons-purple);
    border: 0;
    border-radius: 20px;
    outline: none;
    cursor: pointer;

    &:focus,
    &:hover {
        background: var(--color-governor-bay);
    }

    &:active {
        background: var(--color-blue-zodiac);
    }

    &.isTransparent {
        background: transparent;
        color: var(--color-governor-bay);
        border: 1px solid;

        &:hover {
            color: var(--color-governor-bay);
        }

        &.active {
            color: var(--color-blue-zodiac);
        }
    }

    &:disabled {
        cursor: not-allowed;
        background: var(--color-mercury);
    }

    &.size-small {
        height: 30px;
    }

    &.size-big {
        height: 40px;
    }
`;

/**
 * Main component for button
 *
 * @param {Props} props - props component
 * @returns {React.ReactElement}  - element
 */
export const Button = ({
    children,
    isTransparent = false,
    isDisabled = false,
    size = 'big',
    ...restProps
}: Props): React.ReactElement => (
    <ButtonStyle {...restProps} disabled={isDisabled} size={size} isTransparent={isTransparent}>
        {children}
    </ButtonStyle>
);
