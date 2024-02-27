import { Formik, Form, Field, FormikProps } from 'formik';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import Button from '../../../shared/components/FormElements/Button';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import Input from '../../../shared/components/FormElements/Input';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../../shared/hooks/http-hook';
import authSchema from '../../../shared/util/yupSchema/authSchema';
import { AuthFormValues } from '../../../interfaces/Auth';
import { ButtonType } from '../../../models/enums/buttonTypeEnum';
import { BACKEND_URL } from '../../../config';
import Card from '../../../shared/components/UIElements/Card';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/slices/authSlice';
import { useLocalStorage } from '../../../shared/hooks/local-storage-hook';

const loginFields = [
    {
        name: 'email',
        label: 'Email:',
        type: 'text',
    },
    {
        name: 'password',
        label: 'Password:',
        type: 'password',
    },
];

const registerFields = [
    ...loginFields,
    {
        name: 'confirmPassword',
        label: 'Confirm password:',
        type: 'password',
    },
    {
        name: 'name',
        label: 'Name:',
        type: 'text',
    },
    {
        name: 'surname',
        label: 'Surname:',
        type: 'text',
    },
];

export type FieldProps = {
    name: string;
    value: string;
    onChange: () => void;
    onBlur: () => void;
};

const Auth = () => {
    const dispatch = useDispatch();

    const { type } = useParams();
    const navigate = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { setValue } = useLocalStorage('user');

    const isRegistration = type === 'register';

    const formFields = isRegistration ? registerFields : loginFields;

    const handleAuthSubmit = async (formValues: AuthFormValues) => {
        const authUrl = `${BACKEND_URL}/api/users/auth${
            isRegistration ? '/register' : '/login'
        }`;
        const method = 'POST';
        const body = isRegistration
            ? JSON.stringify({
                  email: formValues.email,
                  password: formValues.password,
                  confirmPassword: formValues.confirmPassword,
                  name: formValues.name,
                  surname: formValues.surname,
              })
            : JSON.stringify({
                  email: formValues.email,
                  password: formValues.password,
              });
        const headers = {
            'Content-Type': 'application/json',
        };

        const response = await sendRequest(authUrl, method, body, headers);
        if (!response) return;
        dispatch(authActions.login(response));
        setValue(response);
        navigate('/products');
    };

    const initLoginState = {
        email: '',
        password: '',
    };

    const initFormRegistryState = {
        ...initLoginState,
        confirmPassword: '',
    };

    const hasValue = (value: string) => value !== '';

    return (
        <>
            {error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="center-element">
                <Card>
                    <div className="auth-form">
                        <h1>{isRegistration ? 'Register' : 'Login'}</h1>
                        <Formik
                            initialValues={
                                isRegistration
                                    ? initFormRegistryState
                                    : initLoginState
                            }
                            enableReinitialize={true}
                            validationSchema={isRegistration && authSchema}
                            onSubmit={(values) => {
                                handleAuthSubmit(values);
                            }}
                        >
                            {(props: FormikProps<AuthFormValues>) => {
                                const everyItemHasValue = Object.values(
                                    props.values
                                ).every(hasValue);
                                return (
                                    <Form>
                                        {formFields.map((formField) => (
                                            <Field
                                                key={formField.name}
                                                name={formField.name}
                                            >
                                                {({
                                                    field,
                                                    form: { touched, errors },
                                                }: {
                                                    field: FieldProps;
                                                    form: FormikProps<AuthFormValues>;
                                                }) => (
                                                    <Input
                                                        formField={formField}
                                                        touched={touched}
                                                        errors={errors}
                                                        field={field}
                                                    />
                                                )}
                                            </Field>
                                        ))}
                                        <div className="redirect-links">
                                            <span>
                                                {isRegistration
                                                    ? 'Have account already? '
                                                    : "Don't have account? "}
                                            </span>
                                            {isRegistration ? (
                                                <NavLink
                                                    to="/auth/login"
                                                    className="question-navlink"
                                                >
                                                    Login
                                                </NavLink>
                                            ) : (
                                                <NavLink
                                                    to="/auth/register"
                                                    className="question-navlink"
                                                >
                                                    Register
                                                </NavLink>
                                            )}
                                        </div>
                                        <div className="action-buttons">
                                            <Button
                                                disabled={
                                                    (isRegistration &&
                                                        !everyItemHasValue) ||
                                                    !props.isValid
                                                }
                                                type={ButtonType.submit}
                                            >
                                                {isRegistration
                                                    ? 'Register'
                                                    : 'Login'}
                                            </Button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Auth;
