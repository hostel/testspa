import React, {useState} from 'react';
import styled from 'astroturf';

import Arrow from 'static/arrow.svg';

const Wrap = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    padding-bottom: 10px;
`;

const Button = styled('button')`
    border: 0;
    padding: 0;
    background: transparent;
    color: var(--color-jacksons-purple);
    cursor: pointer;

    svg {
        width: 30px;
    }

    &:disabled {
        color: var(--color-mercury);
        cursor: not-allowed;
    }
`;

const PrevButton = styled(Button)`
    svg {
        transform: scale(-1, 1);
    }
`;

const Pages = styled('div')`
    margin: 0 10px;
    font-size: 16px;
    line-height: 22px;
    color: var(--color-black);
`;

const Input = styled('input')`
    max-width: 26px;
    height: 22px;
    text-align: center;
    margin-right: 5px;
    font-size: 16px;
    line-height: 22px;
    color: var(--color-black);
    border: 1px solid rgba(var(--color-jacksons-purple), 0.3);
    border-radius: 2px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

interface Props {
    maxPage: number;
    next: () => void;
    prev: () => void;
    jump: (page: number) => void;
    currentPage: number;
}

/**
 * Component for render pagination under table
 *
 * @param {Props} props - props component
 */
export const Pagination: React.FunctionComponent<Props> = ({
    maxPage,
    next,
    jump,
    prev,
    currentPage,
}: Props): React.ReactElement => {
    const [page, setPage] = useState(currentPage);
    return (
        <Wrap>
            <PrevButton onClick={prev} title="prev page" disabled={currentPage === 1}>
                <Arrow />
            </PrevButton>
            <Pages>
                <Input
                    value={page}
                    onBlur={({target: {value}}) => {
                        jump(Number(value));
                    }}
                    onChange={({target: {value}}) => {
                        const replacedStr: string = value.replace(/\D/g, '');
                        setPage(Number(replacedStr));
                    }}
                />
                /&nbsp;{maxPage}
            </Pages>
            <Button onClick={next} title="next page" disabled={currentPage === maxPage}>
                <Arrow />
            </Button>
        </Wrap>
    );
};
