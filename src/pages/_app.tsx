import App from 'next/app';
import axios from 'axios';
import {END} from 'redux-saga';

import {wrapper, SagaStore} from 'libs/configureStore';

import 'sanitize.css';
import 'css/styles.css';

// Default base url for all api calls (Just use 'users' instead of 'https://api.example.com/users')
axios.defaults.baseURL = process.env.API_URL;

/**
 * Main component for all pages
 */
class MyApp extends App {
    /**
     *  Called on server side
     */
    static async getInitialProps({ctx, Component}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        if (ctx.req) {
            ctx.store.dispatch(END);
            await (ctx.store as SagaStore).sagaTask.toPromise();
        }

        return {pageProps};
    }

    /**
     * Just render component
     *
     * @returns {React.ReactElement} - element
     */
    render(): React.ReactElement {
        const {Component, pageProps} = this.props;
        return <Component {...pageProps} />;
    }
}

export default wrapper.withRedux(MyApp);
