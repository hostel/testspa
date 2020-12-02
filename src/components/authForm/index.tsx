import React from 'react';
import styled from 'astroturf';
import {Form, Field} from 'react-final-form';
import {useSelector, useDispatch} from 'react-redux';

import {Button, Input} from 'components/ui';
import {sendAuth} from 'actions/auth';
import Arrow from 'static/arrow.svg';
import {validate} from './validate';

const Wrap = styled('div')`
    flex: 1 1 auto;
    max-width: 480px;
    margin-top: -33px;
`;

const Container = styled('div')`
    background: var(--color-white);
    overflow: hidden;
    border-radius: 20px;
`;

const Header = styled('div')`
    height: 60px;
    margin-bottom: 70px;
    background: var(--color-jacksons-purple);
`;

const HeaderTitle = styled('h1')`
    margin: 0;
    padding: 17px;
    font-weight: var(--font-normal);
    font-size: 20px;
    line-height: 27px;
    text-align: center;
    color: var(--color-white);
`;

const WrapForm = styled('form')`
    margin: 0 auto 99px;
    max-width: 250px;
`;

const TitleField = styled('p')`
    padding-left: 10px;
    margin: 0 0 5px;
    font-size: 14px;
    line-height: 19px;
    color: var(--color-black);
`;

const WrapFormField = styled('div')`
    margin-bottom: 15px;
    height: 80px;
`;

const WrapFormButton = styled('div')`
    margin-top: 50px;
`;

const WrapErrors = styled('div')`
    margin-top: 7px;
    text-align: center;
`;

const Error = styled('span')`
    font-size: 12px;
    line-height: 16px;
    color: var(--color-persian-red);
`;

const ErrorField = styled(Error)`
    white-space: nowrap;
`;

const WrapArrow = styled('div')`
    display: inline-block;
    margin-left: 6px;
    width: 17px;
`;

/**
 * Component authorization form
 *
 * @returns {React.ReactElement} - element
 */
export const AuthForm = React.memo(
    (): React.ReactElement => {
        const auth = useSelector(({auth}) => auth);
        const dispatch = useDispatch();

        const onSubmit = (values): void => {
            dispatch(sendAuth(values));
        };

        return (
            <Wrap>
                <Container>
                    <Header>
                        <HeaderTitle>Вход в личный кабинет</HeaderTitle>
                    </Header>
                    <Form
                        onSubmit={onSubmit}
                        validate={validate}
                        render={({handleSubmit}) => {
                            return (
                                <WrapForm onSubmit={handleSubmit}>
                                    <WrapFormField>
                                        <TitleField>Логин: </TitleField>
                                        <Field
                                            name="login"
                                            render={({input, meta}) => (
                                                <React.Fragment>
                                                    <Input
                                                        placeholder="user@mail.ru"
                                                        isError={Boolean(
                                                            meta.touched && meta.error,
                                                        )}
                                                        {...input}
                                                    />
                                                    <ErrorField>
                                                        {meta.touched && meta.error}
                                                    </ErrorField>
                                                </React.Fragment>
                                            )}
                                        />
                                    </WrapFormField>
                                    <WrapFormField>
                                        <TitleField>Пароль: </TitleField>
                                        <Field
                                            name="password"
                                            type="password"
                                            render={({input, meta}) => (
                                                <React.Fragment>
                                                    <Input
                                                        placeholder="******"
                                                        isError={Boolean(
                                                            meta.touched && meta.error,
                                                        )}
                                                        {...input}
                                                    />
                                                    <ErrorField>
                                                        {meta.touched && meta.error}
                                                    </ErrorField>
                                                </React.Fragment>
                                            )}
                                        />
                                    </WrapFormField>
                                    <WrapFormButton>
                                        <Button type="submit">
                                            Вход
                                            <WrapArrow>
                                                <Arrow />
                                            </WrapArrow>
                                        </Button>
                                    </WrapFormButton>
                                    <WrapErrors>
                                        <Error>{auth.error}</Error>
                                    </WrapErrors>
                                </WrapForm>
                            );
                        }}
                    />
                </Container>
            </Wrap>
        );
    },
);

AuthForm.displayName = 'AuthForm';
