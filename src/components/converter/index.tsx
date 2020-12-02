import React, {useEffect, useState} from 'react';
import styled from 'astroturf';
import {useSelector, useDispatch} from 'react-redux';

import {Input, Button, Dropdown, Option} from 'components/ui';
import {CellHead, WrapHeader} from 'components/tabs/styles';
import {calculateExchange, setError} from 'actions/converter';
import {fetchQuotes} from 'actions/quotes';

const Wrap = styled('div')`
    background: var(--color-white);
    border-radius: 0 20px 20px 20px;
    height: 360px;
`;

const Header = styled(CellHead)`
    text-align: center;
    margin-bottom: 39px;
`;

const Form = styled('div')`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0 10px 48px;
    border-bottom: 1px solid var(--color-mercury);
`;

const WrapInput = styled('div')`
    flex: 0 0 80px;
    margin-right: 20px;
`;

const Label = styled('div')`
    font-size: 12px;
    line-height: 16px;
    color: var(--color-black);
    margin-bottom: 3px;
    margin-left: 10px;
`;

const WrapDropdown = styled('div')`
    flex: 0 0 80px;
    margin-right: 5px;
`;

const WrapButton = styled('div')`
    flex: 0 0 150px;
    margin-left: 20px;
`;

const Result = styled('div')`
    display: flex;
    max-width: 420px;
    margin: auto;
    min-height: 127px;
    margin-top: 25px;
`;

const Total = styled('div')`
    font-size: 12px;
    line-height: 16px;
    color: var(--color-black);
`;

const Num = styled('div')`
    font-size: 20px;
    line-height: 27px;
    color: var(--color-black);
`;

const Error = styled('span')`
    font-size: 12px;
    line-height: 16px;
    color: var(--color-persian-red);
`;

/**
 * Component Converter from content in tab
 *
 * @returns {React.ReactElement} - element
 */
export const Converter = React.memo(
    (): React.ReactElement => {
        const [value, setValue] = useState('');
        const [currencyOne, setCurrencyOne] = useState('');
        const [currencyTwo, setCurrencyTwo] = useState('');
        const {error, currency, total} = useSelector(({converter}) => converter);
        const dispatch = useDispatch();

        const isDisableButton = !currencyOne || !currencyTwo || !value;

        const changeValue = ({target: {value}}: React.ChangeEvent<HTMLInputElement>): void => {
            setValue(value);
        };

        const sendCalculate = (): void => {
            dispatch(calculateExchange({currencyTwo, currencyOne, value}));
        };

        useEffect(() => {
            dispatch(fetchQuotes());

            return () => {
                dispatch(setError(''));
            };
        }, []);

        return (
            <Wrap>
                <WrapHeader>
                    <Header>Конвертация валют</Header>
                </WrapHeader>
                <Form>
                    <WrapInput>
                        <Label>Сумма</Label>
                        <Input type="number" onChange={changeValue} value={value} />
                    </WrapInput>
                    <WrapDropdown>
                        <Dropdown value={currencyOne} onChange={setCurrencyOne}>
                            {currency.map((item) => (
                                <Option key={item} value={item} isDisabled={item === currencyTwo}>
                                    {item}
                                </Option>
                            ))}
                        </Dropdown>
                    </WrapDropdown>
                    <WrapDropdown>
                        <Dropdown value={currencyTwo} onChange={setCurrencyTwo}>
                            {currency.map((item) => (
                                <Option key={item} value={item} isDisabled={item === currencyOne}>
                                    {item}
                                </Option>
                            ))}
                        </Dropdown>
                    </WrapDropdown>
                    <WrapButton>
                        <Button onClick={sendCalculate} isDisabled={isDisableButton}>
                            Рассчитать
                        </Button>
                    </WrapButton>
                </Form>
                <Result>
                    {error && <Error>{error}</Error>}
                    {!error && Boolean(total) && (
                        <div>
                            <Total>Итого</Total>
                            <Num>{total}</Num>
                        </div>
                    )}
                </Result>
            </Wrap>
        );
    },
);

Converter.displayName = 'Converter';
