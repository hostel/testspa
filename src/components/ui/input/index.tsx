import React from 'react';
import styled, {StyledComponent} from 'astroturf';

interface Props {
    placeholder?: string;
    value: string;
    type?: string;
    isError?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputStyle: StyledComponent<'input', {isError: boolean}> = styled('input')`
    width: 100%;
    height: 40px;
    padding: 9px 10px;
    border: 1px solid var(--color-jacksons-purple);
    border-radius: 5px;

    &.isError {
        border-color: var(--color-persian-red);
    }

    &::placeholder {
        color: rgba(var(--color-black), 0.5);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

/**
 * Main component for input
 *
 * @param {Props} - props component
 * @returns {React.ReactElement} element
 */
export const Input = ({
    type = 'text',
    isError = false,
    ...restProps
}: Props): React.ReactElement => <InputStyle type={type} isError={isError} {...restProps} />;
