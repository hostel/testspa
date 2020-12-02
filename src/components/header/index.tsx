import React from 'react';
import styled from 'astroturf';
import {useSelector, useDispatch} from 'react-redux';

import {Button} from 'components/ui';
import {setLogged} from 'actions/auth';

const Wrap = styled('header')`
    flex: 0 0 30px;
    margin-top: 42px;
    display: flex;
    justify-content: space-between;
`;

const Title = styled('div')`
    font-weight: var(--font-bold);
    font-size: 24px;
    line-height: 33px;
    color: var(--color-black);
`;

const WrapButton = styled('div')`
    flex: 0 0 130px;
`;

/**
 * Component header for all site
 *
 * @returns {React.ReactElement} - element
 */
export const Header = React.memo(
    (): React.ReactElement => {
        const {isLogged} = useSelector(({auth}) => auth);
        const dispatch = useDispatch();

        /**
         * Change logget status to false
         */
        const onLogout = (): void => {
            dispatch(setLogged(false));
        };

        return (
            <Wrap>
                <Title>TEST SPA app</Title>
                {isLogged && (
                    <WrapButton>
                        <Button isTransparent onClick={onLogout} size="small">
                            Выход
                        </Button>
                    </WrapButton>
                )}
            </Wrap>
        );
    },
);

Header.displayName = 'Header';
