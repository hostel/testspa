import styled from 'astroturf';

import {AuthForm} from 'components/authForm';
import {Header} from 'components/header';

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

const WrapForm = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
`;

/**
 * Component for home page
 *
 * @returns {React.ReactElement} element
 */
export default function Home(): React.ReactElement {
    return (
        <Wrap>
            <Header />
            <WrapForm>
                <AuthForm />
            </WrapForm>
        </Wrap>
    );
}
