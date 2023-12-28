import * as Yup from 'yup';

const OrderSchema = Yup.object().shape({
    email: Yup.string()
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Enter valid email'
        )
        .required('Enter valid email'),
    name: Yup.string().required('Enter name'),
    surname: Yup.string().required('Enter surname'),
    postalCode: Yup.string()
        .matches(/^\d{2}-\d{3}$/, 'Enter valid postal code. XX-XXX') // Matches the XX-XXX pattern
        .min(6)
        .max(6)
        .required('Enter valid postal code. XX-XXX'),
    city: Yup.string().required('Enter valid city'),
});

export default OrderSchema;
