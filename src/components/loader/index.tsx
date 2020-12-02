import React from 'react';
import styled from 'astroturf';

const WrapLoader = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 367px;
`;

const LoaderStyled = styled('div')`
    width: 150px;
    height: 150px;
    border: 3px solid var(--color-mercury);
    border-radius: 100%;
    border-top: 3px solid var(--color-jacksons-purple);
    width: 60px;
    height: 60px;
    animation: spin 0.8s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

/**
 * Component for render Loader
 *
 * @returns {React.ReactElement} - element
 */
export const Loader = React.memo(
    (): React.ReactElement => {
        return (
            <WrapLoader>
                <LoaderStyled />
            </WrapLoader>
        );
    },
);

Loader.displayName = 'Loader';
