import isEmail from 'validator/lib/isEmail';

interface Values {
    login?: string;
    password?: string;
}

export const validate = (values: Values): Values => {
    const errors: Values = {};

    if (!values.login) {
        errors.login = 'Поле "Логин" обязательно для заполнения';
    }

    if (values.login && !isEmail(values.login)) {
        errors.login = 'Невалидный логин';
    }

    if (!values.password) {
        errors.password = 'Поле "Пароль" обязательно для заполнения';
    }

    if (
        values.password &&
        values.password.length >= 7 &&
        !/^[a-zA-Z_0-9]*$/.test(values.password)
    ) {
        errors.password = 'Невалидный пароль';
    }

    return errors;
};
