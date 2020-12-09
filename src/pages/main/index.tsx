import React from 'react';
import styled from 'astroturf';
import {connect} from 'react-redux';
import nextCookie from 'next-cookies';

import {Header} from 'components/header';
import {Tabs} from 'components/tabs';
import {withAuthSync} from 'utils/auth';
import {setLogged} from 'actions/auth';
import {PSEUDO_TOKEN} from 'constants/auth';

const Wrap = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0 64px;

    @media (--medium) {
        padding: 0 20px;
    }
`;

const WrapTabs = styled('div')`
    display: flex;
    justify-content: center;
    flex: 1 1 auto;
`;

/**
 * Component for main page
 * @param {Props} props -
 */
const MainPage = () => (
    <Wrap>
        <Header />
        <WrapTabs>
            <Tabs />
        </WrapTabs>
    </Wrap>
);

MainPage.getInitialProps = (ctx) => {
    const {store} = ctx;
    const token = nextCookie(ctx)[PSEUDO_TOKEN];

    if (token) {
        store.dispatch(setLogged(true));
    }
};

export default withAuthSync(connect()(MainPage));
