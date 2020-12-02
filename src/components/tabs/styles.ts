import styled from 'astroturf';

export const WrapHeader = styled('div')`
    border-radius: 0 20px 0 0;
    overflow: hidden;
`;

export const GridContent = styled('div')`
    display: grid;
    grid-row-gap: 15px;
    height: 367px;
    overflow: scroll;
`;

export const CellHead = styled('div')`
    padding: 17px 0;
    height: 60px;
    font-size: 16px;
    line-height: 22px;
    color: var(--color-white);
    background: var(--color-jacksons-purple);
`;

export const Cell = styled('div')`
    padding-bottom: 16px;
    font-size: 20px;
    line-height: 27px;
    color: var(--color-black);
    border-bottom: 1px solid var(--color-mercury);
`;

export const WrapError = styled('div')`
    padding: 50px;
    font-size: 12px;
    line-height: 16px;
    color: var(--color-persian-red);
    height: 367px;
`;
