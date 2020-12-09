import React from 'react';
import {NextPageContext, NextComponentType} from 'next';
import nextCookie from 'next-cookies';
import {PSEUDO_TOKEN} from 'constants/auth';

export interface Props {
    [key: string]: unknown | string | number | boolean;
}

interface WrappedComponent {
    (props: Props): React.ReactElement;
    getInitialProps(ctx: NextPageContext): Promise<Partial<Props>>;
}

/**
 * HOC for auth protected pages
 *
 * @param {NextComponentType} WrappedComponent - component
 * @returns {WrappedComponent} wrapped component
 */
export const withAuthSync = (WrappedComponent: NextComponentType): WrappedComponent => {
    /**
     * Component with props
     *
     * @param {Props} props - Props of component
     * @returns {React.ReactElement} wrapped component
     */
    const Wrapper = (props: Props): React.ReactElement => <WrappedComponent {...props} />;

    Wrapper.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
        const token = nextCookie(ctx)[PSEUDO_TOKEN];

        if (ctx.req && ctx.req.url !== '/' && !token) {
            ctx.res.writeHead(302, {Location: '/'});
            ctx.res.end();
        }

        const componentProps =
            WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

        return {...componentProps, token};
    };

    return Wrapper;
};
