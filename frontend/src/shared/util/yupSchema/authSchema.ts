import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const authSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .matches(emailRegex, 'Invalid email address'),
    password: Yup.string()
        .required('Enter your password.')
        .min(
            8,
            'The password must contain at least 8 characters, one of which must be an uppercase letter, one lowercase letter and must have a number and a special character'
        )
        .minLowercase(
            1,
            'The password must contain at least one lowercase letter.'
        )
        .minUppercase(
            1,
            'The password must contain at least one uppercase letter.'
        )
        .minNumbers(1, 'The password must contain at least one digit.')
        .minSymbols(
            1,
            'The password must contain at least one special character.'
        ),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), ''],
        'The passwords entered must be the same'
    ),
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name should be at least 2 characters long'),
    surname: Yup.string()
        .required('Surname is required')
        .min(2, 'Surname should be at least 2 characters long'),
});

export default authSchema;
